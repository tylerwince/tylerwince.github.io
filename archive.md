---
layout: default
title: Past Designs
permalink: /archive/
description: Browse every past design of this site.
---

<div class="cli-archive">
  <div class="cli-command">history | grep "theme"</div>
  <div class="cli-output">
    <h1>Past Designs</h1>
    <p style="color: var(--color-text-muted);">// This site is redesigned by AI every day. Archive logs below.</p>
    
    <div class="table-list" style="margin-top: 2em;">
      {% assign today = site.time | date: "%Y-%m-%d" %}
      {% assign sorted = site.data.archive | sort: "date" | reverse %}
      {% for entry in sorted %}
      {% if entry.date == today %}{% continue %}{% endif %}
      <div class="table-row">
        <span style="color: var(--color-text-muted);">{{ entry.date | date: "%Y-%m-%d" }}</span>
        <span><a href="/archive/{{ entry.date }}/">{{ entry.theme }}</a></span>
        <span style="color: var(--color-border-dim);">{{ entry.description | truncate: 60 }}</span>
      </div>
      {% endfor %}
    </div>
  </div>
</div>
