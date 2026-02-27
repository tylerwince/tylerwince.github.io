---
layout: page
title: Writing
permalink: /writing/
description: Essays on product management, technology, and building better software.
---

<div class="receipt-list">
  {% assign sorted_posts = site.posts | sort: 'date' | reverse %}
  {% for post in sorted_posts %}
  <a href="{{ post.url | relative_url }}" class="receipt-item-link" style="border-bottom: 1px dashed var(--color-ink-faded); padding-bottom: 15px; margin-bottom: 5px;">
    <div class="receipt-item">
      <span class="receipt-item-left">{{ post.title | upcase }}</span>
      <span class="receipt-item-right">{{ post.date | date: "%Y-%m-%d" }}</span>
    </div>
    {% if post.description %}
    <div style="font-size: 0.85em; color: var(--color-ink-faded); margin-top: 5px; text-transform: none; line-height: 1.3;">
      {{ post.description }}
    </div>
    {% endif %}
    <div style="font-size: 0.8em; text-align: right; margin-top: 5px;">
      {% assign words = post.content | number_of_words %}
      {% assign minutes = words | divided_by: 200 %}
      {% if minutes < 1 %}{% assign minutes = 1 %}{% endif %}
      ~{{ minutes }} MIN
    </div>
  </a>
  {% endfor %}
</div>
