---
layout: page
title: Archive
permalink: /archive/
description: The historical index of design.
---
<div class="archive-container">
  {% assign today = site.time | date: "%Y-%m-%d" %}
  {% assign sorted = site.data.archive | sort: "date" | reverse %}
  {% for entry in sorted %}
    {% if entry.date == today %}{% continue %}{% endif %}
    <a href="/archive/{{ entry.date }}/" class="post-index-row connect-point" data-id="archive-{{ forloop.index }}">
      <div class="post-index-title">{{ entry.theme | escape }}</div>
      <div class="post-index-date">Logged: {{ entry.date | date: '%Y-%m-%d' }}</div>
      <div class="post-index-desc">Notes: {{ entry.description | escape }}</div>
    </a>
  {% endfor %}
</div>