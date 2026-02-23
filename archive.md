---
layout: default
title: Past Designs
permalink: /archive/
description: Browse every past design of this site.
---

<div class="archive-paper-wrap">
  <section class="paper-sheet archive-heading" data-reveal>
    <span class="eyebrow mb-3">Design Archive</span>
    <h1 class="archive-title">Past Designs</h1>
    <p class="archive-lead">This site is redesigned by AI every day. Here is every look it has ever had.</p>
  </section>

  <section class="paper-sheet archive-list" data-reveal>
    {% assign today = site.time | date: "%Y-%m-%d" %}
    {% assign sorted = site.data.archive | sort: "date" | reverse %}
    {% for entry in sorted %}
    {% if entry.date == today %}{% continue %}{% endif %}
    <a href="/archive/{{ entry.date }}/" class="archive-slip">
      <span class="archive-slip-date">{{ entry.date | date: "%b %d" }}</span>
      <strong class="archive-slip-theme">{{ entry.theme }}</strong>
      <span class="archive-slip-desc">{{ entry.description }}</span>
    </a>
    {% endfor %}
  </section>
</div>

<style>
.archive-paper-wrap {
  width: min(var(--max-width-content), 100%);
  margin: 0 auto;
  display: grid;
  gap: 20px;
}

.archive-heading {
  padding: clamp(24px, 4vw, 40px);
  transform: rotate(-0.2deg);
  position: relative;
}

.archive-heading::before {
  content: '';
  position: absolute;
  top: -6px;
  right: 48px;
  width: 55px;
  height: 18px;
  background: var(--color-tape);
  border: 1px solid rgba(200, 190, 130, 0.3);
  transform: rotate(2deg);
}

.archive-title {
  margin: 0;
  font-size: clamp(38px, 7vw, 76px);
  line-height: 1.05;
}

.archive-lead {
  margin: 8px 0 0;
  font-family: var(--font-hand);
  font-size: clamp(18px, 2.5vw, 24px);
  color: var(--color-text-secondary);
  max-width: 50ch;
}

.archive-list {
  padding: clamp(16px, 2vw, 24px);
  display: grid;
  gap: 0;
}

.archive-slip {
  display: grid;
  grid-template-columns: 72px minmax(0, 240px) minmax(0, 1fr);
  gap: 12px;
  align-items: baseline;
  padding: 12px 10px;
  color: inherit;
  text-decoration: none;
  border-bottom: 1px dashed var(--color-border);
  transition: background var(--transition-fast), padding-left var(--transition-base);
}

.archive-slip:first-child {
  border-top: 1px dashed var(--color-border);
}

.archive-slip:hover {
  background: var(--color-paper-warm);
  padding-left: 14px;
}

.archive-slip-date {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
}

.archive-slip-theme {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(20px, 2.5vw, 28px);
  line-height: 1.1;
  color: var(--color-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.archive-slip-desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 700px) {
  .archive-slip {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .archive-slip-theme,
  .archive-slip-desc {
    white-space: normal;
  }

  .archive-heading {
    transform: none;
  }
}
</style>
