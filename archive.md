---
layout: default
title: Past Designs
permalink: /archive/
description: Browse every past design of this site.
---

<div class="archive-page">
  <div class="archive-header" data-reveal>
    <span class="eyebrow">Time Travel</span>
    <p class="archive-lead">This site is restyled by AI every day. Here's every look it's ever had.</p>
  </div>

  <div class="archive-list">
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
      <span class="archive-date">{{ entry.date | date: "%b %d" }}</span>
      <strong class="archive-theme">{{ entry.theme }}</strong>
      <span class="archive-desc">{{ entry.description }}</span>
    </a>
    {% endfor %}
  </div>
</div>

<style>
.archive-page {
  max-width: var(--max-width-content);
}

.archive-header {
  margin-bottom: 32px;
}

.archive-lead {
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 300;
  color: var(--color-ink-soft);
  margin: 8px 0 0;
}

.archive-list {
  border-top: 2px solid var(--color-ink);
}

.archive-list-header {
  display: grid;
  grid-template-columns: 80px 180px 1fr;
  gap: 16px;
  padding: 8px 0;
  font-family: var(--font-display);
  font-size: 14px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
  border-bottom: 1px solid var(--color-border);
}

.archive-entry {
  display: grid;
  grid-template-columns: 80px 180px 1fr;
  gap: 16px;
  padding: 12px 0;
  color: var(--color-ink);
  text-decoration: none;
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.4;
  border-bottom: 1px solid var(--color-border-light);
  transition: padding-left var(--transition-fast), border-bottom-color var(--transition-fast);
}

.archive-entry:hover {
  padding-left: 8px;
  border-bottom-color: var(--color-red);
}

.archive-date {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-muted);
  white-space: nowrap;
  text-transform: uppercase;
}

.archive-theme {
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.archive-entry:hover .archive-theme {
  color: var(--color-red);
}

.archive-desc {
  font-size: 13px;
  font-weight: 300;
  color: var(--color-muted);
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
    gap: 2px;
    padding: 10px 0;
    border-bottom: 1px solid var(--color-border-light);
  }

  .archive-desc {
    display: none;
  }
}
</style>
