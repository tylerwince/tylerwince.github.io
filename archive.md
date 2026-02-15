---
layout: default
title: Past Designs
permalink: /archive/
description: Browse every past design of this site.
---

<div class="archive-page">
  <div class="win-window win-maximized">
    <div class="win-titlebar">
      <span class="win-titlebar-text">C:\Design Archive</span>
      <div class="win-titlebar-btns">
        <span class="win-btn" aria-hidden="true">_</span>
        <span class="win-btn" aria-hidden="true">&square;</span>
        <span class="win-btn" aria-hidden="true">&times;</span>
      </div>
    </div>
    <div class="win-toolbar">
      <span>File</span>
      <span>Edit</span>
      <span>View</span>
      <span>Help</span>
    </div>

    <div class="archive-window-body">
      <div class="archive-header-bar">
        <span class="eyebrow">Time Travel</span>
        <p class="archive-lead">This site is restyled by AI every day. Here's every look it's ever had.</p>
      </div>

      <div class="win-content archive-list-area">
        <div class="archive-list-header">
          <span class="alh-date">Date</span>
          <span class="alh-theme">Theme</span>
          <span class="alh-desc">Description</span>
        </div>

        {% assign today = site.time | date: "%Y-%m-%d" %}
        {% assign sorted = site.data.archive | sort: "date" | reverse %}
        {% for entry in sorted %}
        {% if entry.date == today %}{% continue %}{% endif %}
        <a href="/archive/{{ entry.date }}/" class="archive-entry">
          <span class="archive-date">{{ entry.date | date: "%m/%d/%Y" }}</span>
          <strong class="archive-theme">{{ entry.theme }}</strong>
          <span class="archive-desc">{{ entry.description }}</span>
        </a>
        {% endfor %}
      </div>
    </div>

    <div class="win-statusbar">
      <span class="win-statusbar-section">{{ site.data.archive | size }} design(s)</span>
    </div>
  </div>
</div>

<style>
.archive-page {
  padding: 0;
}

.archive-window-body {
  margin: 3px;
}

.archive-header-bar {
  background: var(--color-window);
  padding: 10px 12px;
  border-bottom: 1px solid var(--bv-mid-dark);
}

.archive-lead {
  margin: 4px 0 0;
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--color-ink-soft);
}

.archive-list-area {
  padding: 0 !important;
}

.archive-list-header {
  display: grid;
  grid-template-columns: 90px 160px 1fr;
  gap: 4px;
  padding: 2px 6px;
  background: var(--color-button-face);
  box-shadow: var(--bevel-button);
  font-family: var(--font-system);
  font-size: 10px;
  font-weight: 700;
  color: var(--color-ink);
}

.archive-entry {
  display: grid;
  grid-template-columns: 90px 160px 1fr;
  gap: 4px;
  padding: 2px 6px;
  color: var(--color-ink);
  text-decoration: none;
  font-family: var(--font-body);
  font-size: 12px;
  line-height: 1.4;
}

.archive-entry:hover {
  background: var(--color-titlebar);
  color: #fff;
}

.archive-entry:hover .archive-date,
.archive-entry:hover .archive-theme,
.archive-entry:hover .archive-desc {
  color: #fff;
}

.archive-date {
  font-size: 11px;
  color: var(--color-muted);
  white-space: nowrap;
}

.archive-theme {
  font-weight: 700;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.archive-desc {
  font-size: 11px;
  color: var(--color-ink-soft);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 640px) {
  .archive-list-header {
    display: none;
  }

  .archive-entry {
    grid-template-columns: 1fr;
    gap: 0;
    padding: 4px 6px;
    border-bottom: 1px solid var(--color-border-light);
  }

  .archive-desc {
    display: none;
  }
}
</style>
