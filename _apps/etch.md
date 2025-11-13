---
layout: page
title: Etch
tagline: Anki, but if it was built by Apple.
icon: 🃏
app_store_link: https://apps.apple.com/app/etch
tech_stack:
  - SwiftUI
  - SwiftData
  - CloudKit
  - FSRS
  - Gemini
---

<div class="app-hero">
  <div class="app-hero-content">
    <p class="app-tagline-display">{{ page.tagline }}</p>
    <div class="app-hero-actions">
      <a href="https://apps.apple.com/us/app/etch-memory/id6741780207" class="app-store-button" target="_blank" rel="noopener">
        <span class="sr-only">Download Etch on the App Store</span>
        <picture>
          <source srcset="/assets/white.svg" media="(prefers-color-scheme: dark)">
          <img src="/assets/black.svg" alt="" aria-hidden="true">
        </picture>
      </a>
    </div>
    <ul class="app-hero-meta">
      <li><span>Platform</span><strong>iOS, iPadOS, macOS</strong></li>
      <li><span>Made for</span><strong>Polyglots, lifelong learners, students</strong></li>
      <li><span>Tech</span><strong>{{ page.tech_stack | join: ", " }}</strong></li>
    </ul>
  </div>
  <div class="app-hero-art">
    <div class="app-hero-icon app-hero-icon-etch">
      <img src="/assets/etch_logo.png" alt="Etch logo">
    </div>
  </div>
</div>

<section class="app-section" id="why-etch">
  <h2>Why people choose Etch</h2>
  <div class="feature-grid">
    <article class="feature-card">
      <h3>Beautiful Design</h3>
      <p>Etch is as beautiful to look at as it is powerful in helping you expand and remember what you learn.</p>
    </article>
    <article class="feature-card">
      <h3>Native Workflows</h3>
      <p>Widgets, Shortcuts, Share Sheet capture, and platform-aware layouts across iPhone, iPad, and Mac.</p>
    </article>
    <article class="feature-card">
      <h3>AI Tutor</h3>
      <p>Don't just remember, Etch's tutor actually expands your knowledge and helps you learn more based on what you already know.</p>
    </article>
  </div>
</section>

<section class="app-section">
  <h2>See Etch in action</h2>
  <div class="screenshot-strip" aria-label="Etch app screenshots">
    {% for screenshot in (1..7) %}
    <figure class="screenshot-card">
      <img src="/assets/etch-screenshots/{{ screenshot }}.png" alt="Etch app screenshot {{ screenshot }}">
    </figure>
    {% endfor %}
  </div>
</section>

<section class="app-section">
  <h2>Privacy &amp; support</h2>
  <div class="callout callout-neutral">
    <p><strong>Etch Flashcards does not collect any of your data.</strong> Your stacks, cards, and study history stay on-device and in your private iCloud account via <a href="https://developer.apple.com/icloud/cloudkit/" target="_blank" rel="noopener">CloudKit</a>. No ads. No trackers.</p>
    <p class="support-line">Need help or have a question? Reach me at <a href="mailto:tyler@mgtechworks.com">tyler@mgtechworks.com</a>.</p>
    <p class="meta-note">Last updated: 2024-09-04</p>
  </div>
</section>

<section class="app-section">
  <h2>Related writing</h2>
  <p>Curious about the build process? Watch for upcoming deep dives on spaced repetition, AI-powered studying, and product craft in <a href="/writing/">my writing</a>.</p>
</section>

