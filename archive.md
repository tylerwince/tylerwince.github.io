---
layout: default
title: Archive
permalink: /archive/
description: Index of past design iterations.
---

<div class="flyer-page">
  <div class="flyer-header">
    <div style="color: var(--c-blue); font-family: var(--font-display); font-size: 1.5rem; display: inline-block; margin-bottom: 10px; border: 2px dashed var(--c-blue); padding: 2px 10px;">EXPIRED DEALS</div>
    <h1>ARCHIVE</h1>
    <div style="font-size: 1.5rem; font-weight: bold; margin-top: 20px; border-bottom: 4px dashed var(--c-black); padding-bottom: 10px; display: inline-block;">
      RECORD OF PAST CIRCULARS AND FLYERS.
    </div>
  </div>
    
  <div class="archive-grid">
    {% assign today = site.time | date: "%Y-%m-%d" %}
    {% assign sorted = site.data.archive | sort: "date" | reverse %}
    {% for entry in sorted %}
    {% if entry.date == today %}{% continue %}{% endif %}
    
    <a href="/archive/{{ entry.date }}/" class="archive-card">
      <div class="archive-theme">{{ entry.theme | upcase }}</div>
      <div style="font-size: 0.9rem; margin-bottom: 15px; flex-grow: 1;">{{ entry.description | truncate: 120 }}</div>
      <div class="archive-date">PUBLISHED: {{ entry.date | date: "%m/%d/%Y" }}</div>
    </a>
    {% endfor %}
  </div>
</div>