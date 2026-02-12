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
    {% assign today = site.time | date: "%Y-%m-%d" %}
    {% assign sorted = site.data.archive | sort: "date" | reverse %}
    {% for entry in sorted %}
    {% if entry.date == today %}{% continue %}{% endif %}
    <a href="/archive/{{ entry.date }}/" class="archive-entry">
      <span class="archive-date">
        <span class="archive-day">{{ entry.date | date: "%d" }}</span>
        <span class="archive-month">{{ entry.date | date: "%b %Y" }}</span>
      </span>

      <span class="archive-divider" aria-hidden="true"></span>

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
  padding-top: clamp(1.5rem, 3vw, 2.5rem);
  padding-bottom: clamp(1.5rem, 3vw, 2.5rem);
}

.archive-header {
  padding-bottom: 1.2rem;
  border-bottom: 2px solid var(--color-ink);
  margin-bottom: 0;
}

.archive-header h1 {
  margin: 0.15rem 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 5.5vw, 3.8rem);
  font-weight: 900;
  line-height: 1;
}

.archive-header .lead {
  margin: 0;
  max-width: 50ch;
  color: var(--color-ink-soft);
  font-style: italic;
}

.archive-list {
  display: grid;
  gap: 0;
}

.archive-entry {
  display: grid;
  grid-template-columns: 4.5rem auto 1fr auto;
  gap: 0.8rem;
  align-items: center;
  padding: 0.7rem 0;
  border-bottom: 1px solid var(--color-rule-light);
  color: var(--color-ink);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.archive-entry:hover {
  color: var(--color-red);
}

.archive-date {
  display: grid;
  justify-items: center;
  line-height: 1;
}

.archive-day {
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: 900;
  line-height: 0.85;
}

.archive-month {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  margin-top: 0.1rem;
}

.archive-divider {
  width: 1px;
  height: 100%;
  min-height: 2rem;
  background: var(--color-rule-light);
}

.archive-info {
  display: grid;
  gap: 0.1rem;
  min-width: 0;
}

.archive-info strong {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
}

.archive-info em {
  font-size: 0.82rem;
  color: var(--color-ink-soft);
}

.archive-go {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-muted);
  transition: color var(--transition-fast), transform var(--transition-fast);
}

.archive-entry:hover .archive-go {
  color: var(--color-red);
  transform: translateX(3px);
}

@media (max-width: 640px) {
  .archive-entry {
    grid-template-columns: 3.5rem 1fr auto;
    gap: 0.6rem;
  }

  .archive-divider {
    display: none;
  }
}
</style>
