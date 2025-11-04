---
layout: page
title: Apps
permalink: /apps/
---

I build iOS apps that help people learn better and grow spiritually. Each app is designed with care, focusing on beautiful design and thoughtful features.

<div class="apps-grid">
  <div class="app-card">
    <div class="app-logo">
      <img src="/assets/etch_logo.png" alt="Etch logo">
    </div>
    <h2><a href="/apps/etch/">Etch</a></h2>
    <p class="app-card-tagline">Scientifically-advanced flashcard learning</p>
    <p>Native iOS spaced repetition app powered by AI. Study less, remember more—what Anki would have been if developed by Apple.</p>
    <ul class="app-features">
      <li>FSRS spaced repetition algorithm</li>
      <li>AI-powered insights & card generation</li>
      <li>Multimodal AI chat for studying</li>
      <li>Import from Anki & Obsidian</li>
      <li>Beautiful native iOS design</li>
    </ul>
    <div class="app-card-links">
      <a href="/apps/etch/" class="learn-more">Learn More →</a>
      <a href="https://apps.apple.com/app/etch" class="app-store" target="_blank" rel="noopener">App Store</a>
    </div>
  </div>

  <div class="app-card">
    <div class="app-logo">
      <img src="/assets/waymark_logo.png" alt="Waymark logo">
    </div>
    <h2><a href="/apps/waymark/">Waymark</a></h2>
    <p class="app-card-tagline">Beautiful prayer tracking for iOS</p>
    <p>Build consistent prayer habits, track spiritual progress, celebrate answered prayers, and share your faith journey with community.</p>
    <ul class="app-features">
      <li>Smart prayer reminders & scheduling</li>
      <li>Answered prayer tracking</li>
      <li>Anniversary notifications</li>
      <li>iCloud sync & sharing</li>
      <li>Privacy-first design</li>
    </ul>
    <div class="app-card-links">
      <a href="/apps/waymark/" class="learn-more">Learn More →</a>
      <a href="https://apps.apple.com/app/waymark" class="app-store" target="_blank" rel="noopener">App Store</a>
    </div>
  </div>
</div>

## Why I Build Apps

As Chief Product Officer at Myndshft Technologies by day, I spend my nights building apps that solve real problems for real people. Each app reflects my passion for:

- **Native iOS Design**: Beautiful, thoughtful interfaces that feel at home on Apple devices
- **Purposeful Technology**: Apps that genuinely improve people's lives
- **Scientific Principles**: Leveraging research-backed approaches (like spaced repetition)
- **Privacy & Ethics**: Building with respect for users and their data

---

Want to learn more about how these apps were built? Check out my [writing](/writing/) for development insights and product lessons.

<style>
  .apps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
    margin: 48px 0;
  }

  .app-card {
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 40px 32px;
    background: var(--minima-background-color);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .app-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .app-logo {
    width: 120px;
    height: 120px;
    margin: 0 auto 24px auto;
    background: white;
    border-radius: 16px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e5e7eb;
  }

  .app-logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .app-card h2 {
    text-align: center;
    margin: 16px 0;
    font-size: 1.875rem;
  }

  .app-card h2 a {
    color: inherit;
    text-decoration: none;
  }

  .app-card h2 a:hover {
    text-decoration: underline;
  }

  .app-card-tagline {
    text-align: center;
    font-style: italic;
    color: #666;
    margin: 8px 0 24px 0;
    font-size: 1.125rem;
  }

  .app-card > p {
    line-height: 1.75;
    margin: 16px 0;
    font-size: 1rem;
  }

  .app-features {
    list-style: none;
    padding: 0;
    margin: 24px 0;
  }

  .app-features li {
    padding: 10px 0;
    padding-left: 32px;
    position: relative;
    line-height: 1.6;
  }

  .app-features li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #007AFF;
    font-weight: bold;
    font-size: 1.125rem;
  }

  .app-card-links {
    display: flex;
    gap: 16px;
    margin-top: 32px;
    flex-wrap: wrap;
  }

  .app-card-links a {
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: opacity 0.2s, transform 0.2s;
    flex: 1;
    text-align: center;
  }

  .app-card-links a:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .learn-more {
    background: var(--minima-table-header-bg-color);
    color: inherit;
    border: 1px solid #e5e7eb;
  }

  .app-store {
    background: #007AFF;
    color: white;
  }

  @media (max-width: 768px) {
    .apps-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
