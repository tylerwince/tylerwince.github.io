---
layout: page
title: Apps
permalink: /apps/
---

<div class="hero-section">
  <span class="hero-eyebrow">Purpose-built iOS products crafted with native design, thoughtful systems, and a clear sense of purpose.</span>
</div>

<div class="apps-stage">
  <div class="apps-tabs" role="tablist">
    <button class="app-tab active" id="tab-etch" data-target="app-etch" role="tab" aria-controls="app-etch" aria-selected="true">
      <span class="app-tab-icon app-tab-icon-etch">
        <img src="/assets/etch_logo.png" alt="Etch icon">
      </span>
      <span class="app-tab-label">Etch</span>
    </button>
    <button class="app-tab" id="tab-waymark" data-target="app-waymark" role="tab" aria-controls="app-waymark" aria-selected="false">
      <span class="app-tab-icon">
        <img src="/assets/waymark_logo.png" alt="Waymark icon">
      </span>
      <span class="app-tab-label">Waymark</span>
    </button>
  </div>

  <section class="app-detail active" id="app-etch" role="tabpanel" aria-labelledby="tab-etch">
    <div class="app-overview">
      <div class="app-icon app-icon-etch">
        <img src="/assets/etch_logo.png" alt="Etch logo">
      </div>
      <div class="app-overview-text">
        <h2>Etch</h2>
        <p class="app-tagline">Anki, but if it was built by Apple.</p>
      </div>
    </div>
    <p class="app-description">Etch is the spaced repetition app you've always wanted: beautiful design, native on all Apple platforms, and actually expands your knowledge based on what you already know.</p>
    <div class="app-detail-lower">
      <ul class="app-feature-list">
        <li>Industry-leading algorithms</li>
        <li>AI Tutor and custom articles</li>
        <li>Anki &amp; Obsidian import</li>
        <li>Native Apple design</li>
        <li>Widgets &amp; Siri Shortcuts</li>
      </ul>
      <div class="app-actions">
        <a href="https://apps.apple.com/us/app/etch-memory/id6741780207" class="app-primary app-store-button" target="_blank" rel="noopener">
          <span class="sr-only">Download Etch on the App Store</span>
          <picture>
            <source srcset="/assets/white.svg" media="(prefers-color-scheme: dark)">
            <img src="/assets/black.svg" alt="" aria-hidden="true">
          </picture>
        </a>
        <a href="/apps/etch/" class="app-link">Learn about Etch</a>
      </div>
    </div>
  </section>

  <section class="app-detail" id="app-waymark" role="tabpanel" aria-labelledby="tab-waymark" hidden>
    <div class="app-overview">
      <div class="app-icon">
        <img src="/assets/waymark_logo.png" alt="Waymark logo">
      </div>
      <div class="app-overview-text">
        <h2>Waymark</h2>
        <p class="app-tagline">Remember God's Faithfulness</p>
      </div>
    </div>
    <p class="app-description">Waymark keeps prayer commitments meaningful with gentle reminders, journaling, and space to celebrate answered prayers. Build rhythms alone or invite your community into the journey.</p>
    <div class="app-detail-lower">
      <ul class="app-feature-list">
        <li>Guided prayer cadences</li>
        <li>Answered prayer timeline</li>
        <li>Shared prayer groups</li>
        <li>iCloud sync &amp; privacy</li>
      </ul>
      <div class="app-actions">
        <a href="https://apple.co/3Jgd1Fy" class="app-primary app-store-button" target="_blank" rel="noopener">
          <span class="sr-only">Download Waymark on the App Store</span>
          <picture>
            <source srcset="/assets/white.svg" media="(prefers-color-scheme: dark)">
            <img src="/assets/black.svg" alt="" aria-hidden="true">
          </picture>
        </a>
        <a href="/apps/waymark/" class="app-link">Learn about Waymark</a>
      </div>
    </div>
  </section>
</div>

<section class="principles-section">
  <h2>Why I build apps</h2>
  <div class="principles-grid">
    <div class="principle-card">
      <h3>Native iOS craft</h3>
      <p>Interfaces that feel unmistakably at home on Apple platforms—fluid gestures, crisp typography, and purposeful motion.</p>
    </div>
    <div class="principle-card">
      <h3>Purposeful technology</h3>
      <p>Every feature earns its place by helping people learn deeply, grow spiritually, or connect with their community.</p>
    </div>
    <div class="principle-card">
      <h3>Scientific foundations</h3>
      <p>Research-backed systems like spaced repetition and habit theory shape the product roadmap, not trend chasing.</p>
    </div>
    <div class="principle-card">
      <h3>Privacy by default</h3>
      <p>Respect for user data is table stakes—sensible defaults, transparent controls, and sync you can trust.</p>
    </div>
  </div>
</section>

<p class="closing-note">Want to see how these products come together? Dive into my <a href="/writing/">writing</a> for product lessons and build logs.</p>

