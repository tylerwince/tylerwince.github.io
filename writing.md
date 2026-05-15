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
    <div class="post-index-date">{{ post.date | date: "%Y-%m-%d" }}</div>
    <div>
      <span class="post-index-title">{{ post.title | escape }}</span>
      {% if post.description %}<span class="post-index-desc">{{ post.description | escape }}</span>{% endif %}
    </div>
  </a>
  {% endfor %}
</div>
