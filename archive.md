---
layout: default
title: Past Designs
permalink: /archive/
description: Browse every past design of this site.
---

<div class="notebook-archive">
  <div class="archive-header" style="margin-bottom: calc(var(--line-height) * 1.5);">
    <h1 style="font-size: 3.5rem; margin-top: 0;">Past Designs</h1>
    <p style="font-family: var(--font-handwriting); font-size: 1.6rem; color: var(--color-ink-faded); transform: rotate(1deg);">
      This site is redesigned by AI every day. Archive logs below.
    </p>
  </div>
    
  <div class="journal-list" style="margin-top: 2em;">
    {% assign today = site.time | date: "%Y-%m-%d" %}
    {% assign sorted = site.data.archive | sort: "date" | reverse %}
    {% for entry in sorted %}
    {% if entry.date == today %}{% continue %}{% endif %}
    <div class="journal-entry" style="align-items: center; border-bottom: 1px dashed var(--color-paper-line); padding-bottom: 10px;">
      <span class="journal-date" style="font-size: 1.2rem; transform: none; min-width: 120px;">{{ entry.date | date: "%b %d, %Y" }}</span>
      <span class="journal-title" style="flex: 1;"><a href="/archive/{{ entry.date }}/" style="font-size: 1.4rem;">{{ entry.theme }}</a></span>
      <span style="font-family: var(--font-handwriting); color: var(--color-ink-faded); font-size: 1.2rem;">{{ entry.description | truncate: 60 }}</span>
    </div>
    {% endfor %}
  </div>
</div>
