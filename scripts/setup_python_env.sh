#!/usr/bin/env bash
set -euo pipefail

# Create / update a local Python virtual environment for helper scripts.
# Usage: ./scripts/setup_python_env.sh [python_version]
# Example: ./scripts/setup_python_env.sh 3.11

PY_VERSION="${1:-}"
if [[ -n "$PY_VERSION" ]]; then
  PY_BIN="python$PY_VERSION"
else
  PY_BIN="python3"
fi

if ! command -v "$PY_BIN" >/dev/null 2>&1; then
  echo "Python binary '$PY_BIN' not found. Install it (e.g. via pyenv or Homebrew)." >&2
  exit 1
fi

# Prefer .venv (gitignored)
VENV_DIR=".venv"

if [[ ! -d "$VENV_DIR" ]]; then
  echo "Creating virtual environment in $VENV_DIR"
  "$PY_BIN" -m venv "$VENV_DIR"
else
  echo "Virtual environment already exists: $VENV_DIR"
fi

# Activate
# shellcheck disable=SC1091
source "$VENV_DIR/bin/activate"

python -m pip install --upgrade pip wheel setuptools

if [[ -f requirements.txt ]]; then
  pip install -r requirements.txt
fi

echo
echo "Environment ready. Activate with: source $VENV_DIR/bin/activate"
echo "Run pipeline:  source $VENV_DIR/bin/activate && python scripts/image_pipeline.py"
