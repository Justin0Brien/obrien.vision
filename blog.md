---
layout: default
title: Blog
permalink: /blog/
description: Essays, field notes, and experiments on perception, AI evaluation, and data storytelling.
---

<div class="page page--blog">
  <header class="page-header page-header--center" data-reveal>
    <p class="section-eyebrow">Notebook</p>
    <h1>Latest posts</h1>
    <p class="section-lead">Analysis, methods, and experiments on perception science, trustworthy AI, and visualisation craft.</p>
  </header>

  {% if site.posts.size > 0 %}
    <div class="grid grid--cards grid--three">
      {% for post in site.posts %}
        <article class="card post-card" data-reveal data-reveal-delay="{{ forloop.index0 | times: 60 }}">
          {% if post.thumbnail or post.image %}
          <div class="card__media">
            <a href="{{ post.url | relative_url }}">
              <img src="{{ post.thumbnail | default: post.image }}" alt="{{ post.title }}" loading="lazy">
            </a>
          </div>
          {% endif %}
          <div class="card__body">
            <p class="card__meta">{{ post.date | date: "%B %d, %Y" }}</p>
            <h2 class="card__title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
            <p class="card__excerpt">{{ post.excerpt | strip_html | truncatewords: 42 }}</p>
            {% if post.tags.size > 0 %}
            <div class="card__tags">
              {% for tag in post.tags limit:3 %}
              <span class="tag">{{ tag }}</span>
              {% endfor %}
            </div>
            {% endif %}
            <div class="card__actions">
              <a href="{{ post.url | relative_url }}" class="btn btn-inline">Read →</a>
            </div>
          </div>
        </article>
      {% endfor %}
    </div>
  {% else %}
    <div class="empty-state" data-reveal>
      <p>Posts coming soon. Expect essays on perceptual experiments, applied AI evaluation, and data storytelling workflows.</p>
    </div>
  {% endif %}
</div>
