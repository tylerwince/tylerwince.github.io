---
layout: default
title: Past Designs
permalink: /archive/
description: Browse every past design of this site.
---

<div class="archive-page">
  <section class="archive-hero" data-reveal>
    <div class="archive-hero-inner">
      <span class="eyebrow">Discography</span>
      <h1 class="archive-title">Past Designs</h1>
      <p class="archive-lead">This site is redesigned by AI every day. Here is every look it has ever had.</p>
    </div>
  </section>

  <section class="archive-list">
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
  </section>
</div>

<style>
.archive-page {
  max-width: var(--max-width-wide);
  margin: 0 auto;
}

.archive-hero {
  padding: var(--space-16) var(--space-8) var(--space-10);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.archive-hero-inner {
  max-width: var(--max-width-content);
  margin: 0 auto;
}

.archive-title {
  font-family: var(--font-display);
  font-size: clamp(32px, 5vw, 48px);
  color: var(--color-text);
  margin: 0 0 var(--space-3);
}

.archive-lead {
  font-family: var(--font-display);
  font-size: 17px;
  font-style: italic;
  color: var(--color-text-secondary);
  margin: 0;
}

.archive-list {
  max-width: var(--max-width-content);
  margin: 0 auto;
  padding: 0 var(--space-8);
}

.archive-list-header {
  display: grid;
  grid-template-columns: 80px 200px 1fr;
  gap: 16px;
  padding: 12px 16px;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
}

.archive-entry {
  display: grid;
  grid-template-columns: 80px 200px 1fr;
  gap: 16px;
  padding: 14px 16px;
  color: var(--color-text);
  text-decoration: none;
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.4;
  border-bottom: 1px solid var(--color-border-light);
  transition: background var(--transition-fast);
}

.archive-entry:last-child {
  border-bottom: none;
}

.archive-entry:hover {
  background: var(--color-warm);
}

.archive-date {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-muted);
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
  color: var(--color-text);
}

.archive-entry:hover .archive-theme {
  color: var(--color-label);
}

.archive-desc {
  font-size: 13px;
  font-style: italic;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 700px) {
  .archive-hero {
    padding: var(--space-10) var(--space-5);
  }

  .archive-list {
    padding: 0 var(--space-5);
  }

  .archive-list-header {
    display: none;
  }

  .archive-entry {
    grid-template-columns: 1fr;
    gap: 2px;
    padding: 12px 0;
  }

  .archive-desc {
    display: none;
  }
}
</style>
