#!/bin/bash
set -euo pipefail

export PATH="/opt/homebrew/bin:$PATH"
if command -v rbenv >/dev/null; then
  eval "$(rbenv init -)"
fi

echo "Using Ruby: $(ruby -v)"
echo "Checking dependencies..."
bundle check || bundle install

echo "Cleaning previous build output..."
bundle exec jekyll clean

# Avoid hard failure when the default LiveReload port is occupied.
livereload_port=35729
while lsof -iTCP:"${livereload_port}" -sTCP:LISTEN >/dev/null 2>&1; do
  livereload_port=$((livereload_port + 1))
done
echo "Using LiveReload port: ${livereload_port}"

bundle exec jekyll serve \
  --host 127.0.0.1 \
  --port 4000 \
  --livereload \
  --livereload-port "${livereload_port}" \
  --config _config.yml,_config.local.yml
