# Removed Illusion Placeholder Files

**Date Removed:** August 15, 2025  
**Reason:** Empty placeholder files were causing duplicate entries on the illusions page  
**Location:** Originally in `_illusions/` directory  

## Files Removed

The following empty `.md` files were removed from `_illusions/` directory. These can be restored and populated with content when ready to implement these illusions:

### Classic Optical Illusions
- `ames.md` - Ames Room illusion
- `ebbinghaus.md` - Ebbinghaus circles illusion
- `moon.md` - Moon illusion
- `necker.md` - Necker cube
- `shepard.md` - Shepard tables illusion
- `thatcher.md` - Thatcher effect

### Motion and Temporal Illusions
- `biological-motion.md` - Biological motion perception
- `flashlag.md` - Flash-lag effect
- `pulfrich.md` - Pulfrich effect
- `wagonwheel.md` - Wagon-wheel effect

### Color and Perceptual Illusions
- `benhams-top.md` - Benham's top
- `dress.md` - The dress color illusion
- `lilac.md` - Lilac chaser

### Other
- `blindspot.md` - Blind spot demonstration
- `2024-01-10-spinning-spiral.md` - Spinning spiral illusion

## Currently Active Illusions (Not Removed)

These files contain content and remain active:
- `cafe-wall.md` - Café Wall Illusion ✅
- `checker-shadow.md` - Checker–Shadow ✅  
- `hermann-grid.md` - Hermann Grid ✅
- `mae.md` - Motion Aftereffect (Waterfall) ✅
- `muller-lyer.md` - Müller–Lyer Illusion ✅
- `rotating-snake.md` - Rotating Snakes ✅

## To Restore a Placeholder

When ready to implement any of these illusions:

1. Create the `.md` file in `_illusions/` directory
2. Add proper frontmatter with `layout: illusion`
3. Include required fields: `title`, `difficulty`, `categories`, etc.
4. Create corresponding HTML demo file in `assets/demos/illusions/` if needed
5. Reference the demo via `iframe_src` field in the markdown frontmatter

## Example Template

```yaml
---
layout: illusion
title: "Illusion Name"
permalink: /illusions/illusion-name/
difficulty: "Medium"
categories: [category1, category2]
warning: "Optional warning text"
duration: "X–Y minutes"
iframe_src: "/assets/demos/illusions/illusion-name.html"
iframe_width: "100%"
iframe_height: "600"
description: "Brief description of the illusion"
---

## Content goes here
```

## Interactive HTML Files Location

The interactive HTML demo files were moved from `_illusions/` to `illusions-demos/` to prevent collection conflicts:
- `rotating-snake.html`
- `hermann-grid.html` 
- `checker-shadow.html`
- etc.

These are processed by Jekyll and accessible at their original permalink URLs (e.g., `/illusions/rotating-snake.html`) but are no longer processed as Jekyll collection items.
