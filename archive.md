---
layout: default
title: Archive
permalink: /archive/
description: Index of past design iterations.
---

<div class="page-container">
  <div class="page-header">
    <h1>ARCHIVE</h1>
    <div style="font-size: 1.5rem; font-weight: 600; margin-top: 20px;">
      SYSTEM RECORD OF PAST ITERATIONS.
    </div>
  </div>
    
  <div class="archive-list">
    {% assign today = site.time | date: "%Y-%m-%d" %}
    {% assign sorted = site.data.archive | sort: "date" | reverse %}
    {% for entry in sorted %}
    {% if entry.date == today %}{% continue %}{% endif %}
    
    <a href="/archive/{{ entry.date }}/" class="archive-item">
      <div>
        <div class="archive-theme">{{ entry.theme | upcase }}</div>
        <div style="font-family: var(--font-mono); font-size: 0.9rem; margin-top: 5px;">{{ entry.description | truncate: 120 }}</div>
      </div>
      <div class="archive-date">{{ entry.date | date: "%Y.%m.%d" }}</div>
    </a>
    {% endfor %}
  </div>
</div>