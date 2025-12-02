---
layout: page
title: Apps
description: Purpose-built iOS products crafted with native design and thoughtful systems.
---

<div class="apps-showcase">
  <div class="app-feature">
    <div class="app-feature-header">
      <div class="app-feature-icon">
        <img src="/assets/etch_logo.png" alt="Etch">
      </div>
      <div class="app-feature-meta">
        <h2>Etch</h2>
        <p class="app-tagline">Spaced repetition, built like Apple would.</p>
      </div>
    </div>
    <p class="app-description">The spaced repetition app you've always wanted: beautiful design, native on all Apple platforms, and actually expands your knowledge based on what you already know.</p>
    <ul class="app-features">
      <li>Industry-leading FSRS algorithm</li>
      <li>AI Tutor and custom articles</li>
      <li>Anki & Obsidian import</li>
      <li>Widgets & Siri Shortcuts</li>
    </ul>
    <div class="app-actions">
      <a href="https://apps.apple.com/us/app/etch-memory/id6741780207" class="app-store-button" target="_blank" rel="noopener">
        <picture>
          <source srcset="/assets/white.svg" media="(prefers-color-scheme: dark)">
          <img src="/assets/black.svg" alt="Download on the App Store">
        </picture>
      </a>
      <a href="/apps/etch/" class="link-arrow">Learn more</a>
    </div>
  </div>

  <div class="app-feature">
    <div class="app-feature-header">
      <div class="app-feature-icon">
        <img src="/assets/waymark_icon.png" alt="Waymark">
      </div>
      <div class="app-feature-meta">
        <h2>Waymark</h2>
        <p class="app-tagline">Remember God's faithfulness</p>
      </div>
    </div>
    <p class="app-description">Keep prayer commitments meaningful with gentle reminders, journaling, and space to celebrate answered prayers. Build rhythms alone or invite your community.</p>
    <ul class="app-features">
      <li>Guided prayer cadences</li>
      <li>Answered prayer timeline</li>
      <li>Shared prayer groups</li>
      <li>iCloud sync & privacy</li>
    </ul>
    <div class="app-actions">
      <a href="https://apple.co/3Jgd1Fy" class="app-store-button" target="_blank" rel="noopener">
        <picture>
          <source srcset="/assets/white.svg" media="(prefers-color-scheme: dark)">
          <img src="/assets/black.svg" alt="Download on the App Store">
        </picture>
      </a>
      <a href="/apps/waymark/" class="link-arrow">Learn more</a>
    </div>
  </div>

  <div class="app-feature">
    <div class="app-feature-header">
      <div class="app-feature-icon">
        <img src="/assets/littleQuotes_icon.png" alt="Little Quotes">
      </div>
      <div class="app-feature-meta">
        <h2>Little Quotes</h2>
        <p class="app-tagline">Capture and share kids' priceless words.</p>
      </div>
    </div>
    <p class="app-description">Save the hilarious, sweet, and profound things your kids say—complete with audio, photos, videos, and location—before the moments disappear.</p>
    <ul class="app-features">
      <li>Quick capture from anywhere</li>
      <li>Transcribe audio or video recordings</li>
      <li>Private iCloud sharing with family</li>
      <li>Powerful search and filtering</li>
    </ul>
    <div class="app-actions">
      <a href="https://apps.apple.com/us/app/little-quotes/id6755783257" class="app-store-button" target="_blank" rel="noopener">
        <picture>
          <source srcset="/assets/white.svg" media="(prefers-color-scheme: dark)">
          <img src="/assets/black.svg" alt="Download on the App Store">
        </picture>
      </a>
      <a href="/apps/little-quotes/" class="link-arrow">Learn more</a>
    </div>
  </div>
</div>

<div class="divider"></div>

<section class="philosophy-section">
  <h2 class="eyebrow mb-6">Why I build apps</h2>
  <div class="philosophy-grid">
    <div class="philosophy-item">
      <h3>Native iOS craft</h3>
      <p>Interfaces that feel unmistakably at home on Apple platforms—fluid gestures, crisp typography, and purposeful motion.</p>
    </div>
    <div class="philosophy-item">
      <h3>Purposeful technology</h3>
      <p>Every feature earns its place by helping people learn deeply, grow spiritually, or connect with their community.</p>
    </div>
    <div class="philosophy-item">
      <h3>Scientific foundations</h3>
      <p>Research-backed systems like spaced repetition and habit theory shape the product roadmap, not trend chasing.</p>
    </div>
    <div class="philosophy-item">
      <h3>Privacy by default</h3>
      <p>Respect for user data is table stakes—sensible defaults, transparent controls, and sync you can trust.</p>
    </div>
  </div>
</section>

<style>
.apps-showcase {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
  margin-bottom: var(--space-16);
}

.app-feature {
  background: var(--color-surface-elevated);
  border: 0.5px solid var(--color-border-light);
  border-radius: var(--border-radius-lg);
  padding: var(--space-8);
}

.app-feature-header {
  display: flex;
  gap: var(--space-4);
  align-items: center;
  margin-bottom: var(--space-4);
}

.app-feature-icon {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 14px;
  overflow: hidden;
  background: clear;
}

.app-feature-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.app-feature-meta h2 {
  margin: 0 0 4px 0;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.015em;
}

.app-tagline {
  color: var(--color-text-secondary);
  margin: 0;
  font-size: 17px;
  letter-spacing: -0.022em;
}

.app-description {
  font-size: 17px;
  line-height: 1.47059;
  letter-spacing: -0.022em;
  margin-bottom: var(--space-4);
}

.app-features {
  list-style: none;
  margin: 0 0 var(--space-6) 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-3);
}

.app-features li {
  position: relative;
  padding-left: 20px;
  margin: 0;
  font-size: 14px;
  color: var(--color-text-secondary);
  letter-spacing: -0.01em;
}

.app-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: 600;
}

.app-actions {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding-top: var(--space-4);
  border-top: 0.5px solid var(--color-border-light);
}

.app-store-button {
  display: inline-block;
  transition: opacity var(--transition-fast);
}

.app-store-button:hover {
  opacity: 0.8;
}

.app-store-button img {
  height: 40px;
  width: auto;
  display: block;
  border: none;
  border-radius: 0;
  margin: 0;
}

.philosophy-section {
  margin-bottom: var(--space-16);
}

.philosophy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-8);
}

.philosophy-item h3 {
  font-size: 19px;
  font-weight: 600;
  margin-bottom: var(--space-2);
  letter-spacing: -0.015em;
}

.philosophy-item p {
  color: var(--color-text-secondary);
  line-height: 1.47059;
  letter-spacing: -0.022em;
  margin: 0;
  font-size: 15px;
}

@media (max-width: 768px) {
  .app-feature-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .app-features {
    grid-template-columns: 1fr;
  }

  .app-actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .philosophy-grid {
    grid-template-columns: 1fr;
  }
}
</style>
