---
layout: page
title: Writing
permalink: /writing/
description: Essays on product management, technology, and building better software.
---

<div class="track-list">
  {% assign sorted_posts = site.posts | sort: 'date' | reverse %}
  {% for post in sorted_posts %}
  <a href="{{ post.url | relative_url }}" class="track-item">
    <div class="track-num">{{ forloop.index | prepend: '0' | slice: -2, 2 }}</div>
    <div class="track-title">{{ post.title | escape }}</div>
    <div class="track-time">
      {% assign words = post.content | number_of_words %}
      {% assign minutes = words | divided_by: 200 %}
      {% if minutes < 1 %}{% assign minutes = 1 %}{% endif %}
      {{ minutes }}:00
    </div>
  </a>
  {% endfor %}
</div>
