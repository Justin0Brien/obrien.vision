# Auto-Processing Directory

Drop your markdown files and images here for automatic processing into Jekyll posts.

## How to Use

1. **Create your content bundle:**
   ```
   _drafts/auto-process/
   ├── my-blog-post.md
   ├── hero-image.jpg
   ├── diagram.png
   └── chart.jpg
   ```

2. **Run the processor:**
   ```bash
   ruby scripts/process_posts.rb
   ```

3. **Build your site:**
   ```bash
   bundle exec jekyll serve
   ```

## What the Script Does

### ✅ **File Processing:**
- Moves `.md` files to `_posts/` with date-based naming
- Copies images to `assets/images/posts/YYYY-MM-DD-post-name/`
- Creates thumbnail versions of all images
- Cleans up source files after processing

### ✅ **Image Handling:**
- First image becomes "hero.jpg" (main post image)
- Other images keep their original names
- Creates `-thumb` versions for thumbnails
- Adds watermarks and copyright info (when ImageMagick is configured)

### ✅ **Frontmatter Enhancement:**
- Adds `image:` and `thumbnail:` fields automatically
- Ensures required fields (`layout`, `author`, etc.)
- Preserves existing frontmatter data

### ✅ **Content Updates:**
- Adds hero image to post content if not present
- Updates image references to correct paths
- Maintains existing markdown formatting

## Expected File Structure

### Input (before processing):
```
_drafts/auto-process/
└── fixing-universities.md          # Your post content
└── university-finance.jpg          # Will become hero image
└── budget-chart.png               # Additional images
```

### Output (after processing):
```
_posts/
└── 2025-08-07-fixing-universities.md

assets/images/posts/2025-08-07-fixing-universities/
├── hero.jpg                       # Main image (optimized)
├── hero-thumb.jpg                 # Thumbnail version
├── budget-chart.png               # Additional image
└── budget-chart-thumb.png         # Thumbnail version
```

## Advanced Features (Future)

When you install ImageMagick, the script will automatically:
- Resize images for optimal web performance
- Add "obrien.vision" watermarks
- Optimize file sizes and quality
- Add copyright metadata to EXIF data

Install with: `brew install imagemagick` (Mac) or `apt-get install imagemagick` (Linux)
