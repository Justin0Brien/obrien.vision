#!/bin/bash
export PATH="/opt/homebrew/bin:$PATH"
if command -v rbenv >/dev/null; then
  eval "$(rbenv init -)"
fi

echo "Using Ruby: $(ruby -v)"
echo "Checking dependencies..."
bundle check || bundle install

bundle exec jekyll serve --livereload
