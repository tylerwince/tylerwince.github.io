---
title: Reading
permalink: /reading/
layout: page
description: Books I've read since 2023, plus some favorites from earlier years.<br>Books marked with 📝 have my notes.
---

{% assign all_books = site.books | sort: "date" | reverse %}
{% assign five_star_books = site.books | where: "stars", 5 %}

<div class="sort-menu">
  <span class="eyebrow">Sort by</span>
  <a href="#" onclick="showList('date'); return false;" class="sort-link active" id="sort-date">Date</a>
  <a href="#" onclick="showList('rating'); return false;" class="sort-link" id="sort-rating">Rating</a>
  <a href="#" onclick="showList('title'); return false;" class="sort-link" id="sort-title">Title</a>
  <a href="#" onclick="showList('author'); return false;" class="sort-link" id="sort-author">Author</a>
  <a href="#" onclick="showList('favorites'); return false;" class="sort-link" id="sort-favorites">Favorites</a>
</div>

<div id="favorites-list" style="display: none;">
  <ul class="book-list">
    {% for book in five_star_books %}
      {% include book_item.html book=book %}
    {% endfor %}
  </ul>
</div>

<div id="date-list">
{% assign grouped_books = all_books | group_by_exp: "book", "book.date | date: '%Y' | to_integer" %}

{% for year_group in grouped_books %}
    {% assign year = year_group.name | to_integer %}
    {% if year >= 2020 %}
        <div class="year-section">
            <h2>{{ year }}</h2>
            <ul class="book-list">
                {% for book in year_group.items %}
                    {% include book_item.html book=book %}
                {% endfor %}
            </ul>
        </div>
    {% elsif forloop.last %}
        <div class="year-section">
            <h2>Previous Years</h2>
            <ul class="book-list">
                {% for book in year_group.items %}
                    {% include book_item.html book=book %}
                {% endfor %}
            </ul>
        </div>
    {% endif %}
{% endfor %}
</div>

<div id="rating-list" style="display: none;">
  {% assign rated_books = site.books | where_exp: "book", "book.stars" | sort: "stars" | reverse %}
  {% assign unrated_books = site.books | where_exp: "book", "book.stars == nil" %}
  <ul class="book-list">
    {% for book in rated_books %}
      {% include book_item.html book=book %}
    {% endfor %}
    {% for book in unrated_books %}
      {% include book_item.html book=book unrated=true %}
    {% endfor %}
  </ul>
</div>

<div id="title-list" style="display: none;">
  {% assign sorted_books = site.books | sort: "title" %}
  <ul class="book-list">
    {% for book in sorted_books %}
      {% include book_item.html book=book %}
    {% endfor %}
  </ul>
</div>

<div id="author-list" style="display: none;">
  {% assign sorted_books = site.books | sort_natural: "author" %}
  <ul class="book-list">
    {% for book in sorted_books %}
      {% assign words = book.author | split: ' ' %}
      {% assign last_name = words | last %}
      {% include book_item.html book=book last_name=last_name %}
    {% endfor %}
  </ul>
</div>

<style>
.sort-menu {
  padding: var(--space-4) 0;
  margin-bottom: var(--space-8);
  border-bottom: 0.5px solid var(--color-border-light);
  display: flex;
  gap: var(--space-6);
  align-items: center;
  flex-wrap: wrap;
}

.sort-link {
  color: var(--color-text-primary);
  text-decoration: none;
  padding: var(--space-1) 0;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.01em;
  opacity: 0.6;
  transition: opacity var(--transition-fast);
  position: relative;
}

.sort-link::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-accent);
  transition: width var(--transition-base);
}

.sort-link:hover {
  opacity: 1;
}

.sort-link.active {
  opacity: 1;
  font-weight: 600;
}

.sort-link.active::after {
  width: 100%;
}

.year-section {
  margin-bottom: var(--space-16);
}

.year-section h2 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: var(--space-6);
  letter-spacing: -0.015em;
}

.book-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.book-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--space-4);
  align-items: baseline;
  padding: var(--space-4);
  background: var(--color-surface-elevated);
  border: 0.5px solid var(--color-border-light);
  border-radius: var(--border-radius);
  transition: all var(--transition-base);
}

