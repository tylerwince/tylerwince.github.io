---
layout: default
title: Archive
permalink: /archive/
description: The historical index of design.
---

<div class="ed-archive">
  <header class="ed-article-header">
    <h1 class="ed-article-title">ARCHIVE</h1>
    <div class="ed-article-lede">THE HISTORICAL INDEX OF DESIGN.</div>
  </header>
    
  <div class="ed-archive-table">
    <div class="ed-at-header">
      <div class="ed-at-date">DATE</div>
      <div class="ed-at-theme">THEME</div>
    </div>
    {% assign today = site.time | date: "%Y-%m-%d" %}
    {% assign sorted = site.data.archive | sort: "date" | reverse %}
    {% for entry in sorted %}
    {% if entry.date == today %}{% continue %}{% endif %}
    
    <a href="/archive/{{ entry.date }}/" class="ed-at-row">
      <div class="ed-at-date">{{ entry.date | date: "%y.%m.%d" }}</div>
      <div class="ed-at-theme">
        <strong>{{ entry.theme | upcase }}</strong><br>
        <span class="ed-at-desc">{{ entry.description }}</span>
      </div>
    </a>
    {% endfor %}
  </div>
</div>