<style>
  .app-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 48px;
    align-items: center;
    margin-bottom: 72px;
  }

  .app-tagline-display {
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.75rem;
    font-weight: 600;
    color: #999;
    margin: 0 0 20px 0;
  }

  .app-hero-actions {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 24px 0 32px;
  }

  .app-hero-meta {
    display: grid;
    gap: 12px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .app-hero-meta li {
    display: grid;
    grid-template-columns: 100px minmax(0, 1fr);
    gap: 16px;
    font-size: 0.9375rem;
    color: #555;
  }

  .app-hero-meta span {
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.75rem;
    color: #999;
  }

  .app-hero-art {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .app-hero-icon {
    width: 160px;
    height: 160px;
    border-radius: 24px;
    background: white;
    border: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .app-hero-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .app-hero-icon-etch {
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
  }

  .app-section {
    margin-bottom: 64px;
  }

  .app-section h2 {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #999;
    margin-bottom: 20px;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 24px;
  }

  .feature-card {
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 24px;
    background: var(--minima-background-color);
  }

  .feature-card h3 {
    margin: 0 0 12px;
    font-size: 1.25rem;
  }

  .feature-card p {
    margin: 0;
    color: #555;
    line-height: 1.6;
  }

  .detail-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 24px;
  }

  .detail-item {
    border-left: 2px solid #e5e7eb;
    padding-left: 16px;
  }

  .detail-item h3 {
    margin: 0 0 8px;
    font-size: 1.125rem;
  }

  .detail-item p {
    margin: 0;
    color: #555;
    line-height: 1.6;
  }

  .plan-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 24px;
  }

  .plan-card {
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 24px;
    background: var(--minima-background-color);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .plan-card header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 16px;
  }

  .plan-card h3 {
    margin: 0;
    font-size: 1.25rem;
  }

  .plan-price {
    font-weight: 600;
    color: #007AFF;
  }

  .plan-card ul {
    margin: 0;
    padding-left: 18px;
    color: #555;
    line-height: 1.6;
    font-size: 0.9375rem;
  }

  .waitlist-form {
    margin: 0 0 36px 0;
  }

  .waitlist-label {
    display: inline-block;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #999;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .waitlist-controls {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .waitlist-input {
    flex: 1;
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    border-radius: 12px;
    font-size: 0.9375rem;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .waitlist-input:focus {
    outline: none;
    border-color: #007AFF;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.15);
  }

  .waitlist-submit {
    border: none;
    background: #007AFF;
    color: white;
    font-weight: 600;
    padding: 12px 20px;
    border-radius: 12px;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.2s;
  }

  .waitlist-submit:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .waitlist-note {
    margin: 10px 0 0;
    font-size: 0.8125rem;
    color: #6b7280;
  }

  .callout {
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 24px;
    background: var(--minima-background-color);
  }

  .screenshot-strip {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(160px, 1fr);
    gap: 5px;
    overflow-x: auto;
    padding: 4px 0;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    background: transparent;
    border: none;
  }

  .screenshot-strip::-webkit-scrollbar {
    display: none;
  }

  .screenshot-card {
    display: flex;
    justify-content: center;
    overflow: hidden;
    scroll-snap-align: start;
  }

  .screenshot-card img {
    width: 90%;
    height: auto;
    border-radius: 16px;
  }

  .callout ul {
    margin: 16px 0 0;
    padding-left: 18px;
    color: #555;
    line-height: 1.6;
  }

  .callout-neutral {
    background: #f9fafb;
  }

  .callout a {
    color: inherit;
    text-decoration: underline;
  }

  .support-line {
    margin: 16px 0 0;
  }

  .meta-note {
    font-size: 0.8125rem;
    color: #999;
    margin-top: 12px;
  }

  .app-footer {
    border-top: 1px solid #e5e7eb;
    padding-top: 24px;
    margin-top: 64px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    color: #555;
    font-size: 0.9375rem;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (max-width: 900px) {
    .app-hero {
      grid-template-columns: 1fr;
      gap: 32px;
    }

    .app-hero-art {
      align-items: flex-start;
    }
  }

  @media (max-width: 600px) {
    .app-tagline-display {
      font-size: 2.25rem;
    }

    .app-hero-actions {
      flex-direction: column;
      align-items: flex-start;
    }

    .app-hero-meta li {
      grid-template-columns: 1fr;
      gap: 4px;
    }

    .feature-grid,
    .detail-list,
    .plan-grid {
      grid-template-columns: 1fr;
    }

    .app-footer {
      flex-direction: column;
    }

    .waitlist-controls {
      flex-direction: column;
      align-items: stretch;
    }

    .waitlist-input,
    .waitlist-submit {
      width: 100%;
    }
  }
</style>