.book-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: var(--color-border);
}

@media (prefers-color-scheme: dark) {
  .book-item:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
}

/* Books with notes - subtle accent border */
.book-item.has-notes {
  border-left: 2px solid var(--color-accent);
  border-left-color: rgba(0, 113, 227, 0.3);
}

@media (prefers-color-scheme: dark) {
  .book-item.has-notes {
    border-left-color: rgba(41, 151, 255, 0.3);
  }
}

.book-item.has-notes:hover {
  border-left-color: var(--color-accent);
}

/* 5-star books - special treatment */
.book-item.five-star-book {
  background: linear-gradient(135deg,
    rgba(0, 113, 227, 0.03) 0%,
    rgba(0, 113, 227, 0.01) 100%
  );
  border-color: rgba(0, 113, 227, 0.15);
}

@media (prefers-color-scheme: dark) {
  .book-item.five-star-book {
    background: linear-gradient(135deg,
      rgba(41, 151, 255, 0.05) 0%,
      rgba(41, 151, 255, 0.02) 100%
    );
    border-color: rgba(41, 151, 255, 0.2);
  }
}

.book-item.five-star-book:hover {
  border-color: var(--color-accent);
  box-shadow: 0 4px 16px rgba(0, 113, 227, 0.15);
}

@media (prefers-color-scheme: dark) {
  .book-item.five-star-book:hover {
    box-shadow: 0 4px 16px rgba(41, 151, 255, 0.25);
  }
}

/* Combine both - extra special */
.book-item.five-star-book.has-notes {
  border-left: 2px solid var(--color-accent);
}

.book-title-link,
.book-title {
  display: block;
  text-decoration: none;
  color: var(--color-text-primary);
  font-weight: 500;
  font-size: 17px;
  line-height: 1.47059;
  letter-spacing: -0.022em;
  transition: color var(--transition-fast);
}

.book-title-link:hover {
  color: var(--color-accent);
}

.book-author {
  display: block;
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-top: 4px;
  letter-spacing: -0.01em;
}

.note-icon {
  font-size: 15px;
  margin-left: 6px;
  display: inline-block;
  animation: subtle-pulse 2s ease-in-out infinite;
}

@keyframes subtle-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.book-rating {
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
}

.stars {
  color: var(--color-accent);
  letter-spacing: 1px;
  font-size: 15px;
}

.five-star-book .stars {
  color: var(--color-accent);
  text-shadow: 0 0 8px rgba(0, 113, 227, 0.3);
}

@media (prefers-color-scheme: dark) {
  .five-star-book .stars {
    text-shadow: 0 0 8px rgba(41, 151, 255, 0.4);
  }
}

.unrated-text {
  color: var(--color-text-tertiary);
  font-size: 12px;
  font-weight: 400;
}

.currently-reading {
  color: var(--color-accent);
  font-size: 12px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .sort-menu {
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }

  .book-item {
    grid-template-columns: 1fr;
    gap: var(--space-2);
  }

  .book-rating {
    order: -1;
  }
}
</style>

<script>
function showList(listType) {
  // Hide all lists
  document.getElementById('date-list').style.display = 'none';
  document.getElementById('rating-list').style.display = 'none';
  document.getElementById('title-list').style.display = 'none';
  document.getElementById('author-list').style.display = 'none';
  document.getElementById('favorites-list').style.display = 'none';

  // Update sort link active states
  document.querySelectorAll('.sort-link').forEach(link => {
    link.classList.remove('active');
  });

  // Show selected list
  document.getElementById(listType + '-list').style.display = 'block';
  document.getElementById('sort-' + listType).classList.add('active');

  // Sort author list if needed
  if (listType === 'author') {
    sortAuthorList();
  }
}

function sortAuthorList() {
  var list = document.querySelector("#author-list ul");
  if (!list) return;

  var items = list.querySelectorAll("li");
  var itemsArray = Array.from(items);

  itemsArray.sort(function(a, b) {
    var lastNameA = a.getAttribute('data-last-name').toLowerCase();
    var lastNameB = b.getAttribute('data-last-name').toLowerCase();
    return lastNameA.localeCompare(lastNameB);
  });

  itemsArray.forEach(function(item) {
    list.appendChild(item);
  });
}
</script>
