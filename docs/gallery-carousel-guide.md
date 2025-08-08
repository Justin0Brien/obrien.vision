# Gallery and Carousel System Documentation

## Overview

This Jekyll site includes a comprehensive image gallery and carousel system with the following features:

- **Image Galleries**: Grid-based galleries with lightbox viewing
- **Image Carousels**: Slideshow functionality with autoplay and controls
- **Touch Support**: Swipe gestures on mobile devices
- **Lazy Loading**: Improved performance for large image sets
- **Responsive Design**: Adapts to different screen sizes
- **Easy Integration**: Simple Jekyll includes for content creators

## Quick Start

### Including the JavaScript Library

The gallery/carousel library is automatically loaded on pages that use the includes. You can also manually include it:

```html
<script src="{{ '/assets/js/gallery-carousel.js' | relative_url }}"></script>
```

### Basic Gallery Usage

In your post or page front matter:
```yaml
gallery_images:
  - src: "/assets/images/photo1.jpg"
    alt: "Photo 1 description"
    caption: "This is photo 1"
  - src: "/assets/images/photo2.jpg"
    alt: "Photo 2 description"
    caption: "This is photo 2"
```

In your content:
```liquid
{% include gallery.html images=page.gallery_images %}
```

### Basic Carousel Usage

In your post or page front matter:
```yaml
carousel_images:
  - src: "/assets/images/slide1.jpg"
    alt: "Slide 1"
    caption: "First slide"
  - src: "/assets/images/slide2.jpg"
    alt: "Slide 2"
    caption: "Second slide"
```

In your content:
```liquid
{% include carousel.html images=page.carousel_images autoplay=true %}
```

## Gallery Include Parameters

### Required Parameters
- `images`: Array of image objects

### Optional Parameters
- `lightbox`: Enable lightbox functionality (default: true)
- `captions`: Show captions on hover (default: true)
- `lazy`: Enable lazy loading (default: true)
- `columns`: CSS grid columns (default: "auto")
- `id`: Custom ID for the gallery (auto-generated if not provided)

### Example with All Parameters
```liquid
{% include gallery.html 
   images=page.gallery_images 
   lightbox=true 
   captions=true 
   lazy=true 
   columns="3" 
   id="my-custom-gallery" %}
```

## Carousel Include Parameters

### Required Parameters
- `images`: Array of image objects

### Optional Parameters
- `autoplay`: Enable autoplay (default: false)
- `controls`: Show navigation controls (default: true)
- `dots`: Show dot indicators (default: true)
- `interval`: Autoplay interval in milliseconds (default: 5000)
- `transition`: Transition type - 'slide' or 'fade' (default: 'slide')
- `id`: Custom ID for the carousel (auto-generated if not provided)

### Example with All Parameters
```liquid
{% include carousel.html 
   images=page.carousel_images 
   autoplay=true 
   controls=true 
   dots=true 
   interval=3000 
   transition="fade"
   id="my-custom-carousel" %}
```

## Image Object Format

Each image in your arrays should follow this format:

```yaml
- src: "/path/to/image.jpg"        # Required: Image path
  alt: "Alternative text"          # Optional: Alt text for accessibility
  caption: "Image caption"         # Optional: Caption text
```

Examples:
```yaml
# Minimal format
gallery_images:
  - src: "/assets/images/photo.jpg"

# With alt text
gallery_images:
  - src: "/assets/images/photo.jpg"
    alt: "Beautiful sunset over mountains"

# Full format
gallery_images:
  - src: "/assets/images/photo.jpg"
    alt: "Beautiful sunset over mountains"
    caption: "Taken during our hiking trip in 2023"
```

## Advanced Usage

### Manual Initialization

You can also initialize galleries and carousels manually with JavaScript:

```javascript
// Initialize a gallery
const gallery = new ImageGallery('#my-gallery', {
  lightbox: true,
  captions: true,
  lazy: true,
  columns: 'auto'
});

// Initialize a carousel
const carousel = new ImageCarousel('#my-carousel', {
  autoplay: true,
  controls: true,
  dots: true,
  interval: 5000,
  transition: 'slide'
});
```

### Custom CSS Classes

The system generates the following CSS classes for styling:

#### Gallery Classes
- `.image-gallery-container`: Main gallery container
- `.gallery-item`: Individual gallery items
- `.lightbox-overlay`: Lightbox background
- `.lightbox-content`: Lightbox image container

#### Carousel Classes
- `.image-carousel-container`: Main carousel container
- `.carousel-slides`: Slides container
- `.carousel-slide`: Individual slides
- `.carousel-caption`: Slide captions
- `.carousel-controls`: Navigation controls
- `.carousel-dots`: Dot indicators

### Data Attributes

You can also configure galleries and carousels using data attributes:

```html
<div class="image-gallery-container" 
     data-gallery='{"lightbox": true, "captions": true}'>
  <!-- images -->
</div>

<div class="image-carousel-container" 
     data-carousel='{"autoplay": true, "interval": 3000}'>
  <!-- slides -->
</div>
```

## Examples for Different Content Types

### Data Visualization Gallery
```yaml
---
title: "Data Visualization Portfolio"
layout: visualization
gallery_images:
  - src: "/assets/images/visualizations/chart1.png"
    alt: "Sales Data Visualization"
    caption: "Interactive sales dashboard showing quarterly trends"
  - src: "/assets/images/visualizations/chart2.png"
    alt: "Network Graph"
    caption: "Social network analysis visualization"
---

## My Visualizations

{% include gallery.html images=page.gallery_images columns="2" %}
```

### Visual Illusion Carousel
```yaml
---
title: "Optical Illusions Collection"
layout: illusion
carousel_images:
  - src: "/assets/images/illusions/illusion1.jpg"
    alt: "Moving Dots Illusion"
    caption: "Focus on the center dot and watch the surrounding dots move"
  - src: "/assets/images/illusions/illusion2.jpg"
    alt: "Color Perception Illusion"
    caption: "The squares are actually the same color!"
---

## Illusion Slideshow

{% include carousel.html images=page.carousel_images autoplay=true interval=4000 %}
```

## Troubleshooting

### Images Not Loading
- Check that image paths are correct and relative to the site root
- Ensure images exist in the specified locations
- Verify the `relative_url` filter is working correctly

### JavaScript Not Working
- Check browser console for errors
- Ensure the gallery-carousel.js file is loaded
- Verify the DOM is fully loaded before initialization

### Styling Issues
- The system includes responsive CSS
- You can override styles in your main CSS file
- Use browser developer tools to inspect generated HTML

## Performance Considerations

### Lazy Loading
- Enabled by default for galleries
- Improves page load times for large image sets
- Uses intersection observer for modern browsers

### Image Optimization
- Optimize images before uploading
- Consider using responsive images with `srcset`
- Use appropriate image formats (WebP, AVIF when supported)

### Large Galleries
- Consider pagination for very large galleries
- Use thumbnail images for gallery views
- Load full-size images only in lightbox mode

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Touch events for mobile devices
- Graceful degradation for older browsers
- CSS Grid support required for gallery layouts

## Customization

The system is designed to be easily customizable. You can:

1. Modify the CSS in the JavaScript file
2. Override styles in your main stylesheet
3. Extend the JavaScript classes for additional functionality
4. Create custom includes based on the provided templates
