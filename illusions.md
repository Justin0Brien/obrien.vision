---
layout: default
title: "Visual Illusions"
permalink: /illusions/
description: "Interactive visual illusions and optical effects that demonstrate the fascinating ways our perception can be manipulated and surprised."
---

# Visual Illusions

<p class="lead">Discover the fascinating world of visual perception through interactive illusions that challenge how we see and interpret the world around us.</p>

## Featured Illusions

<div class="illusion-grid">
  {% assign featured_illusions = site.illusions | where: "featured", true %}
  {% for illusion in featured_illusions %}
    <div class="illusion-card featured">
      <h3><a href="{{ illusion.url | relative_url }}">{{ illusion.title }}</a></h3>
      <p>{{ illusion.description | truncate: 120 }}</p>
      {% if illusion.illusion_type %}
        <span class="illusion-type-badge">{{ illusion.illusion_type }}</span>
      {% endif %}
      <a href="{{ illusion.url | relative_url }}" class="btn btn-primary">Experience →</a>
    </div>
  {% endfor %}
</div>

## Illusion Categories

<div class="category-grid">
  <div class="category-card">
    <h4>Optical Illusions</h4>
    <p>Classic visual tricks that manipulate depth, motion, and color perception.</p>
    <div class="category-count">
      {% assign optical = site.illusions | where: "category", "optical" %}
      {{ optical.size }} illusions
    </div>
  </div>
  
  <div class="category-card">
    <h4>Motion Effects</h4>
    <p>Animations and patterns that create illusions of movement and flow.</p>
    <div class="category-count">
      {% assign motion = site.illusions | where: "category", "motion" %}
      {{ motion.size }} illusions
    </div>
  </div>
  
  <div class="category-card">
    <h4>Geometric Puzzles</h4>
    <p>Shape and size illusions that challenge spatial reasoning.</p>
    <div class="category-count">
      {% assign geometric = site.illusions | where: "category", "geometric" %}
      {{ geometric.size }} illusions
    </div>
  </div>
  
  <div class="category-card">
    <h4>Color & Contrast</h4>
    <p>Demonstrations of how context affects color and brightness perception.</p>
    <div class="category-count">
      {% assign color = site.illusions | where: "category", "color" %}
      {{ color.size }} illusions
    </div>
  </div>
</div>

## All Illusions

<div class="illusion-list">
  {% for illusion in site.illusions %}
    <div class="illusion-item">
      <div class="illusion-info">
        <h4><a href="{{ illusion.url | relative_url }}">{{ illusion.title }}</a></h4>
        <p>{{ illusion.description | truncate: 150 }}</p>
        <div class="illusion-meta">
          <time>{{ illusion.date | date: "%B %Y" }}</time>
          {% if illusion.illusion_type %}
            <span class="type-tag">{{ illusion.illusion_type }}</span>
          {% endif %}
          {% if illusion.interactive %}
            <span class="interactive-badge">Interactive</span>
          {% endif %}
        </div>
      </div>
      {% if illusion.preview_image %}
        <div class="illusion-preview">
          <img src="{{ illusion.preview_image | relative_url }}" alt="{{ illusion.title }} preview">
        </div>
      {% endif %}
    </div>
  {% endfor %}
</div>

{% if site.illusions.size == 0 %}
<div class="empty-state">
  <h3>Coming Soon</h3>
  <p>Mind-bending visual illusions are currently being prepared. Get ready to question what you see!</p>
</div>
{% endif %}

## About Visual Illusions

Visual illusions reveal the fascinating gap between reality and perception. They demonstrate:

- **Perceptual Processing** - How our brain interprets visual information
- **Contextual Effects** - How surrounding elements influence what we see
- **Cognitive Biases** - Built-in shortcuts that can be exploited
- **Neural Mechanisms** - The biological basis of visual processing

### Safety Notice

Some illusions may cause:
- Temporary visual effects
- Dizziness or discomfort for sensitive individuals
- Seizures in those with photosensitive epilepsy

Always take breaks and stop if you experience discomfort.

<style>
.lead {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2rem;
}

.illusion-grid, .category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.illusion-card, .category-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #dee2e6;
}

.illusion-card.featured {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  border: none;
}

.illusion-card.featured h3 a {
  color: white;
}

.illusion-card h3, .category-card h4 {
  margin-top: 0;
}

.illusion-card h3 a, .category-card h4 {
  text-decoration: none;
  color: #333;
}

.illusion-type-badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  margin: 0.5rem 0;
  display: inline-block;
}

.illusion-card:not(.featured) .illusion-type-badge {
  background: #ffc107;
  color: #212529;
}

.category-count {
  color: #666;
  font-size: 0.875rem;
  margin-top: 1rem;
  font-style: italic;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 0.25rem;
  font-weight: 500;
  margin-top: 1rem;
}

.btn-primary {
  background: #dc3545;
  color: white;
}

.illusion-card.featured .btn-primary {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.illusion-list {
  margin-top: 3rem;
}

.illusion-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  padding: 2rem 0;
  border-bottom: 1px solid #dee2e6;
}

.illusion-item:last-child {
  border-bottom: none;
}

.illusion-info h4 {
  margin-top: 0;
}

.illusion-info h4 a {
  text-decoration: none;
  color: #333;
}

.illusion-info h4 a:hover {
  color: #dc3545;
}

.illusion-meta {
  color: #666;
  font-size: 0.875rem;
  margin-top: 1rem;
}

.type-tag {
  background: #fff3cd;
  color: #856404;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  margin-left: 1rem;
}

.interactive-badge {
  background: #d1ecf1;
  color: #0c5460;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  margin-left: 0.5rem;
}

.illusion-preview {
  width: 200px;
  flex-shrink: 0;
}

.illusion-preview img {
  width: 100%;
  height: auto;
  border-radius: 0.25rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
}

@media (max-width: 768px) {
  .illusion-item {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .illusion-preview {
    width: 100%;
  }
}
</style>
