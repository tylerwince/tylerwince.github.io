---
layout: page
title: Archive
permalink: /archive/
description: The historical index of designs. Every day, a different look.
---

<div class="archive-table">
  {% assign today = site.time | date: "%Y-%m-%d" %}
  {% assign sorted = site.data.archive | sort: "date" | reverse %}
  {% for entry in sorted %}
    {% if entry.date == today %}{% continue %}{% endif %}
    <a href="/archive/{{ entry.date }}/" class="archive-row">
      <div class="archive-date">{{ entry.date }}</div>
      <div>
        <span class="archive-theme">{{ entry.theme | escape }}</span>
        {% if entry.description %}<span class="archive-desc">{{ entry.description | escape }}</span>{% endif %}
      </div>
    </a>
  {% endfor %}
</div>
