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
  margin: 0 auto;
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
  border-top: 1px solid var(--color-border);
}

.archive-list-header {
  display: grid;
  grid-template-columns: 80px 180px 1fr;
  gap: 16px;
  padding: 10px 0;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  border-bottom: 1px solid var(--color-border);
}

.archive-entry {
  display: grid;
  grid-template-columns: 80px 180px 1fr;
  gap: 16px;
  padding: 14px 12px;
  color: var(--color-ink);
  text-decoration: none;
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.4;
  border-bottom: 1px solid var(--color-border-light);
  border-radius: var(--border-radius);
  transition: background var(--transition-fast), border-color var(--transition-fast);
}

.archive-entry:hover {
  background: rgba(0, 229, 255, 0.04);
  border-bottom-color: var(--color-border);
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
  color: var(--color-cyan);
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
    padding: 12px 8px;
  }

  .archive-desc {
    display: none;
  }
}
</style>
