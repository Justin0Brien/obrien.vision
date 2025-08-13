---
layout: default
title: Blog
permalink: /blog/
---

<div class="blog">
  <header class="page-header">
    <h1>Latest Posts</h1>
    <p>Insights on data visualization, employment trends, and economic analysis</p>
  </header>

  {% if site.posts.size > 0 %}
    <div class="post-list">
      {% for post in site.posts %}
        <article class="post-preview card">
          {% if post.thumbnail or post.image %}
            <div class="post-thumbnail">
              <a href="{{ post.url | relative_url }}">
                <img src="{{ post.thumbnail | default: post.image }}" alt="{{ post.title }}" loading="lazy">
              </a>
            </div>
          {% endif %}
          <div class="post-content card__body">
            <h2 class="card__title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
            <div class="post-meta card__meta">
              <time datetime="{{ post.date | date_to_xmlschema }}">
                {{ post.date | date: "%B %d, %Y" }}
              </time>
              {% if post.tags.size > 0 %}
                <div class="post-tags">
                  {% for tag in post.tags %}
                    <span class="tag">{{ tag }}</span>
                  {% endfor %}
                </div>
              {% endif %}
            </div>
            <div class="post-excerpt card__excerpt">
              {{ post.excerpt | strip_html | truncatewords: 50 }}
            </div>
            <div class="card__actions">
              <a href="{{ post.url | relative_url }}" class="read-more btn btn-primary">Read more →</a>
            </div>
          </div>
        </article>
      {% endfor %}
    </div>
  {% else %}
    <div class="no-posts">
      <p>Posts coming soon! I'll be sharing insights on:</p>
      <ul>
        <li>Data visualization techniques and best practices</li>
        <li>Employment and economic analysis</li>
        <li>Career transition research findings</li>
        <li>Tools and methods for data storytelling</li>
      </ul>
      <p>Check back soon for the latest content.</p>
    </div>
  {% endif %}
</div>
