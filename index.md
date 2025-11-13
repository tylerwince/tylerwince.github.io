---
layout: home
---

<div class="hero-section">
  <h1 class="hero-title">Building products that matter</h1>
  <p class="hero-subtitle">Building iOS apps, leading product teams, and writing about what I learn along the way.</p>
</div>

<div class="content-section">
  <div class="section-group">
    <h2>Apps</h2>
    <div class="apps-list">
      <a href="/apps/etch/" class="app-link">
        <div class="app-icon app-icon-etch">
          <img src="/assets/etch_logo.png" alt="Etch">
        </div>
        <span>Etch</span>
      </a>
      <a href="/apps/waymark/" class="app-link">
        <div class="app-icon">
          <img src="/assets/waymark_logo.png" alt="Waymark">
        </div>
        <span>Waymark</span>
      </a>
    </div>
  </div>

  <div class="dual-section">
    <div class="section-group">
      <h2>Latest Post</h2>
      {% assign latest_post = site.posts | where: "published", true | first %}
      {% if latest_post %}
      <div class="latest-item">
        <a href="{{ latest_post.url }}">{{ latest_post.title }}</a>
        <p>{{ latest_post.description }}</p>
      </div>
      {% endif %}
    </div>

    <div class="section-group">
      {% assign currently_reading_books = site.books | where_exp: "book", "book.currently_reading == true" %}
      <h2>Currently Reading</h2>
      {% if currently_reading_books.size > 0 %}
        {% for book in currently_reading_books %}
          <div class="latest-item currently-reading-item">
            <span class="book-title">{{ book.title }}</span>
            <p class="book-author">{{ book.author }}</p>
          </div>
        {% endfor %}
      {% else %}
        <div class="latest-item">
          <span class="book-title">Nothing on deck right now</span>
          <p class="book-author">Check back soon</p>
        </div>
      {% endif %}
    </div>
  </div>
</div>

<style>
  .hero-section {
    text-align: center;
    padding: 60px 20px 40px 20px;
    margin-bottom: 60px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-title {
    font-size: 3rem;
    font-weight: 700;
    margin: 0 0 16px 0;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .hero-subtitle {
    font-size: 1.125rem;
    line-height: 1.6;
    max-width: 60ch;
    margin: 0 auto;
    color: #666;
  }

  .content-section {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px 80px 20px;
  }

  .section-group {
    margin-bottom: 48px;
  }

  .dual-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
  }

  .dual-section .section-group {
    margin-bottom: 0;
  }

  .section-group h2 {
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #999;
    margin-bottom: 16px;
  }

  .apps-list {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }

  .app-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: inherit;
    transition: opacity 0.2s;
  }

  .app-link:hover {
    opacity: 0.7;
  }

  .app-icon {
    width: 64px;
    height: 64px;
    background: white;
    border-radius: 12px;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e5e7eb;
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
    width: 88px !important;
    height: 88px !important;
  }

  .app-link span {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .latest-item {
    border-left: 2px solid #e5e7eb;
    padding-left: 16px;
    position: relative;
  }

  .latest-item a {
    font-size: 1.25rem;
    font-weight: 600;
    color: inherit;
    text-decoration: none;
    display: block;
    margin-bottom: 4px;
  }

  .latest-item a:hover {
    color: #007AFF;
  }

  .latest-item p {
    margin: 4px 0 0 0;
    color: #666;
    font-size: 0.9375rem;
    line-height: 1.5;
  }

  .currently-reading-item + .currently-reading-item {
    padding-top: 12px;
  }

  .currently-reading-item + .currently-reading-item::before {
    content: "";
    position: absolute;
    top: 0;
    left: 16px;
    right: 0;
    border-top: 1px solid #e5e7eb;
  }

  .book-title {
    font-size: 1.25rem;
    font-weight: 600;
    display: block;
    margin-bottom: 4px;
  }

  .book-author {
    margin: 4px 0 0 0;
    color: #666;
    font-size: 0.9375rem;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: 2rem;
    }

    .hero-subtitle {
      font-size: 1rem;
    }

    .dual-section {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  }
</style>
