# Drop Files Here for Processing

This directory is monitored by the post processing script.

## Usage:
1. Copy your `.md` file and any images here
2. Run: `ruby scripts/process_posts.rb`
3. Files will be processed and moved to the correct Jekyll locations

## What Gets Processed:
- Markdown files become dated posts in `_posts/`
- Images are optimized and organized in `assets/images/posts/`
- Thumbnails are automatically created
- Frontmatter is enhanced with image references

Your files will be cleaned up from here after processing.
