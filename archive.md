---
layout: default
title: Past Designs
permalink: /archive/
description: Browse every past design of this site.
---

<div class="vhs-archive-wrap">
  <section class="vhs-archive-heading" data-reveal>
    <div class="archive-heading-strip"></div>
    <div class="archive-heading-inner">
      <span class="eyebrow mb-3">Design Archive</span>
      <h1 class="archive-title">Past Designs</h1>
      <p class="archive-lead">This site is redesigned by AI every day. Here is every look it has ever had.</p>
    </div>
  </section>

  <section class="vhs-archive-list" data-reveal>
    {% assign today = site.time | date: "%Y-%m-%d" %}
    {% assign sorted = site.data.archive | sort: "date" | reverse %}
    {% for entry in sorted %}
    {% if entry.date == today %}{% continue %}{% endif %}
    <a href="/archive/{{ entry.date }}/" class="archive-entry">
      <time class="archive-entry-date">{{ entry.date | date: "%b %d" }}</time>
      <strong class="archive-entry-theme">{{ entry.theme }}</strong>
      <span class="archive-entry-desc">{{ entry.description }}</span>
    </a>
    {% endfor %}
  </section>
</div>

<style>
.vhs-archive-wrap {
  width: min(var(--max-width-content), 100%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.vhs-archive-heading {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
}

.archive-heading-strip {
  height: 3px;
  background: linear-gradient(to right, var(--color-neon-purple), var(--color-neon-blue), var(--color-neon-pink));
}

.archive-heading-inner {
  padding: clamp(24px, 4vw, 40px);
}

.archive-title {
  margin: 0;
  font-size: clamp(38px, 7vw, 76px);
  line-height: 1.05;
}
.archive-lead {
  margin: 8px 0 0;
  font-size: clamp(18px, 2.5vw, 24px);
  color: var(--color-text-secondary);
  max-width: 50ch;
}

.vhs-archive-list {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: clamp(16px, 2vw, 24px);
  display: flex;
  flex-direction: column;
}

.archive-entry {
  display: grid;
  grid-template-columns: 72px minmax(0, 240px) minmax(0, 1fr);
  gap: 12px;
  align-items: baseline;
  padding: 12px 10px;
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid var(--color-border);
  transition: background var(--transition-fast), padding-left var(--transition-base);
}
.archive-entry:first-child {
  border-top: 1px solid var(--color-border);
}
.archive-entry:hover {
  background: rgba(0, 212, 255, 0.04);
  padding-left: 14px;
}
.archive-entry-date {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--color-neon-pink);
  text-shadow: 0 0 4px rgba(255, 42, 109, 0.3);
}
.archive-entry-theme {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(18px, 2.5vw, 26px);
  line-height: 1.1;
  color: var(--color-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.archive-entry-desc {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 700px) {
  .archive-entry {
    grid-template-columns: 1fr;
    gap: 4px;
  }
  .archive-entry-theme,
  .archive-entry-desc {
    white-space: normal;
  }
}
</style>
