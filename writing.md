---
layout: page
title: Writing
permalink: /writing/
---

<p>Essays on product management, technology, and building better software.</p>

<div class="posts-list">
  {% assign sorted_posts = site.posts | sort: 'date' | reverse %}
  {% for post in sorted_posts %}
  <article class="post-item">
    <div class="post-content">
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      {% if post.description %}
      <p class="post-description">{{ post.description }}</p>
      {% endif %}
    </div>
    <span class="post-date">{{ post.date | date: "%B %Y" }}</span>
  </article>
  {% endfor %}
</div>

<style>
  .posts-list {
    margin-top: 40px;
  }

  .post-item {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 24px;
    align-items: baseline;
    padding: 24px 0;
    border-bottom: 1px solid #e5e7eb;
  }

  .post-item:last-child {
    border-bottom: none;
  }

  .post-content h2 {
    margin: 0 0 8px 0;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .post-content h2 a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s;
  }

  .post-content h2 a:hover {
    color: #007AFF;
  }

  .post-description {
    margin: 0;
    color: #666;
    font-size: 0.9375rem;
    line-height: 1.5;
  }

  .post-date {
    color: #666;
    font-size: 0.875rem;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .post-item {
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .post-date {
      order: -1;
      font-size: 0.8125rem;
    }
  }
</style>

