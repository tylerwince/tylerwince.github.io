---
layout: page
title: Now
permalink: /now/
description: What I'm focused on right now.
---

## Right now

- **Building AI-enabled prior authorization and benefits experiences at DrFirst**
- **Building AI-native iOS apps like Etch**
- **Contemplating where AI belongs in my life — and what stays sacred**

### Focus

- **DrFirst:** building calmer, faster prior auth + benefits experiences (with AI doing the heavy lifting in the background).
- **Etch:** spaced repetition, built like Apple would — and pushing on what "AI-native learning" should actually feel like.
- **AI:** figuring out what to automate, what to augment, and what should remain human.

### Learning

Lately I'm deep in **memorization techniques for long passages of text and scripture** — less trivia, more *meaningful retention*.

### Currently reading

{% assign currently_reading = site.books | where_exp: "book", "book.currently_reading == true" | sort: "date" | reverse %}
{% if currently_reading.size > 0 %}
<div class="currently-reading">
  {% for book in currently_reading limit:3 %}
  <div class="reading-card">
    <span class="reading-card-title">{{ book.title }}</span>
    {% if book.author %}<span class="reading-card-author">by {{ book.author }}</span>{% endif %}
  </div>
  {% endfor %}
</div>

[See reading list &rarr;](/reading/)
{% else %}
Nothing on deck right now.
{% endif %}

---

<div class="page-footer-note">
  Last updated: February 3, 2026<br>
  This is my <strong>/now</strong> page (inspired by <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">nownownow.com</a>) — a lightweight snapshot of what I'm doing these days.
</div>
