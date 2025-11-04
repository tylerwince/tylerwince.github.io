---
title: Reading
permalink: /reading/
layout: page
---

<h1>Reading</h1>

<p>Books I've read since 2023, plus some favorites from earlier years. Books marked with 📝 have my notes.</p>

{% assign all_books = site.books | sort: "date" | reverse %}
{% assign five_star_books = site.books | where: "stars", 5 %}

<div class="sort-menu">
  <span class="sort-label">Sort by:</span>
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
    padding: 20px 0;
    margin-bottom: 32px;
    border-bottom: 1px solid #e5e7eb;
  }

  .sort-label {
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #999;
    margin-right: 12px;
  }

  .sort-link {
    color: inherit;
    text-decoration: none;
    padding: 4px 0;
    margin: 0 12px 0 0;
    font-size: 0.9375rem;
    transition: color 0.2s;
  }

  .sort-link:hover {
    color: #007AFF;
  }

  .sort-link.active {
    color: #007AFF;
    font-weight: 600;
  }

  .year-section {
    margin-bottom: 48px;
  }

  .year-section h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 20px;
    color: inherit;
  }

  .book-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .book-item {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 16px;
    align-items: baseline;
    padding: 12px 0;
    border-bottom: 1px solid #e5e7eb;
  }

  .book-item:last-child {
    border-bottom: none;
  }

  .book-title-link, .book-title {
    display: block;
    text-decoration: none;
    color: inherit;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.5;
  }

  .book-title-link:hover {
    color: #007AFF;
  }

  .book-author {
    display: block;
    font-size: 0.875rem;
    color: #666;
    margin-top: 2px;
  }

  .note-icon {
    font-size: 0.875rem;
    margin-left: 6px;
  }

  .book-rating {
    white-space: nowrap;
    font-size: 0.875rem;
  }

  .stars {
    color: #FFD700;
  }

  @media (max-width: 768px) {
    .sort-menu {
      overflow-x: auto;
      white-space: nowrap;
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
