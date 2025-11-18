---
layout: page
title: Writing
permalink: /writing/
description: Essays on product management, technology, and building better software.
---

<div class="posts-list">
  {% assign sorted_posts = site.posts | sort: 'date' | reverse %}
  {% for post in sorted_posts %}
  <article class="post-item">
    <a href="{{ post.url | relative_url }}">
      <h3>{{ post.title }}</h3>
      {% if post.description %}
      <p class="post-description">{{ post.description }}</p>
      {% endif %}
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %-d, %Y" }}</time>
    </a>
  </article>
  {% endfor %}
</div>

<style>
.posts-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.post-item a {
  display: block;
  padding: var(--space-5);
  background: var(--color-surface-elevated);
  border: 0.5px solid var(--color-border-light);
  border-radius: var(--border-radius);
  color: var(--color-text-primary);
  transition: all var(--transition-base);
}

.post-item a:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: var(--color-border);
}

@media (prefers-color-scheme: dark) {
  .post-item a:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
}

.post-item h3 {
  font-size: 21px;
  font-weight: 600;
  margin: 0 0 8px 0;
  letter-spacing: -0.015em;
  line-height: 1.381;
}

.post-description {
  font-size: 15px;
  color: var(--color-text-secondary);
  line-height: 1.47059;
  letter-spacing: -0.022em;
  margin: 0 0 12px 0;
}

.post-item time {
  font-size: 12px;
  color: var(--color-text-tertiary);
  font-weight: 400;
  letter-spacing: -0.01em;
}
</style>
