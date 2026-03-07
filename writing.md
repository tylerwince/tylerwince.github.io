---
layout: page
title: Writing
permalink: /writing/
description: Essays on product management, technology, and building better software.
---

<div class="post-index">
  {% assign sorted_posts = site.posts | sort: 'date' | reverse %}
  {% for post in sorted_posts %}
  <a href="{{ post.url | relative_url }}" class="post-index-row">
    <div class="post-index-header">
      <span class="post-index-title">{{ post.title }}</span>
      <span class="post-index-date">{{ post.date | date: "%Y-%m-%d" }}</span>
    </div>
    {% if post.description %}
    <div class="post-index-desc">{{ post.description }}</div>
    {% endif %}
    <div class="post-index-meta">
      {% assign words = post.content | number_of_words %}
      {% assign minutes = words | divided_by: 200 %}
      {% if minutes < 1 %}{% assign minutes = 1 %}{% endif %}
      ~{{ minutes }} min
    </div>
  </a>
  {% endfor %}
</div>
