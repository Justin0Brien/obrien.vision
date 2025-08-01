#!/bin/bash

# Jekyll development server startup script
# This sets up the correct Ruby environment and starts Jekyll

echo "Starting Jekyll development server..."
echo "Using Homebrew Ruby environment"

# Set up the correct Ruby path
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"

# Check if bundle is installed
if ! command -v bundle &> /dev/null; then
    echo "Installing bundler..."
    gem install bundler
fi

# Install dependencies if needed
if [ ! -f "Gemfile.lock" ] || [ "Gemfile" -nt "Gemfile.lock" ]; then
    echo "Installing/updating gem dependencies..."
    bundle install
fi

# Start Jekyll
echo "Starting Jekyll server on http://localhost:4000"
echo "Press Ctrl+C to stop the server"
echo ""

bundle exec jekyll serve --host 0.0.0.0 --livereload
