---
layout: default
title: Past Designs
permalink: /archive/
description: Browse every past design of this site.
---

<div class="archive-comic-page">
  <div class="archive-splash" data-reveal>
    <div class="archive-splash-bar">
      <span class="archive-bar-label">Archive</span>
    </div>
    <div class="archive-splash-content">
      <span class="eyebrow">Design History</span>
      <p class="archive-lead">This site is redesigned by AI every day. Here is every look it has ever had.</p>
    </div>
  </div>

  <div class="archive-panels">
    <div class="archive-panels-header">
      <span class="aph-date">Date</span>
      <span class="aph-theme">Theme</span>
      <span class="aph-desc">Description</span>
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
.archive-comic-page {
  display: flex;
  flex-direction: column;
  gap: var(--panel-gutter);
  max-width: var(--max-width-content);
  margin: 0 auto;
}

.archive-splash {
  background: var(--color-paper);
  border: 4px solid var(--color-ink);
}

.archive-splash-bar {
  padding: 10px 16px;
  background: var(--color-ink);
  border-bottom: 3px solid var(--color-ink);
}

.archive-bar-label {
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--color-paper);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.archive-splash-content {
  padding: 24px;
}

.archive-lead {
  font-family: var(--font-body);
  font-size: 15px;
  font-style: italic;
  color: var(--color-ink-soft);
  margin: 8px 0 0;
}

.archive-panels {
  background: var(--color-paper);
  border: 4px solid var(--color-ink);
  overflow: hidden;
}

.archive-panels-header {
  display: grid;
  grid-template-columns: 72px 180px 1fr;
  gap: 16px;
  padding: 10px 14px;
  font-family: var(--font-display);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-paper);
  background: var(--color-ink);
  border-bottom: 3px solid var(--color-ink);
}

.archive-entry {
  display: grid;
  grid-template-columns: 72px 180px 1fr;
  gap: 16px;
  padding: 12px 14px;
  color: var(--color-ink);
  text-decoration: none;
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.4;
  border-bottom: 2px solid var(--color-ink);
  transition: background var(--transition-fast);
}

.archive-entry:last-child {
  border-bottom: none;
}

.archive-entry:hover {
  background: var(--color-caption);
}

.archive-date {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-muted);
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.archive-theme {
  font-family: var(--font-display);
  font-size: 17px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-ink);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.archive-entry:hover .archive-theme {
  color: var(--color-red);
}

.archive-desc {
  font-size: 13px;
  font-style: italic;
  color: var(--color-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 600px) {
  .archive-panels-header {
    display: none;
  }

  .archive-entry {
    grid-template-columns: 1fr;
    gap: 2px;
    padding: 12px 14px;
  }

  .archive-desc {
    display: none;
  }
}
</style>
