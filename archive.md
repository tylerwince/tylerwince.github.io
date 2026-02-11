---
layout: default
title: Past Designs
permalink: /archive/
description: Browse every past design of this site.
---

<div class="archive-atlas content-wrapper">
  <header class="archive-header">
    <span class="eyebrow">Time Travel</span>
    <h1>Design Archive</h1>
    <p class="lead">This site is restyled by AI every day. Here's every look it's ever had.</p>
  </header>

  <div class="archive-grid">
    {% assign today = site.time | date: "%Y-%m-%d" %}
    {% assign sorted = site.data.archive | sort: "date" | reverse %}
    {% for entry in sorted %}
    {% if entry.date == today %}{% continue %}{% endif %}
    <a href="/archive/{{ entry.date }}/" class="archive-entry">
      <div class="archive-stamp">
        <span class="archive-day">{{ entry.date | date: "%d" }}</span>
        <span class="archive-month">{{ entry.date | date: "%b %Y" }}</span>
      </div>

      <span class="archive-node" aria-hidden="true"></span>

      <div class="archive-entry-content">
        <h3>{{ entry.theme }}</h3>
        <p>{{ entry.description }}</p>
      </div>

      <span class="archive-entry-arrow">Open</span>
    </a>
    {% endfor %}
  </div>
</div>

<style>
.archive-atlas {
  max-width: var(--max-width-content);
  padding-top: clamp(1rem, 3vw, 2rem);
  padding-bottom: clamp(1rem, 3vw, 2rem);
}

.archive-header {
  border: 2px solid var(--color-border);
  border-radius: 1.2rem;
  background: var(--color-panel);
  padding: clamp(1rem, 2.4vw, 1.5rem);
  margin-bottom: 0.8rem;
}

.archive-header h1 {
  margin: 0.2rem 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 6vw, 4.2rem);
  line-height: 0.9;
  text-transform: uppercase;
}

.archive-header .lead {
  margin: 0;
  max-width: 58ch;
  color: var(--color-ink-soft);
}

.archive-grid {
  border: 2px solid var(--color-border);
  border-radius: 1.2rem;
  background: var(--color-surface);
  padding: 0.8rem;
  display: grid;
  gap: 0.55rem;
}

.archive-entry {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  gap: 0.7rem;
  align-items: center;
  border: 1px solid var(--color-border-light);
  border-radius: 0.9rem;
  background: var(--color-surface-glow);
  color: var(--color-ink);
  padding: 0.7rem;
  text-decoration: none;
  transition: border-color var(--transition-fast), transform var(--transition-fast);
}

.archive-entry:hover {
  border-color: var(--line-red);
  transform: translateX(5px);
  color: var(--color-ink);
}

.archive-stamp {
  display: grid;
  justify-items: center;
  min-width: 4rem;
}

.archive-day {
  font-family: var(--font-display);
  font-size: 1.8rem;
  line-height: 0.8;
}

.archive-month {
  margin-top: 0.15rem;
  font-family: var(--font-mono);
  font-size: 0.64rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
}

.archive-node {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 999px;
  background: var(--line-blue);
}

.archive-entry-content h3 {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 700;
}

.archive-entry-content p {
  margin: 0.15rem 0 0;
  font-size: 0.82rem;
  color: var(--color-ink-soft);
}

.archive-entry-arrow {
  font-family: var(--font-mono);
  font-size: 0.64rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
}

@media (max-width: 780px) {
  .archive-entry {
    grid-template-columns: auto 1fr;
    gap: 0.55rem;
  }

  .archive-node,
  .archive-entry-arrow {
    display: none;
  }

  .archive-stamp {
    justify-items: start;
    min-width: 0;
  }
}
</style>
