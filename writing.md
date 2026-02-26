---
layout: page
title: Writing
permalink: /writing/
description: Essays on product management, technology, and building better software.
---

<div class="journal-list">
  {% assign sorted_posts = site.posts | sort: 'date' | reverse %}
  {% for post in sorted_posts %}
  <div class="journal-entry" style="align-items: center; border-bottom: 1px dashed var(--color-paper-line); padding-bottom: 15px; margin-bottom: 20px;">
    <div class="journal-date" style="font-size: 1.4rem; transform: rotate(-1deg); min-width: 140px;">
      {{ post.date | date: "%B %-d, %Y" }}
    </div>
    <div style="flex: 1;">
      <a href="{{ post.url | relative_url }}" class="journal-title" style="font-size: 1.8rem; display: block;">{{ post.title }}</a>
      {% if post.description %}
      <p style="font-family: var(--font-handwriting); font-size: 1.4rem; color: var(--color-ink-faded); margin: 5px 0 0 0; line-height: 1.2;">
        {{ post.description }}
      </p>
      {% endif %}
    </div>
    <div style="font-family: var(--font-handwriting); color: var(--color-ink-faded); font-size: 1.2rem; min-width: 80px; text-align: right;">
      {% assign words = post.content | number_of_words %}
      {% assign minutes = words | divided_by: 200 %}
      {% if minutes < 1 %}{% assign minutes = 1 %}{% endif %}
      ~{{ minutes }} min
    </div>
  </div>
  {% endfor %}
</div>
