# Jekyll CMS Workflow Guide

## Overview
Your Jekyll site acts as a simple but powerful Content Management System (CMS) for your professional blog. This guide covers everything from creating new posts to managing images and deploying updates.

## 📝 Creating New Blog Posts

### 1. File Naming Convention
All blog posts must be saved in the `_posts/` directory with this exact naming format:
```
YYYY-MM-DD-title-with-hyphens.md
```

**Examples:**
- `2025-06-18-staying-away-from-uk-higher-education.md`
- `2025-08-01-visualizing-career-transitions.md`
- `2025-12-15-data-visualization-best-practices.md`

### 2. Post Template
Copy this template for new posts:

```markdown
---
layout: default
title: "Your Post Title Here"
date: YYYY-MM-DD HH:MM:SS +0000
categories: [category1, category2]
tags: [tag1, tag2, tag3]
author: "Justin O'Brien"
excerpt: "A compelling summary of your post that appears in previews and search results."
---

# Your Post Title Here

Your content starts here...

## Section Headings

Use `##` for main sections, `###` for subsections.

### Adding Images

![Alt text description](/assets/images/posts/YYYY-MM-DD/image-filename.png)
*Optional italic caption describing the image*

### Formatting Tips

- Use **bold** for emphasis
- Use `code` for technical terms
- Use > for blockquotes
- Use - for bullet points
- Use 1. for numbered lists

---

*Optional closing call-to-action or author note*
```

## 🖼️ Image Management

### Directory Structure
```
assets/
└── images/
    └── posts/
        ├── 2025-06-18/
        │   ├── economics-vs-psychology-departments.png
        │   └── academic-gig-economy-carousel.png
        ├── 2025-08-01/
        │   └── sankey-diagram-preview.png
        └── [YYYY-MM-DD]/
            └── [your-images.png]
```

### Image Workflow

1. **Create date-specific folder:**
   ```bash
   mkdir -p assets/images/posts/YYYY-MM-DD
   ```

2. **Add images to the folder:**
   - Use descriptive filenames (lowercase, hyphens for spaces)
   - Recommended formats: PNG, JPG, WebP
   - Optimize images for web (< 500KB each)

3. **Reference in markdown:**
   ```markdown
   ![Descriptive alt text](/assets/images/posts/YYYY-MM-DD/filename.png)
   *Optional caption in italics*
   ```

### Image Placeholders for Your Current Post

For your new post `2025-06-18-staying-away-from-uk-higher-education.md`, you need these images:

1. **File:** `/assets/images/posts/2025-06-18/economics-vs-psychology-departments.png`
   - **Description:** Illustration comparing Economics department (formal, beige) vs Psychology department (colorful, chaotic)
   - **Style:** Cartoon/illustration style showing the contrast

2. **File:** `/assets/images/posts/2025-06-18/academic-gig-economy-carousel.png`
   - **Description:** Pastel carousel with laptop-carrying academics on office chairs
   - **Elements:** Signs reading "Hourly Pay", "Zero Hours", "OPM Tutor", "Subsidiary Co."

## 🚀 Publishing Workflow

### Local Development
1. **Start Jekyll server:**
   ```bash
   cd /Users/justin/Documents/map/obrien.vision
   export PATH=/opt/homebrew/opt/ruby/bin:$PATH
   bundle exec jekyll serve
   ```

2. **Preview at:** http://localhost:4000

3. **Auto-reload:** Jekyll watches for changes and rebuilds automatically

### Git Deployment
1. **Add new content:**
   ```bash
   git add _posts/YYYY-MM-DD-post-name.md
   git add assets/images/posts/YYYY-MM-DD/
   ```

2. **Commit changes:**
   ```bash
   git commit -m "Add new post: Post Title"
   ```

3. **Push to GitHub:**
   ```bash
   git push origin main
   ```

4. **Live site updates:** GitHub Pages automatically rebuilds (2-10 minutes)

## 📂 Site Structure

```
obrien.vision/
├── _posts/                 # Blog posts (YYYY-MM-DD-title.md)
├── _config.yml            # Site configuration
├── assets/
│   ├── css/
│   └── images/
│       └── posts/         # Post images organized by date
├── index.html             # Homepage
├── sankey.html           # Sankey visualization
├── about.md              # About page
├── blog.md               # Blog listing page
├── contact.md            # Contact page
└── Gemfile               # Ruby dependencies
```

## 🎨 Content Guidelines

### SEO Optimization
- Write compelling excerpts (150-160 characters)
- Use descriptive alt text for images
- Include relevant tags and categories
- Use clear, hierarchical headings

### Writing Style
- Start with engaging opening paragraphs
- Use subheadings to break up long content
- Include relevant links and references
- End with calls-to-action when appropriate

### Categories and Tags
**Suggested Categories:**
- `data-visualization`
- `higher-education`
- `academia`
- `career`
- `research`
- `employment`

**Suggested Tags:**
- Technical: `d3js`, `python`, `visualization`, `statistics`
- Academic: `universities`, `academic-jobs`, `research-methods`
- Career: `career-change`, `professional-development`, `job-market`

## 🔧 Maintenance Tasks

### Regular Updates
- **Monthly:** Review and update contact information
- **Quarterly:** Check for broken links
- **Annually:** Update about page and portfolio

### Performance Monitoring
- **Site speed:** Use tools like PageSpeed Insights
- **Broken links:** Regular link checking
- **Analytics:** Monitor visitor patterns (if Google Analytics added)

## 📱 Mobile Optimization

The Modernist theme is responsive, but always test:
- Text readability on small screens
- Image scaling and loading
- Navigation functionality
- Contact form usability

## 🎯 Next Steps for Your Current Post

1. **Create/source images** for the two placeholders
2. **Review content** in Jekyll preview
3. **Test on mobile** device
4. **Add to git** and push to deploy
5. **Share on professional networks** once live

Your Jekyll CMS is now fully configured for professional blogging with a streamlined workflow that maintains quality while being easy to use!
