---
layout: page
title: Archive
permalink: /archive/
description: The historical index of design.
---
<div class="ide-code-view archive-json">
  <div class="line"><span class="code-comment">/* The historical index of design */</span></div>
  <div class="line"><span class="code-keyword">export const</span> <span class="code-variable">archive</span> <span class="code-operator">=</span> [</div>
  {% assign today = site.time | date: "%Y-%m-%d" %}
  {% assign sorted = site.data.archive | sort: "date" | reverse %}
  {% for entry in sorted %}
    {% if entry.date == today %}{% continue %}{% endif %}
    <a href="/archive/{{ entry.date }}/" class="code-block-link">
      <div class="line indent-1">{</div>
      <div class="line indent-2"><span class="code-key">date:</span> <span class="code-string">"{{ entry.date | date: '%Y-%m-%d' }}"</span>,</div>
      <div class="line indent-2"><span class="code-key">theme:</span> <span class="code-string">"{{ entry.theme | escape }}"</span>,</div>
      <div class="line indent-2"><span class="code-key">desc:</span> <span class="code-string">"{{ entry.description | escape }}"</span></div>
      <div class="line indent-1">},</div>
    </a>
  {% endfor %}
  <div class="line">];</div>
</div>