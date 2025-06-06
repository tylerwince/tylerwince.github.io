---
title: Reading
permalink: /reading/
layout: base
---

<h1>My Reading List</h1>

<p>These are books I've read since January 2023 (plus some greats from previous years).
  Any book with a 📝 icon contains my reading notes, favorite quotes, and a summary.
</p>
<div class="sort-menu">
<p>You can sort this list by
  <a href="#" onclick="showList('date'); return false;">date</a>,
  <a href="#" onclick="showList('rating'); return false;">rating</a>,
  <a href="#" onclick="showList('title'); return false;">title</a>, or
  <a href="#" onclick="showList('author'); return false;">author</a>.
</p>
</div>

<hr/>

<div id="date-list">
{% assign all_books = site.books | sort: "date" | reverse %}
{% assign grouped_books = all_books | group_by_exp: "book", "book.date | date: '%Y' | to_integer" %}

{% for year_group in grouped_books %}
    {% assign year = year_group.name | to_integer %}
    {% if year >= 2020 %}
        <div>
            <h2>{{ year }}</h2>
            <p>{{ year_group.items | size }} books</p>
            <ul class="book-list">
                {% for book in year_group.items %}
                    {% include book_item.html book=book %}
                {% endfor %}
            </ul>
        </div>
    {% elsif forloop.last %}
        <div>
            <h2>Previous Years</h2>
            <p>{{ year_group.items | size }} books</p>
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
    position: sticky;
    top: 0;
    background: var(--minima-background-color);
    padding: 0.5em 0;
  }
  .book-list {
    list-style-type: none;
    padding: 0;
  }
  .book-item {
    display: grid;
    grid-template-columns: auto min-content;
    gap: 10px;
    align-items: start;
    margin-bottom: 10px;
    border-bottom: 1px solid var(--minima-table-header-bg-color);
    padding-bottom: 10px;
  }
  .book-title-link, .book-title {
    display: block;
    text-decoration: none;
  }
  .book-author {
    display: block;
    font-size: 0.8em;
    color: #999;
  }
  .note-icon {
    font-size: 0.8em;
    color: #4a4a4a;
  }
  .highlight {
    font-weight: bold;
  }
  .book-rating {
    white-space: nowrap;
  }
  .book-rating .currently-reading {
    display: block;
    font-size: 0.8em;
    color: #999;
  }
  .stars {
    color: gold;
  }
</style>

<script>
function showList(listType) {
  document.getElementById('date-list').style.display = 'none';
  document.getElementById('rating-list').style.display = 'none';
  document.getElementById('title-list').style.display = 'none';
  document.getElementById('author-list').style.display = 'none';
  document.getElementById(listType + '-list').style.display = 'block';

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
