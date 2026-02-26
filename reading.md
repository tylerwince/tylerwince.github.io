---
title: Reading
permalink: /reading/
layout: page
description: Books I've read since 2023, plus some favorites from earlier years.<br>Books marked with notes.
---

{% assign all_books = site.books | sort: "date" | reverse %}
{% assign five_star_books = site.books | where: "stars", 5 %}

<div class="sort-menu" style="display: flex; gap: 15px; margin-bottom: 30px; font-family: var(--font-handwriting); font-size: 1.6rem; border-bottom: 2px dashed var(--color-ink-faded); padding-bottom: 10px;">
  <span style="color: var(--color-ink-red);">Sort by:</span>
  <a href="#" onclick="showList('date'); return false;" class="sort-link active" id="sort-date">Date</a>
  <a href="#" onclick="showList('rating'); return false;" class="sort-link" id="sort-rating">Rating</a>
  <a href="#" onclick="showList('title'); return false;" class="sort-link" id="sort-title">Title</a>
  <a href="#" onclick="showList('author'); return false;" class="sort-link" id="sort-author">Author</a>
  <a href="#" onclick="showList('favorites'); return false;" class="sort-link" id="sort-favorites">Favorites</a>
</div>

<div id="favorites-list" style="display: none;">
  <div class="library-grid">
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
        <div class="year-section" style="margin-bottom: 40px;">
            <h2 style="font-size: 2.5rem;">{{ year }}</h2>
            <div class="library-grid">
                {% for book in year_group.items %}
                    {% include book_item.html book=book %}
                {% endfor %}
            </div>
        </div>
    {% elsif forloop.last %}
        <div class="year-section" style="margin-bottom: 40px;">
            <h2 style="font-size: 2.5rem;">Previous Years</h2>
            <div class="library-grid">
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
  <div class="library-grid">
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
  <div class="library-grid">
    {% for book in sorted_books %}
      {% include book_item.html book=book %}
    {% endfor %}
  </div>
</div>

<div id="author-list" style="display: none;">
  {% assign sorted_books = site.books | sort_natural: "author" %}
  <div class="library-grid" id="author-grid-container">
    {% for book in sorted_books %}
      {% assign words = book.author | split: ' ' %}
      {% assign last_name = words | last %}
      {% include book_item.html book=book last_name=last_name %}
    {% endfor %}
  </div>
</div>

<style>
.sort-link { color: var(--color-ink-faded); text-decoration: none; }
.sort-link.active { color: var(--color-ink); text-decoration: underline wavy var(--color-ink-red); }
</style>

<script>
function showList(listType) {
  document.getElementById('date-list').style.display = 'none';
  document.getElementById('rating-list').style.display = 'none';
  document.getElementById('title-list').style.display = 'none';
  document.getElementById('author-list').style.display = 'none';
  document.getElementById('favorites-list').style.display = 'none';

  document.querySelectorAll('.sort-link').forEach(link => {
    link.classList.remove('active');
  });

  document.getElementById(listType + '-list').style.display = 'block';
  document.getElementById('sort-' + listType).classList.add('active');

  if (listType === 'author') {
    sortAuthorList();
  }
}

function sortAuthorList() {
  var container = document.getElementById("author-grid-container");
  if (!container) return;

  var items = container.querySelectorAll(".library-card");
  var itemsArray = Array.from(items);

  itemsArray.sort(function(a, b) {
    var lastNameA = (a.getAttribute('data-last-name') || '').toLowerCase();
    var lastNameB = (b.getAttribute('data-last-name') || '').toLowerCase();
    return lastNameA.localeCompare(lastNameB);
  });

  itemsArray.forEach(function(item) {
    container.appendChild(item);
  });
}
</script>
