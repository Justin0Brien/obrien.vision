---
layout: page
title: Blog
permalink: /blog/
---

# Latest Posts

{% if site.posts.size > 0 %}
  <div class="post-list">
    {% for post in site.posts %}
      <article class="post-preview">
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <div class="post-meta">
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
        <div class="post-excerpt">
          {{ post.excerpt | strip_html | truncatewords: 50 }}
        </div>
        <a href="{{ post.url | relative_url }}" class="read-more">Read more →</a>
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
