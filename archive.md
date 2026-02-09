---
layout: default
title: Past Designs
permalink: /archive/
description: Browse every past design of this site.
---

<div class="archive-page content-wrapper">
  <header class="archive-header">
    <span class="eyebrow">Time Travel</span>
    <h1>Design Archive</h1>
    <p class="lead">This site is restyled by AI every day. Here's every look it's ever had.</p>
  </header>

  <div class="archive-list">
    {% assign sorted = site.data.archive | sort: "date" | reverse %}
    {% for entry in sorted %}
    <a href="/archive/{{ entry.date }}/" class="archive-entry">
      <div class="archive-entry-number">
        <span class="archive-day">{{ entry.date | date: "%d" }}</span>
        <span class="archive-month">{{ entry.date | date: "%b %Y" }}</span>
      </div>
      <div class="archive-entry-content">
        <h3>{{ entry.theme }}</h3>
        <p>{{ entry.description }}</p>
      </div>
      <span class="archive-entry-arrow">&rarr;</span>
    </a>
    {% endfor %}
  </div>
</div>

<style>
.archive-page {
  max-width: var(--max-width-content);
}

.archive-header {
  margin-bottom: var(--space-12);
}

.archive-header h1 {
  margin-bottom: var(--space-3);
}

.archive-header .lead {
  max-width: 500px;
}

.archive-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.archive-entry {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: var(--space-6);
  align-items: center;
  padding: var(--space-5) var(--space-6);
  background: var(--color-bg-light, rgba(35, 30, 24, 0.9));
  border: 1px solid var(--color-ink-ghost, rgba(138, 126, 104, 0.3));
  color: var(--color-ink, #e8dcc4);
  transition: all var(--transition-base, 350ms ease);
  position: relative;
}

.archive-entry::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 3px;
  background: var(--color-accent, #c45c3c);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform var(--transition-base, 350ms ease);
}

.archive-entry:hover {
  border-color: var(--color-accent, #c45c3c);
  background: rgba(196, 92, 60, 0.04);
  color: var(--color-ink, #e8dcc4);
  transform: translateX(4px);
}

.archive-entry:hover::before {
  transform: scaleY(1);
}

.archive-entry-number {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
}

.archive-day {
  font-family: var(--font-display, 'Playfair Display', serif);
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-accent, #c45c3c);
}

.archive-month {
  font-family: var(--font-typewriter, 'Courier Prime', monospace);
  font-size: 0.65rem;
  color: var(--color-ink-faded, #8a7e68);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: var(--space-1, 4px);
}

.archive-entry-content h3 {
  font-family: var(--font-display, 'Playfair Display', serif);
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 var(--space-1, 4px) 0;
  color: var(--color-ink, #e8dcc4);
  letter-spacing: 0;
}

.archive-entry-content p {
  font-size: 0.85rem;
  color: var(--color-ink-faded, #8a7e68);
  margin: 0;
  line-height: 1.4;
}

.archive-entry-arrow {
  font-family: var(--font-typewriter, 'Courier Prime', monospace);
  font-size: 1rem;
  color: var(--color-ink-ghost, rgba(138, 126, 104, 0.3));
  transition: all var(--transition-fast, 200ms ease);
}

.archive-entry:hover .archive-entry-arrow {
  transform: translateX(4px);
  color: var(--color-accent, #c45c3c);
}

@media (max-width: 768px) {
  .archive-entry {
    grid-template-columns: 60px 1fr auto;
    gap: var(--space-4, 16px);
    padding: var(--space-4, 16px);
  }

  .archive-day {
    font-size: 1.5rem;
  }

  .archive-month {
    font-size: 0.6rem;
  }

  .archive-entry-content h3 {
    font-size: 0.9rem;
  }
}
</style>
