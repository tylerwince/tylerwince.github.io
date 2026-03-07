---
layout: page
title: Archive
permalink: /archive/
description: The historical index of design.
---

<div class="archive-table">
  <div class="archive-header-row">
    <div>Date</div>
    <div>Theme</div>
  </div>
  {% assign today = site.time | date: "%Y-%m-%d" %}
  {% assign sorted = site.data.archive | sort: "date" | reverse %}
  {% for entry in sorted %}
    {% if entry.date == today %}{% continue %}{% endif %}
    <a href="/archive/{{ entry.date }}/" class="archive-row">
      <div class="archive-date">{{ entry.date | date: "%y.%m.%d" }}</div>
      <div>
        <div class="archive-theme">{{ entry.theme }}</div>
        <div class="archive-desc">{{ entry.description }}</div>
      </div>
    </a>
  {% endfor %}
</div>
