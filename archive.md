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
  gap: var(--space-4);
}

.archive-card {
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: var(--space-6);
  align-items: center;
  padding: var(--space-6);
  background: var(--color-surface, #fff);
  border-radius: var(--border-radius-lg, 12px);
  color: var(--color-ink, #1a1a1a);
  transition: all var(--transition-base, 350ms ease);
  box-shadow: var(--shadow-paper, 0 1px 3px rgba(0,0,0,0.06));
}

.archive-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lifted, 0 4px 16px rgba(0,0,0,0.08));
  color: var(--color-ink, #1a1a1a);
}

.archive-card-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
}

.archive-day {
  font-family: var(--font-display, Georgia, serif);
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-accent, #333);
}

.archive-month {
  font-family: var(--font-mono, monospace);
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--color-ink-faded, #888);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: var(--space-1, 4px);
}

.archive-card-content h3 {
  font-family: var(--font-display, Georgia, serif);
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 var(--space-1, 4px) 0;
  color: var(--color-ink, #1a1a1a);
}

.archive-card-content p {
  font-size: 0.9rem;
  color: var(--color-ink-faded, #888);
  margin: 0;
  line-height: 1.4;
}

.archive-card-arrow {
  font-size: 1.25rem;
  color: var(--color-ink-ghost, #ddd);
  transition: all var(--transition-fast, 200ms ease);
}

.archive-card:hover .archive-card-arrow {
  transform: translateX(4px);
  color: var(--color-accent, #333);
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
    font-size: 0.65rem;
  }

  .archive-card-content h3 {
    font-size: 1rem;
  }
}
</style>
