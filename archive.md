---
layout: default
title: Past Designs
permalink: /archive/
description: Browse every past design of this site.
---

<div class="receipt-archive">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="font-size: 1.5em;">ARCHIVE LOGS</h1>
    <div>--- PAST DEPLOYMENTS ---</div>
  </div>
    
  <div class="receipt-list">
    {% assign today = site.time | date: "%Y-%m-%d" %}
    {% assign sorted = site.data.archive | sort: "date" | reverse %}
    {% for entry in sorted %}
    {% if entry.date == today %}{% continue %}{% endif %}
    
    <div style="margin-bottom: 15px;">
      <a href="/archive/{{ entry.date }}/" class="receipt-item-link" style="display: block; border: 1px dashed var(--color-ink); padding: 10px;">
        <div class="receipt-item">
          <span style="font-weight: bold;">{{ entry.date | date: "%Y-%m-%d" }}</span>
          <span>[VIEW]</span>
        </div>
        <div style="margin-top: 5px; font-weight: bold;">{{ entry.theme | upcase }}</div>
        <div style="margin-top: 5px; font-size: 0.8em; text-transform: none;">{{ entry.description | truncate: 80 }}</div>
      </a>
    </div>
    {% endfor %}
  </div>
</div>
