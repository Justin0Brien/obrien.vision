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

echo "Starting Jekyll server on http://localhost:4000"
echo "Press Ctrl+C to stop the server"
echo
bundle exec jekyll serve --host 0.0.0.0 --livereload --config _config.yml,_config.local.yml
