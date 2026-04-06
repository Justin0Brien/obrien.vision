# Findings

## Illusions Page Structure
The illusions page is located at `/illusions/` and displays illusion cards using a template that determines thumbnail source based on the following logic:
1. If `illusion.thumbnail` exists, use that
2. If not, but `illusion.carousel_images` exists and has a first image, use that
3. Otherwise, use the placeholder: `/assets/images/placeholders/illusion-thumb.svg`

## Thumbnail Analysis
Based on analysis of all illusion files in `_illusions/`:

### Illusions with Genuine Thumbnails:
- cafe-wall.md: thumbnail: "/assets/images/cafe-wall-256w.webp"
- hermann-grid.md: thumbnail: "/assets/images/hermann-grid-2-256w.webp"
- rotating-snake.md: thumbnail: "/assets/images/rotating-snakes-256w.webp"

### Illusions with Placeholder Thumbnails:
- checker-shadow.md (no thumbnail defined)
- benhams-top.md (no thumbnail defined)
- muller-lyer.md (no thumbnail defined)