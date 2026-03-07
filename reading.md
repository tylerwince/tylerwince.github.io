---
title: Reading
permalink: /reading/
layout: page
description: Books I've read since 2023, plus some favorites from earlier years.
---

{% assign all_books = site.books | sort: "date" | reverse %}
{% assign five_star_books = site.books | where: "stars", 5 %}

<div class="sort-controls">
  <span>Sort:</span>
  <a href="#" onclick="showList('date'); return false;" class="sort-link active" id="sort-date">Date</a>
  <a href="#" onclick="showList('rating'); return false;" class="sort-link" id="sort-rating">Rating</a>
  <a href="#" onclick="showList('title'); return false;" class="sort-link" id="sort-title">Title</a>
  <a href="#" onclick="showList('author'); return false;" class="sort-link" id="sort-author">Author</a>
  <a href="#" onclick="showList('favorites'); return false;" class="sort-link" id="sort-favorites">Favorites</a>
</div>

<div id="favorites-list" style="display: none;">
  <div class="book-list">
    {% for book in five_star_books %}
      {% include book_item.html book=book %}
    {% endfor %}
  </div>
</div>

<div id="date-list">
  {% assign grouped_books = all_books | group_by_exp: "book", "book.date | date: '%Y' | to_integer" %}
  {% for year_group in grouped_books %}
    {% assign year = year_group.name | to_integer %}
    {% if year >= 2020 %}
      <div class="year-section">
        <h2 class="year-heading">{{ year }}</h2>
        <div class="book-list">
          {% for book in year_group.items %}
            {% include book_item.html book=book %}
          {% endfor %}
        </div>
      </div>
    {% elsif forloop.last %}
      <div class="year-section">
        <h2 class="year-heading">Previous</h2>
        <div class="book-list">
          {% for book in year_group.items %}
            {% include book_item.html book=book %}
          {% endfor %}
        </div>
      </div>
    {% endif %}
  {% endfor %}
</div>

<div id="rating-list" style="display: none;">
  {% assign rated_books = site.books | where_exp: "book", "book.stars" | sort: "stars" | reverse %}
  {% assign unrated_books = site.books | where_exp: "book", "book.stars == nil" %}
  <div class="book-list">
    {% for book in rated_books %}
      {% include book_item.html book=book %}
    {% endfor %}
    {% for book in unrated_books %}
      {% include book_item.html book=book unrated=true %}
    {% endfor %}
  </div>
</div>

<div id="title-list" style="display: none;">
  {% assign sorted_books = site.books | sort: "title" %}
  <div class="book-list">
    {% for book in sorted_books %}
      {% include book_item.html book=book %}
    {% endfor %}
  </div>
</div>

<div id="author-list" style="display: none;">
  {% assign sorted_books = site.books | sort_natural: "author" %}
  <div class="book-list" id="author-list-container">
    {% for book in sorted_books %}
      {% assign words = book.author | split: ' ' %}
      {% assign last_name = words | last %}
      {% include book_item.html book=book last_name=last_name %}
    {% endfor %}
  </div>
</div>

<script>
function showList(type) {
  ['date', 'rating', 'title', 'author', 'favorites'].forEach(function(id) {
    document.getElementById(id + '-list').style.display = 'none';
  });
  document.querySelectorAll('.sort-link').forEach(function(link) {
    link.classList.remove('active');
  });
  document.getElementById(type + '-list').style.display = 'block';
  document.getElementById('sort-' + type).classList.add('active');
  if (type === 'author') sortAuthorList();
}

function sortAuthorList() {
  var container = document.getElementById('author-list-container');
  if (!container) return;
  var items = Array.from(container.querySelectorAll('.book-line'));
  items.sort(function(a, b) {
    return (a.getAttribute('data-last-name') || '').toLowerCase()
      .localeCompare((b.getAttribute('data-last-name') || '').toLowerCase());
  });
  items.forEach(function(item) { container.appendChild(item); });
}
</script>
