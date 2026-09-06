---
layout: page
title: Writing
permalink: /writing/
description: On building things, paying attention, and figuring things out.
show_description: false
---

{% assign sorted_posts = site.posts | sort: 'date' | reverse %}
<div data-writing>
  <div class="writing-controls" hidden>
    <div class="writing-search">
      <label class="search-label">
        <svg class="search-icon" width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" stroke-width="1.25"/><path d="m13 13 4.25 4.25" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>
        <span class="sr-only">Search articles</span>
        <input type="search" data-article-query placeholder="Search articles" autocomplete="off">
      </label>
      <button class="search-clear" type="button" data-search-clear aria-label="Clear search" hidden>×</button>
    </div>
  </div>
  <p class="writing-count" role="status" aria-live="polite" data-article-count>{{ sorted_posts.size }} articles</p>
  {% include writing_list.html posts=sorted_posts searchable=true %}
  <p class="empty-state" data-article-empty hidden>No articles found. Try a different word or phrase.</p>
</div>
