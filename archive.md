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
    <div class="archive-accent"></div>
  </header>

  <div class="archive-list">
    {% assign today = site.time | date: "%Y-%m-%d" %}
    {% assign sorted = site.data.archive | sort: "date" | reverse %}
    {% for entry in sorted %}
    {% if entry.date == today %}{% continue %}{% endif %}
    <a href="/archive/{{ entry.date }}/" class="archive-entry">
      <div class="archive-entry-date">
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

.archive-accent {
  margin-top: var(--space-6);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--color-green), var(--color-accent));
  border-radius: var(--border-radius-full);
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
  background: var(--color-surface, #ffffff);
  border-radius: var(--border-radius-lg, 20px);
  border: 1px solid var(--color-ink-ghost, rgba(26, 46, 26, 0.1));
  color: var(--color-ink, #1a2e1a);
  transition: all var(--transition-base, 350ms ease);
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.06));
}

.archive-entry:hover {
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0,0,0,0.08));
  color: var(--color-ink, #1a2e1a);
  transform: translateY(-2px);
  border-color: var(--color-green, #2d8a4e);
}

.archive-entry-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
}

.archive-day {
  font-family: var(--font-display, 'DM Serif Display', serif);
  font-size: 2rem;
  font-weight: 400;
  color: var(--color-accent, #e06040);
}

.archive-month {
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 0.65rem;
  color: var(--color-ink-faded, #7a9a7a);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: var(--space-1, 4px);
}

.archive-entry-content h3 {
  font-family: var(--font-display, 'DM Serif Display', serif);
  font-size: 1.05rem;
  font-weight: 400;
  margin: 0 0 var(--space-1, 4px) 0;
  color: var(--color-ink, #1a2e1a);
}

.archive-entry-content p {
  font-size: 0.85rem;
  color: var(--color-ink-faded, #7a9a7a);
  margin: 0;
  line-height: 1.4;
}

.archive-entry-arrow {
  font-size: 1rem;
  color: var(--color-ink-ghost, rgba(26, 46, 26, 0.1));
  transition: all var(--transition-fast, 200ms ease);
}

.archive-entry:hover .archive-entry-arrow {
  transform: translateX(4px);
  color: var(--color-accent, #e06040);
}

@media (max-width: 768px) {
  .archive-entry {
    grid-template-columns: 60px 1fr auto;
    gap: var(--space-4, 16px);
    padding: var(--space-4, 16px);
    border-radius: var(--border-radius, 12px);
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
