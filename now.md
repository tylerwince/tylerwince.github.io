---
layout: page
title: Now
permalink: /now/
description: What I’m focused on right now.
---

## Right now

- **Building AI-enabled prior authorization and benefits experiences at DrFirst**
- **Building AI-native iOS apps like Etch**
- **Contemplating where AI belongs in my life — and what stays sacred**

### Focus

- **DrFirst:** building calmer, faster prior auth + benefits experiences (with AI doing the heavy lifting in the background).
- **Etch:** spaced repetition, built like Apple would — and pushing on what “AI-native learning” should actually feel like.
- **AI:** figuring out what to automate, what to augment, and what should remain human.

### Learning

Lately I’m deep in **memorization techniques for long passages of text and scripture** — less trivia, more *meaningful retention*.

### Currently reading

{% assign currently_reading = site.books | where_exp: "book", "book.currently_reading == true" | sort: "date" | reverse %}
{% if currently_reading.size > 0 %}
<ul class="now-reading">
  {% for book in currently_reading limit:3 %}
    <li>
      <span class="title">{{ book.title }}</span>
      {% if book.author %}<span class="author"> — {{ book.author }}</span>{% endif %}
    </li>
  {% endfor %}
</ul>
<p class="subtle"><a href="/reading/">See reading list →</a></p>
{% else %}
<p class="subtle">Nothing on deck right now.</p>
{% endif %}

<style>
.now-reading {
  list-style: none;
  padding: 0;
  margin: var(--space-3) 0 0 0;
}

.now-reading li {
  padding: 10px 0;
  border-bottom: 0.5px solid var(--color-border-light);
}

.now-reading li:last-child {
  border-bottom: none;
}

.now-reading .title {
  font-weight: 600;
  color: var(--color-text-primary);
}

.now-reading .author {
  color: var(--color-text-secondary);
}

.subtle {
  margin-top: var(--space-3);
  color: var(--color-text-secondary);
  font-size: 14px;
}
</style>

## Last updated

February 3, 2026

<p class="subtle">This is my <strong>/now</strong> page (inspired by <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">nownownow.com</a>) — a lightweight snapshot of what I’m doing these days.</p>
