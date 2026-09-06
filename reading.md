---
title: Reading
permalink: /reading/
layout: page
description: Books I've read since 2023, plus some favorites from earlier years.
show_description: false
---

{% assign all_books = site.books | sort: 'date' | reverse %}
<div data-library>
  <div class="library-controls" hidden>
    <div class="library-search">
      <label class="search-label">
        <svg class="search-icon" width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" stroke-width="1.25"/><path d="m13 13 4.25 4.25" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>
        <span class="sr-only">Search books or authors</span>
        <input type="search" data-book-search placeholder="Search books or authors" autocomplete="off">
      </label>
      <button class="search-clear" type="button" data-search-clear aria-label="Clear search" hidden>×</button>
    </div>
    <div class="library-options">
      <div class="library-option-group" role="group" aria-label="Sort books">
        <button class="library-option" type="button" data-book-sort="date" aria-pressed="true">Recent</button>
        <button class="library-option" type="button" data-book-sort="rating" aria-pressed="false">Rating</button>
        <button class="library-option" type="button" data-book-sort="title" aria-pressed="false">Title</button>
        <button class="library-option" type="button" data-book-sort="author" aria-pressed="false">Author</button>
      </div>
      <div class="library-option-group" role="group" aria-label="Filter books">
        <button class="library-option" type="button" data-book-filter="all" aria-pressed="true">All</button>
        <button class="library-option" type="button" data-book-filter="favorites" aria-pressed="false">Favorites</button>
        <button class="library-option" type="button" data-book-filter="notes" aria-pressed="false">With notes</button>
      </div>
    </div>
  </div>
  <p class="library-count" role="status" aria-live="polite" data-book-count>{{ site.books.size }} books</p>
  <div class="book-list" data-book-list>
    {% for book in all_books %}{% include book_item.html book=book %}{% endfor %}
  </div>
  <p class="empty-state" data-book-empty hidden>No books found. Try a different title, author, or filter.</p>
</div>
