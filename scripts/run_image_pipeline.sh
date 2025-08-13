#!/usr/bin/env bash
set -euo pipefail

VENV_DIR=".venv"
if [[ ! -d "$VENV_DIR" ]]; then
  echo "Virtual environment not found. Bootstrapping..." >&2
  ./scripts/setup_python_env.sh
fi
# shellcheck disable=SC1091
source "$VENV_DIR/bin/activate"
exec python scripts/image_pipeline.py "$@"
