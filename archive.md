---
layout: default
title: Past Divinations
permalink: /archive/
description: Browse every past spread of this realm.
---

<div class="oracle-page">
  <div class="oracle-header">
    <h1>PAST DIVINATIONS</h1>
    <div style="font-style: italic; color: var(--parchment-dim); margin-top: 15px;">
      Echoes of previous incarnations and forgotten spells.
    </div>
  </div>
    
  <div class="minor-arcana-list">
    {% assign today = site.time | date: "%Y-%m-%d" %}
    {% assign sorted = site.data.archive | sort: "date" | reverse %}
    {% for entry in sorted %}
    {% if entry.date == today %}{% continue %}{% endif %}
    
    <a href="/archive/{{ entry.date }}/" class="minor-arcana-item" style="flex-direction: column; align-items: flex-start;">
      <div style="display: flex; width: 100%; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
        <span class="minor-title">{{ entry.theme | upcase }}</span>
        <span class="minor-date">{{ entry.date | date: "%B %d, %Y" }}</span>
      </div>
      <div style="color: var(--parchment-dim); font-size: 0.95rem; font-style: italic;">
        {{ entry.description | truncate: 120 }}
      </div>
    </a>
    {% endfor %}
  </div>
</div>
