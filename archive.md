---
layout: default
title: Past Designs
permalink: /archive/
description: Browse every past design of this site.
---

<div class="archive-page">
  <header class="archive-header">
    <span class="eyebrow">&hearts; Time Travel</span>
    <h1>Design Archive</h1>
    <p class="lead">This site is restyled by AI every day. Here's every look it's ever had.</p>
  </header>

  <div class="archive-list">
    {% assign today = site.time | date: "%Y-%m-%d" %}
    {% assign sorted = site.data.archive | sort: "date" | reverse %}
    {% for entry in sorted %}
    {% if entry.date == today %}{% continue %}{% endif %}
    <a href="/archive/{{ entry.date }}/" class="archive-entry">
      <span class="archive-date">
        <span class="archive-day">{{ entry.date | date: "%d" }}</span>
        <span class="archive-month">{{ entry.date | date: "%b %Y" }}</span>
      </span>

      <span class="archive-info">
        <strong>{{ entry.theme }}</strong>
        <em>{{ entry.description }}</em>
      </span>

      <span class="archive-go">&rarr;</span>
    </a>
    {% endfor %}
  </div>
</div>

<style>
.archive-page {
  max-width: var(--max-width-content);
  padding: 0;
}

.archive-header {
  padding-bottom: 1.5rem;
  border-bottom: 1px dashed var(--color-border);
  margin-bottom: 0;
  text-align: center;
}

.archive-header h1 {
  margin: 0.15rem 0;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4.5vw, 3rem);
  font-weight: 700;
  font-style: italic;
  line-height: 1.1;
}

.archive-header .lead {
  margin: 0.4rem auto 0;
  max-width: 50ch;
  font-family: var(--font-hand);
  font-size: 1.15rem;
  color: var(--color-ink-soft);
}

.archive-list {
  display: grid;
  gap: 0;
}

.archive-entry {
  display: grid;
  grid-template-columns: 4.5rem 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 0.8rem 0.5rem;
  border-bottom: 1px dashed var(--color-border-light);
  color: var(--color-ink);
  text-decoration: none;
  border-radius: var(--border-radius);
  transition: all var(--transition-fast);
}

.archive-entry:hover {
  background: var(--color-rose-glow);
  border-bottom-color: transparent;
}

.archive-date {
  display: grid;
  justify-items: center;
  line-height: 1;
}

.archive-day {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 700;
  font-style: italic;
  line-height: 0.85;
  color: var(--color-rose);
}

.archive-month {
  font-family: var(--font-hand);
  font-size: 0.85rem;
  color: var(--color-muted);
  margin-top: 0.15rem;
}

.archive-info {
  display: grid;
  gap: 0.1rem;
  min-width: 0;
}

.archive-info strong {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 600;
  font-style: italic;
  color: var(--color-ink);
}

.archive-entry:hover .archive-info strong {
  color: var(--color-rose);
}

.archive-info em {
  font-style: normal;
  font-family: var(--font-hand);
  font-size: 0.95rem;
  color: var(--color-ink-soft);
}

.archive-go {
  font-family: var(--font-hand);
  font-size: 1.2rem;
  color: var(--color-muted);
  transition: all var(--transition-fast);
}

.archive-entry:hover .archive-go {
  color: var(--color-rose);
  transform: translateX(3px);
}

@media (max-width: 640px) {
  .archive-entry {
    grid-template-columns: 3.5rem 1fr auto;
    gap: 0.6rem;
    padding: 0.7rem 0.3rem;
  }
}
</style>
