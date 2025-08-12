#!/usr/bin/env bash
set -euo pipefail

# Jekyll development server startup script (rbenv-first)
echo "Starting Jekyll development server (rbenv)…"

RUBY_VERSION_FILE=".ruby-version"
if [[ ! -f "$RUBY_VERSION_FILE" ]]; then
    echo ".ruby-version not found; creating with 3.2.4"
    echo "3.2.4" > "$RUBY_VERSION_FILE"
fi

# Initialize rbenv if available
if command -v rbenv >/dev/null 2>&1; then
    # shellcheck disable=SC1090
    eval "$(rbenv init -)"
    RV="$(cat .ruby-version)"
    echo "Using rbenv Ruby ${RV} (installing if missing)…"
    rbenv install -s "$RV"
else
    echo "rbenv not found. Install with: brew install rbenv ruby-build"
    echo "Falling back to system PATH Ruby (may fail)."
fi

# Ensure Bundler is available
if ! command -v bundle >/dev/null 2>&1; then
    echo "Installing bundler…"
    gem install bundler --no-document
fi

# Ensure gems install to vendor/bundle and include dev group locally
export BUNDLE_PATH="vendor/bundle"
# Make sure development group is installed/loaded locally (needed for jekyll-admin)
export BUNDLE_WITH="development"
# Clear any global exclusions that might hide dev gems
export BUNDLE_WITHOUT=""

# Install/update dependencies
echo "Installing gem dependencies…"
bundle install

# --- Port & process handling -------------------------------------------------

BASE_PORT=${PORT:-4000}
LR_PORT=${LIVERELOAD_PORT:-35729}

auto_kill_port() {
    local port=$1
    # list PIDs listening on the port
    local pids
    pids=$(lsof -nP -iTCP:"$port" -sTCP:LISTEN 2>/dev/null | awk 'NR>1 {print $2}' | sort -u || true)
    [[ -z "$pids" ]] && return 0
    for pid in $pids; do
        # only kill if it's a jekyll process (command line contains 'jekyll')
        if ps -p "$pid" -o command= | grep -qi "jekyll"; then
            echo "Killing existing Jekyll process PID $pid on port $port" >&2
            kill "$pid" 2>/dev/null || true
        else
            echo "Port $port is in use by non-Jekyll PID $pid; not killing. (Set PORT to another value or free it manually.)" >&2
            return 1
        fi
    done
    # wait until freed
    local waited=0
    while lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; do
        sleep 0.2; waited=$((waited+1));
        if (( waited > 25 )); then
            echo "Timed out waiting for port $port to free." >&2
            return 1
        fi
    done
    return 0
}

if [[ "${KEEP_OLD:-0}" != "1" ]]; then
    auto_kill_port "$BASE_PORT" || exit 1
    auto_kill_port "$LR_PORT" || true # ok if fails; we'll disable livereload if busy
else
    echo "KEEP_OLD=1 set: not killing existing processes; script may fail if port busy." >&2
fi

LR_ARGS=(--livereload --livereload-port "$LR_PORT")
if lsof -nP -iTCP:"$LR_PORT" -sTCP:LISTEN >/dev/null 2>&1 && [[ "${KEEP_OLD:-0}" == "1" ]]; then
    echo "Livereload port $LR_PORT occupied; disabling livereload." >&2
    LR_ARGS=()
fi
if [[ "${NO_LIVERELOAD:-0}" == "1" ]]; then
    echo "NO_LIVERELOAD=1 set: disabling livereload." >&2
    LR_ARGS=()
fi

echo "Starting Jekyll server on http://localhost:${BASE_PORT}"
echo "Press Ctrl+C to stop the server"
echo

JEKYLL_CMD=(bundle exec jekyll serve --host 0.0.0.0 --port "$BASE_PORT" "${LR_ARGS[@]}" --config _config.yml,_config.local.yml)
echo "> ${JEKYLL_CMD[*]}"
"${JEKYLL_CMD[@]}"
