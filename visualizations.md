---
layout: default
title: "Data Visualizations"
permalink: /visualizations/
description: "Interactive data visualizations exploring employment trends, economic patterns, and social dynamics using D3.js and modern web technologies."
---

# Data Visualizations

<p class="lead">Explore complex datasets through interactive visualizations that reveal patterns, trends, and insights in employment data, economic indicators, and social dynamics.</p>

## Featured Visualizations

<div class="visualization-grid">
  {% assign featured_viz = site.visualizations | where: "featured", true %}
  {% for viz in featured_viz %}
    <div class="viz-card featured">
      <h3><a href="{{ viz.url | relative_url }}">{{ viz.title }}</a></h3>
      <p>{{ viz.description | truncate: 120 }}</p>
      {% if viz.technologies %}
        <div class="tech-tags">
          {% for tech in viz.technologies limit: 3 %}
            <span class="tech-tag">{{ tech }}</span>
          {% endfor %}
        </div>
      {% endif %}
      <a href="{{ viz.url | relative_url }}" class="btn btn-primary">Explore →</a>
    </div>
  {% endfor %}
</div>

## All Visualizations

<div class="visualization-list">
  {% for viz in site.visualizations %}
    <div class="viz-item">
      <div class="viz-info">
        <h4><a href="{{ viz.url | relative_url }}">{{ viz.title }}</a></h4>
        <p>{{ viz.description | truncate: 150 }}</p>
        <div class="viz-meta">
          <time>{{ viz.date | date: "%B %Y" }}</time>
          {% if viz.d3_version %}
            <span class="d3-version">D3.js {{ viz.d3_version }}</span>
          {% endif %}
        </div>
      </div>
      {% if viz.preview_image %}
        <div class="viz-preview">
          <img src="{{ viz.preview_image | relative_url }}" alt="{{ viz.title }} preview">
        </div>
      {% endif %}
    </div>
  {% endfor %}
</div>

{% if site.visualizations.size == 0 %}
<div class="empty-state">
  <h3>Coming Soon</h3>
  <p>Interactive visualizations are currently in development. Check back soon for exciting data explorations!</p>
</div>
{% endif %}

## About the Visualizations

These interactive visualizations are built using:

- **D3.js** - For dynamic, data-driven documents
- **Modern Web Standards** - HTML5, CSS3, and ES6+
- **Responsive Design** - Optimized for all device sizes
- **Real Data** - Sourcing from official statistics and research

Each visualization includes:
- Interactive controls for data exploration
- Detailed explanations of patterns and insights
- Source code and data attribution
- Mobile-responsive design

<style>
.lead {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2rem;
}

.visualization-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.viz-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #dee2e6;
}

.viz-card.featured {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.viz-card.featured h3 a {
  color: white;
}

.viz-card h3 {
  margin-top: 0;
}

.viz-card h3 a {
  text-decoration: none;
  color: #333;
}

.tech-tags {
  margin: 1rem 0;
}

.tech-tag {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  margin-right: 0.5rem;
}

.viz-card:not(.featured) .tech-tag {
  background: #007bff;
  color: white;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 0.25rem;
  font-weight: 500;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.viz-card.featured .btn-primary {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.visualization-list {
  margin-top: 3rem;
}

.viz-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  padding: 2rem 0;
  border-bottom: 1px solid #dee2e6;
}

.viz-item:last-child {
  border-bottom: none;
}

.viz-info h4 {
  margin-top: 0;
}

.viz-info h4 a {
  text-decoration: none;
  color: #333;
}

.viz-info h4 a:hover {
  color: #007bff;
}

.viz-meta {
  color: #666;
  font-size: 0.875rem;
  margin-top: 1rem;
}

.d3-version {
  background: #e7f3ff;
  color: #0066cc;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  margin-left: 1rem;
}

.viz-preview {
  width: 200px;
  flex-shrink: 0;
}

.viz-preview img {
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
  .viz-item {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .viz-preview {
    width: 100%;
  }
}
</style>
