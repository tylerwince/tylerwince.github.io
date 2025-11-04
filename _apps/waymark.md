---
layout: page
title: Waymark
tagline: Remember God's Faithfulness
icon: 🙏
app_store_link: https://apps.apple.com/us/app/waymark-prayer/id6749036819
tech_stack:
  - Swift
  - SwiftUI
  - Core Data
  - CloudKit
  - WidgetKit
---

<div class="app-hero">
  <div class="app-hero-content">
    <p class="app-tagline-display">{{ page.tagline }}</p>
    <div class="app-hero-actions">
      <a href="{{ page.app_store_link }}" class="app-primary app-store-button" target="_blank" rel="noopener">
        <span class="sr-only">Download Waymark on the App Store</span>
        <picture>
          <source srcset="/assets/white.svg" media="(prefers-color-scheme: dark)">
          <img src="/assets/black.svg" alt="" aria-hidden="true">
        </picture>
      </a>
    </div>
    <ul class="app-hero-meta">
      <li><span>Platform</span><strong>iOS (iPhone &amp; iPad)</strong></li>
      <li><span>Made for</span><strong>Christians, families, small groups</strong></li>
      <li><span>Tech</span><strong>{{ page.tech_stack | join: ", " }}</strong></li>
    </ul>
  </div>
  <div class="app-hero-art">
    <div class="app-hero-icon">
      <img src="/assets/waymark_logo.png" alt="Waymark logo">
    </div>
  </div>
</div>

<section class="app-section" id="why-waymark">
  <h2>Why people lean on Waymark</h2>
  <div class="feature-grid">
    <article class="feature-card">
      <h3>Rhythms that stick</h3>
      <p>Gentle reminders and lightweight scheduling keep you praying daily without the guilt trip.</p>
    </article>
    <article class="feature-card">
      <h3>A sacred record</h3>
      <p>Journal during prayers and be reminded of how God answered your prayers in the past.</p>
    </article>
    <article class="feature-card">
      <h3>Share with others</h3>
      <p>Invite family or small groups to shared lists. Sync updates automatically so everyone prays in step.</p>
    </article>
  </div>
</section>

<section class="app-section">
  <h2>See Waymark in action</h2>
  <div class="screenshot-strip" aria-label="Waymark app screenshots">
    {% for screenshot in (1..6) %}
    <figure class="screenshot-card">
      <img src="/assets/waymark-screeshots/{{ screenshot }}.jpg" alt="Waymark app screenshot {{ screenshot }}">
    </figure>
    {% endfor %}
  </div>
</section>

<section class="app-section">
  <h2>Free to download, crafted with care</h2>
  <div class="callout">
    <p>Waymark is free to use—no paywalls or subscriptions. It’s a labor of love for believers who want prayer to feel intentional and be reminded of how God answers.</p>
  </div>
</section>

<section class="app-section">
  <h2>Privacy &amp; trust</h2>
  <div class="callout callout-neutral">
    <p><strong>Waymark never collects your prayer data.</strong> Everything stays on-device and syncs privately via <a href="https://developer.apple.com/icloud/cloudkit/" target="_blank" rel="noopener">CloudKit</a>. Titles, notes, and images are encrypted end-to-end if you enable Advanced Data Protection.</p>
    <ul>
      <li>No analytics, ads, or tracking pixels</li>
      <li>Your prayers remain between you and God</li>
    </ul>
    <p class="support-line">Questions or support? Reach me at <a href="mailto:tyler@mgtechworks.com">tyler@mgtechworks.com</a>.</p>
    <p class="meta-note">Last updated: 2025-11-04</p>
  </div>
</section>

<section class="app-section">
  <h2>Related writing</h2>
  <p>Stay tuned for development notes and product lessons from building Waymark. You can also explore stories from the build in <a href="/writing/">my writing</a>.</p>
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

  .app-feature-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 10px;
  }

  .app-feature-list li {
    position: relative;
    padding-left: 28px;
    line-height: 1.6;
    font-size: 0.9375rem;
  }

  .app-feature-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #007AFF;
    font-weight: 600;
  }

  .screenshot-strip {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(160px, 1fr);
    gap: 10px;
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
    width: 85%;
    height: auto;
    box-shadow: 0 18px 40px -28px rgba(15, 23, 42, 0.45);
  }

  .callout {
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 24px;
    background: var(--minima-background-color);
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

  .app-primary {
    display: inline-flex;
    align-items: center;
    padding: 0;
    overflow: hidden;
    background: transparent;
    transition: transform 0.2s;
  }

  .app-primary:hover {
    transform: translateY(-1px);
  }

  .app-store-button picture,
  .app-store-button img {
    display: block;
    height: 44px;
  }

  .app-store-button img {
    width: auto;
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
    .detail-list {
      grid-template-columns: 1fr;
    }

    .screenshot-strip {
      grid-auto-columns: minmax(140px, 1fr);
    }

    .app-footer {
      flex-direction: column;
    }
  }
</style>
