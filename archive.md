---
layout: page
title: Archive
permalink: /archive/
description: The historical index of designs. Every day, a different look.
---

{% assign theme = site.data.theme %}
{% assign archive_count = site.data.archive | size %}
{% assign sorted = site.data.archive | sort: "date" | reverse %}
{% assign last_entry = sorted | first %}
{% if last_entry.date == theme.date %}{% assign design_no = archive_count %}{% else %}{% assign design_no = archive_count | plus: 1 %}{% endif %}

<div class="archive-arcade">
{% if theme %}
<section class="archive-today"{% if theme.lane %} data-lane="{{ theme.lane }}"{% endif %}>
  <div class="archive-marquee">
    <span class="archive-today-label">currently playing · machine №{{ design_no }}</span>
    <span class="archive-today-theme">{{ theme.name }}</span>
  </div>
  <div class="archive-current-copy">
    {% if theme.manifesto %}<p class="archive-today-manifesto">{{ theme.manifesto }}</p>{% endif %}
    <div class="archive-today-meta">
      {% if theme.lane %}<span class="archive-meta-item">{{ theme.lane }}</span>{% endif %}
      {% if theme.fonts.display %}<span class="archive-meta-item">{{ theme.fonts.display }}{% if theme.fonts.body %} + {{ theme.fonts.body }}{% endif %}</span>{% endif %}
      {% if theme.palette %}
      <span class="archive-palette" aria-hidden="true">
        {%- for c in theme.palette -%}<i style="background:{{ c }}"></i>{%- endfor -%}
      </span>
      {% endif %}
    </div>
  </div>
</section>
{% endif %}

{% comment %} Collect dates that actually have a snapshot, for the surprise button. {% endcomment %}
{% assign snap_dates = "" %}
{% for entry in sorted %}
  {% assign snap_path = "/archive/" | append: entry.date | append: "/index.html" %}
  {% assign snap = site.static_files | where: "path", snap_path | first %}
  {% if snap %}{% assign snap_dates = snap_dates | append: entry.date | append: "," %}{% endif %}
{% endfor %}

<div class="archive-controls">
  <span class="archive-count"><b>{{ archive_count }}</b> past designs, one per day</span>
  <button type="button" class="archive-surprise" id="archive-surprise" data-dates="{{ snap_dates }}"><span aria-hidden="true">●</span> surprise me → random day</button>
</div>

<div class="archive-gallery" aria-label="Past design machines">
  {% for entry in sorted %}
    {% if entry.date == theme.date %}{% continue %}{% endif %}
    {% assign snap_path = "/archive/" | append: entry.date | append: "/index.html" %}
    {% assign snap = site.static_files | where: "path", snap_path | first %}
    {% assign thumb_path = "/archive/" | append: entry.date | append: "/thumb.png" %}
    {% assign thumb = site.static_files | where: "path", thumb_path | first %}
    {% if snap %}<a href="/archive/{{ entry.date }}/" class="archive-card"{% else %}<div class="archive-card archive-card--lost"{% endif %}{% if entry.lane %} data-lane="{{ entry.lane }}"{% endif %}>
      <span class="archive-thumb">
        {% if thumb %}
        <img src="{{ thumb.path | relative_url }}" alt="Screenshot of the {{ entry.theme | escape }} design" loading="lazy" width="1200" height="800">
        {% else %}
        <span class="archive-thumb-fallback">{{ entry.theme | escape }}</span>
        {% endif %}
      </span>
      <span class="archive-card-info">
        <span class="archive-date">{{ entry.date }}{% unless snap %} · snapshot lost{% endunless %}</span>
        <span class="archive-theme">{{ entry.theme | escape }}</span>
        {% if entry.manifesto %}<span class="archive-desc">{{ entry.manifesto | escape }}</span>{% elsif entry.description %}<span class="archive-desc">{{ entry.description | escape }}</span>{% endif %}
        {% if entry.palette %}
        <span class="archive-palette" aria-hidden="true">
          {%- for c in entry.palette -%}<i style="background:{{ c }}"></i>{%- endfor -%}
        </span>
        {% endif %}
      </span>
    {% if snap %}</a>{% else %}</div>{% endif %}
  {% endfor %}
</div>
</div>

<script src="{{ '/assets/js/archive.js' | relative_url }}?v={{ site.time | date: '%s' }}"></script>
