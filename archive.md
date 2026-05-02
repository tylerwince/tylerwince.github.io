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
    <a href="/archive/{{ entry.date }}/" class="album-sleeve">
      <div class="sleeve-info">
        <div class="sleeve-title">{{ entry.theme | escape }}</div>
        <div class="sleeve-author">{{ entry.date | date: '%Y-%m-%d' }}</div>
      </div>
      <div class="sleeve-rating" style="font-size: 10px; opacity: 0.6;">
        HISTORICAL LOG
      </div>
    </a>
  {% endfor %}
</div>
