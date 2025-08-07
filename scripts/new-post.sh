#!/bin/bash

echo "🚀 obrien.vision Post Processor"
echo "================================"

# Check if auto-process directory exists
if [ ! -d "_drafts/auto-process" ]; then
    echo "📁 Creating auto-process directory..."
    mkdir -p _drafts/auto-process
fi

# Run the processor
echo "🔄 Processing posts..."
ruby scripts/process_posts.rb

# Optionally rebuild the site
read -p "🤔 Rebuild Jekyll site? (y/N): " rebuild
if [[ $rebuild =~ ^[Yy]$ ]]; then
    echo "🔨 Building site..."
    bundle exec jekyll build
    echo "✅ Site built! Run 'bundle exec jekyll serve' to preview"
fi
