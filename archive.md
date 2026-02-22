---
layout: default
title: Past Designs
permalink: /archive/
description: Browse every past design of this site.
---

<div class="archive-stage">
  <section class="archive-slate" data-reveal>
    <span class="archive-kicker">Design Archive</span>
    <h1 class="archive-heading">Past Designs</h1>
    <p class="archive-lead">This site is redesigned by AI every day. Here is every look it has ever had.</p>
  </section>

  <section class="archive-roll" data-reveal>
    {% assign today = site.time | date: "%Y-%m-%d" %}
    {% assign sorted = site.data.archive | sort: "date" | reverse %}
    {% for entry in sorted %}
    {% if entry.date == today %}{% continue %}{% endif %}
    <a href="/archive/{{ entry.date }}/" class="archive-strip">
      <span class="archive-date">{{ entry.date | date: "%b %d" }}</span>
      <strong class="archive-theme">{{ entry.theme }}</strong>
      <span class="archive-desc">{{ entry.description }}</span>
    </a>
    {% endfor %}
  </section>
</div>

<style>
.archive-stage {
  width: min(var(--max-width-content), 100%);
  margin: 0 auto;
  display: grid;
  gap: clamp(14px, 2vw, 22px);
}

.archive-slate,
.archive-roll {
  border: 1px solid var(--color-panel-border);
  border-radius: var(--border-radius-xl);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(241, 234, 221, 0.86));
  box-shadow: var(--shadow-sm);
}

.archive-slate {
  padding: clamp(18px, 3vw, 30px);
  background:
    linear-gradient(125deg, rgba(46, 124, 143, 0.16), rgba(243, 91, 47, 0.1)),
    linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(241, 234, 221, 0.86));
}

.archive-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.archive-kicker::before {
  content: '';
  width: 16px;
  height: 1px;
  background: var(--color-accent);
}

.archive-heading {
  margin: 0;
  font-size: clamp(56px, 9vw, 110px);
  line-height: 0.85;
}

.archive-lead {
  margin: 8px 0 0;
  max-width: 58ch;
  font-family: var(--font-serif);
  font-size: clamp(1rem, 1.4vw, 1.12rem);
}

.archive-roll {
  padding: clamp(12px, 2vw, 18px);
  display: grid;
  gap: 8px;
}

.archive-strip {
  display: grid;
  grid-template-columns: 76px minmax(0, 280px) minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  color: inherit;
  text-decoration: none;
  padding: 11px 12px;
  border: 1px solid var(--color-border-light);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.62);
  transition: transform var(--transition-base), border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.archive-strip:hover {
  transform: translateX(3px);
  border-color: var(--color-accent);
  box-shadow: var(--shadow-sm);
}

.archive-date {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.archive-theme {
  display: block;
  min-width: 0;
  font-family: var(--font-display);
  font-size: clamp(24px, 3vw, 34px);
  line-height: 0.9;
  letter-spacing: 0.03em;
  color: var(--color-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.archive-desc {
  font-size: 0.93rem;
  color: var(--color-text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 860px) {
  .archive-strip {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .archive-desc,
  .archive-theme {
    white-space: normal;
  }
}
</style>
