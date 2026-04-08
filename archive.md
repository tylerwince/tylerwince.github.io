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
    <a href="/archive/{{ entry.date }}/" class="post-index-row">
      <div class="post-index-header">
        <span class="post-index-title">{{ entry.theme | escape }}</span>
        <span class="post-index-date">{{ entry.date | date: '%Y-%m-%d' }}</span>
      </div>
      <div class="post-index-desc">{{ entry.description | escape }}</div>
    </a>
  {% endfor %}
</div>
