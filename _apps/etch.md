---
layout: app
title: Etch
tagline: Spaced repetition, built like Apple would.
platform: iOS, iPadOS, macOS
app_store_link: https://apps.apple.com/us/app/etch-memory/id6741780207
icon_path: /assets/etch_logo.png
tech_stack:
  - SwiftUI
  - SwiftData
  - CloudKit
  - FSRS
  - Gemini AI
---

## Why Etch

The spaced repetition app you've always wanted: beautiful design, native on all Apple platforms, and actually expands your knowledge based on what you already know.

<div class="feature-grid">
  <div class="feature-card">
    <h3>Beautiful by design</h3>
    <p>Built with SwiftUI and obsessive attention to detail. Every interaction feels fluid and intentional.</p>
  </div>
  <div class="feature-card">
    <h3>Native everywhere</h3>
    <p>Widgets, Shortcuts, Share Sheet, and platform-aware layouts across iPhone, iPad, and Mac.</p>
  </div>
  <div class="feature-card">
    <h3>AI Tutor</h3>
    <p>Don't just remember—expand your knowledge. Etch's AI tutor helps you learn more based on what you already know.</p>
  </div>
</div>

## What makes it special

**Industry-leading algorithm**
Etch uses FSRS (Free Spaced Repetition Scheduler), the most advanced spaced repetition algorithm available. Better retention with fewer reviews.

**Import your existing decks**
Bring in Anki decks or Obsidian notes. Your existing work moves right over.

**Truly private**
Your cards, stacks, and study history stay on your device and in your private iCloud. No ads. No tracking. No data collection.

## Screenshots

<div class="screenshot-strip">
  {% for screenshot in (1..7) %}
  <figure class="screenshot-card">
    <img src="/assets/etch-screenshots/{{ screenshot }}.png" alt="Etch screenshot {{ screenshot }}" loading="lazy">
  </figure>
  {% endfor %}
</div>

## Some of My Stacks

These are a few flashcard stacks I study in Etch. Tap to download and import directly into Etch on your iPhone, iPad, or Mac.

<div class="stack-grid">
  {% assign etch_files = site.static_files | where_exp: "file", "file.path contains '/assets/etch-stacks/'" | where_exp: "file", "file.extname == '.etch'" %}
  {% for file in etch_files %}
  <a href="{{ file.path }}" class="stack-card stack-card-loading" download>
    <div class="stack-card-stack">
      <div class="stack-card-front">
        <div class="stack-card-header">
          <p class="stack-card-count">...</p>
          <span class="stack-card-download-icon">↓</span>
        </div>
        <div class="stack-card-content">
          <h3 class="stack-card-title">Loading</h3>
        </div>
      </div>
    </div>
  </a>
  {% endfor %}
</div>

## Privacy & Support

<div class="callout">
  <p><strong>Etch Flashcards does not collect any of your data.</strong> Your stacks, cards, and study history stay on-device and in your private iCloud account via CloudKit. No ads. No trackers.</p>
  <p>Need help or have a question? Reach me at <a href="mailto:tyler@mgtechworks.com">tyler@mgtechworks.com</a>.</p>
</div>

---

Want to learn how it's built? Check out my [writing](/writing/) for product lessons and deep dives.
