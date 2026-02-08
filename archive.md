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

  <div class="archive-grid">
    {% assign sorted = site.data.archive | sort: "date" | reverse %}
    {% for entry in sorted %}
    <a href="/archive/{{ entry.date }}/" class="archive-card">
      <div class="archive-card-date">
        <span class="archive-day">{{ entry.date | date: "%d" }}</span>
        <span class="archive-month">{{ entry.date | date: "%b %Y" }}</span>
      </div>
      <div class="archive-card-content">
        <h3>{{ entry.theme }}</h3>
        <p>{{ entry.description }}</p>
      </div>
      <span class="archive-card-arrow">&rarr;</span>
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

.archive-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.archive-card {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: var(--space-6);
  align-items: center;
  padding: var(--space-5) var(--space-6);
  background: transparent;
  border: 1px solid var(--color-ink-ghost, rgba(104, 137, 168, 0.25));
  color: var(--color-ink, #D4E4F7);
  transition: all var(--transition-base, 350ms ease);
  position: relative;
}

.archive-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-accent, #4FC3F7);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform var(--transition-base, 350ms ease);
}

.archive-card:hover {
  border-color: var(--color-dimension, rgba(79, 195, 247, 0.4));
  background: rgba(79, 195, 247, 0.03);
  color: var(--color-ink, #D4E4F7);
}

.archive-card:hover::before {
  transform: scaleY(1);
}

.archive-card-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
}

.archive-day {
  font-family: var(--font-display, 'Archivo', sans-serif);
  font-size: 2rem;
  font-weight: 900;
  color: var(--color-accent, #4FC3F7);
}

.archive-month {
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-size: 0.65rem;
  font-weight: 400;
  color: var(--color-ink-faded, #6889A8);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: var(--space-1, 4px);
}

.archive-card-content h3 {
  font-family: var(--font-display, 'Archivo', sans-serif);
  font-size: 1rem;
  font-weight: 800;
  margin: 0 0 var(--space-1, 4px) 0;
  color: var(--color-ink, #D4E4F7);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.archive-card-content p {
  font-size: 0.85rem;
  color: var(--color-ink-faded, #6889A8);
  margin: 0;
  line-height: 1.4;
}

.archive-card-arrow {
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-size: 1rem;
  color: var(--color-ink-ghost, rgba(104, 137, 168, 0.25));
  transition: all var(--transition-fast, 200ms ease);
}

.archive-card:hover .archive-card-arrow {
  transform: translateX(4px);
  color: var(--color-accent, #4FC3F7);
}

@media (max-width: 768px) {
  .archive-card {
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

  .archive-card-content h3 {
    font-size: 0.9rem;
  }
}
</style>