<style>
  .hero-section {
    text-align: center;
    padding: 40px 20px 0;
    max-width: 720px;
    margin: 0 auto 64px;
  }

  .hero-eyebrow {
    display: inline-block;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #999;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .page-title {
    margin: 0;
    font-size: 2.5rem;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .page-subtitle {
    margin: 16px auto 0;
    font-size: 1.125rem;
    line-height: 1.6;
    color: #666;
    max-width: 60ch;
  }

  .apps-stage {
    max-width: 840px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .apps-tabs {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 32px;
  }

  .app-tab {
    border: 1px solid #e5e7eb;
    border-radius: 18px;
    padding: 12px 18px;
    background: var(--minima-background-color);
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font: inherit;
    font-weight: 600;
    color: inherit;
    cursor: pointer;
    transition: border-color 0.2s;
    min-width: 180px;
  }

  .app-tab:hover {
    border-color: #d1d5db;
  }

  .app-tab.active,
  .app-tab[aria-selected="true"] {
    border-color: rgba(0, 122, 255, 0.6);
  }

  .app-tab:focus-visible {
    outline: 2px solid #007AFF;
    outline-offset: 2px;
  }

  .app-tab-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: white;
    border: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
  }

  .app-tab-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .app-tab-icon-etch {
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
  }

  .app-tab-label {
    font-size: 0.9375rem;
  }

  .app-detail {
    border: 1px solid #e5e7eb;
    border-radius: 20px;
    padding: 32px;
    background: var(--minima-background-color);
    display: none;
    flex-direction: column;
    gap: 24px;
  }

  .app-detail.active {
    display: flex;
  }

  .app-detail[hidden] {
    display: none !important;
  }

  .app-overview {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .app-overview-text {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .app-icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: white;
    border: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px;
    flex-shrink: 0;
  }

  .app-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .app-icon-etch {
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    width: 108px !important;
    height: 108px !important;
  }

  .app-badge {
    display: inline-block;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #007AFF;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .app-detail h2 {
    margin: 0;
    font-size: 1.875rem;
    font-weight: 700;
  }

  .app-tagline {
    margin: 8px 0 0;
    color: #666;
    font-size: 1rem;
  }

  .app-description {
    margin: 0;
    font-size: 1rem;
    line-height: 1.7;
  }

  .app-detail-lower {
    display: flex;
    gap: 40px;
    align-items: flex-start;
  }

  .app-feature-list {
    flex: 1;
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

  .app-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 16px;
    min-width: 220px;
  }

  .waitlist-form-inline {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .waitlist-form-inline .waitlist-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #6b7280;
    font-weight: 600;
  }

  .waitlist-form-inline .waitlist-note {
    font-size: 0.75rem;
    color: #94a3b8;
    margin: 0;
  }

  .waitlist-form-inline .waitlist-input {
    padding: 10px 14px;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    font-size: 0.9375rem;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .waitlist-form-inline .waitlist-input:focus {
    outline: none;
    border-color: #007AFF;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.15);
  }

  .waitlist-form-inline .waitlist-submit {
    align-self: stretch;
    border: 1px solid #007AFF;
    background: #007AFF;
    color: white;
    font-weight: 600;
    padding: 11px 16px;
    border-radius: 10px;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.2s;
  }

  .waitlist-form-inline .waitlist-submit:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .waitlist-form-inline .waitlist-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .app-actions .app-link {
    margin-top: auto;
  }

  .app-link {
    color: inherit;
    text-decoration: none;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .app-link::after {
    content: "→";
    transition: transform 0.2s;
  }

  .app-link:hover {
    color: #007AFF;
  }

  .app-link:hover::after {
    transform: translateX(2px);
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
    height: 64px;
  }

  .app-store-button img {
    width: auto;
  }

  .principles-section {
    max-width: 840px;
    margin: 80px auto 0;
    padding: 0 20px 80px;
  }

  .principles-section h2 {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #999;
    font-weight: 600;
    margin-bottom: 24px;
  }

  .principles-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .principle-card {
    border-left: 2px solid #e5e7eb;
    padding-left: 16px;
  }

  .principle-card h3 {
    margin: 0 0 8px;
    font-size: 1.125rem;
  }

  .principle-card p {
    margin: 0;
    color: #666;
    line-height: 1.6;
  }

  .closing-note {
    max-width: 640px;
    margin: 32px auto 80px;
    text-align: center;
    color: #666;
    line-height: 1.6;
  }

  .closing-note a {
    color: inherit;
    text-decoration: none;
    font-weight: 600;
    border-bottom: 1px solid rgba(0, 122, 255, 0.3);
  }

  .closing-note a:hover {
    color: #007AFF;
    border-bottom-color: #007AFF;
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

  @media (max-width: 768px) {
    .hero-section {
      padding-top: 20px;
      margin-bottom: 48px;
    }

    .page-title {
      font-size: 2rem;
    }

    .apps-tabs {
      gap: 12px;
    }

    .app-tab {
      width: 100%;
      justify-content: flex-start;
    }

    .app-overview {
      flex-direction: column;
      align-items: flex-start;
    }

    .app-icon {
      width: 72px;
      height: 72px;
      border-radius: 18px;
    }

    .app-detail-lower {
      flex-direction: column;
      gap: 24px;
    }

    .app-actions {
      align-items: flex-start;
      min-width: 0;
    }

    .app-actions .app-link {
      margin-top: 0;
    }

    .principles-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

<script>
  (function() {
    var tabs = document.querySelectorAll('.app-tab');
    var panels = document.querySelectorAll('.app-detail');

    if (!tabs.length || !panels.length) {
      return;
    }

    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        var targetId = tab.getAttribute('data-target');
        var targetPanel = document.getElementById(targetId);

        if (!targetPanel || tab.classList.contains('active')) {
          return;
        }

        tabs.forEach(function(t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });

        panels.forEach(function(panel) {
          panel.classList.remove('active');
          panel.setAttribute('hidden', 'true');
        });

        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        targetPanel.classList.add('active');
        targetPanel.removeAttribute('hidden');
      });
    });
  })();
</script>
