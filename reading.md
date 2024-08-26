---
title: Reading
permalink: /reading/
layout: base
---

<h1>My Reading List</h1>

<p>These are books I've read since January 2023 (plus some greats from previous years).
  Any book with a 📝 icon contains my reading notes, favorite quotes, and a summary.
</p>
<p>  You can sort this list by
  <a href="#" onclick="showList('date'); return false;">date</a>,
  <a href="#" onclick="showList('rating'); return false;">rating</a>, or
  <a href="#" onclick="showList('title'); return false;">title</a>.
</p>

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
            <ul style="list-style-type: none; padding: 0;">
                {% for book in year_group.items %}
                    <li style="display: grid; grid-template-columns: auto min-content; gap: 10px; align-items: start; margin-bottom: 10px;">
                        <div>
                            {% assign content_size = book.content | strip | size %}
                            {% if content_size > 0 %}
                                <a href="{{ book.url }}" rel="nofollow noopener" style="{% if book.stars == 5 %}font-weight: bold;{% endif %} text-decoration: none; display: block;">
                                    {{ book.title }} <span style="font-size: 0.8em; color: #4a4a4a;">📝</span>
                                </a>
                            {% else %}
                                <span style="{% if book.stars == 5 %}font-weight: bold;{% endif %} display: block;">{{ book.title }}</span>
                            {% endif %}
                            <span style="{% if book.stars == 5 %}font-weight: bold;{% endif %} display: block; font-size: 0.8em; color: #999;">by {{ book.author }}</span>
                        </div>
                        <span style="white-space: nowrap; color: {% if book.stars == 5 %}gold{% endif %};">
                            {% if book.currently_reading %}
                                <span style="display: block; font-size: 0.8em; color: #999;">Started: {{ book.date | date: "%b %d" }}</span>
                            {% elsif book.stars %}
                                {% assign star_count = book.stars %}
                                {% for i in (1..star_count) %}★{% endfor %}
                            {% endif %}
                        </span>
                    </li>
                {% endfor %}
            </ul>
        </div>
    {% elsif forloop.last %}
        <div>
            <h2>Previous Years</h2>
            <p>{{ year_group.items | size }} books</p>
            <ul style="list-style-type: none; padding: 0;">
                {% for book in year_group.items %}
                    <li style="display: grid; grid-template-columns: auto min-content; gap: 10px; align-items: start; margin-bottom: 10px;">
                        <div>
                            {% assign content_size = book.content | strip | size %}
                            {% if content_size > 0 %}
                                <a href="{{ book.url }}" rel="nofollow noopener" style="{% if book.stars == 5 %}font-weight: bold;{% endif %} text-decoration: none; display: block;">
                                    {{ book.title }} <span style="font-size: 0.8em; color: #4a4a4a;">📝</span>
                                </a>
                            {% else %}
                                <span style="{% if book.stars == 5 %}font-weight: bold;{% endif %} display: block;">{{ book.title }}</span>
                            {% endif %}
                            <span style="{% if book.stars == 5 %}font-weight: bold;{% endif %} display: block; font-size: 0.8em; color: #999;">by {{ book.author }}</span>
                        </div>
                        <span style="white-space: nowrap; color: {% if book.stars == 5 %}gold{% else %}black{% endif %};">
                            {% if book.stars %}
                                {% assign star_count = book.stars %}
                                {% for i in (1..star_count) %}★{% endfor %}
                            {% endif %}
                        </span>
                    </li>
                {% endfor %}
            </ul>
        </div>
    {% endif %}
{% endfor %}
</div>

<div id="rating-list" style="display: none;">
  {% assign rated_books = site.books | where_exp: "book", "book.stars" | sort: "stars" | reverse %}
  {% assign unrated_books = site.books | where_exp: "book", "book.stars == nil" %}
  <ul style="list-style-type: none; padding: 0;">
    {% for book in rated_books %}
      <li style="display: grid; grid-template-columns: auto min-content; gap: 10px; align-items: start; margin-bottom: 10px;">
        <div>
          {% assign content_size = book.content | strip | size %}
          {% if content_size > 0 %}
            <a href="{{ book.url }}" rel="nofollow noopener" style="{% if book.stars == 5 %}font-weight: bold;{% endif %} text-decoration: none; display: block;">
              {{ book.title }} <span style="font-size: 0.8em; color: #4a4a4a;">📝</span>
            </a>
          {% else %}
            <span style="{% if book.stars == 5 %}font-weight: bold;{% endif %} display: block;">{{ book.title }}</span>
          {% endif %}
          <span style="{% if book.stars == 5 %}font-weight: bold;{% endif %} display: block; font-size: 0.8em; color: #999;">by {{ book.author }}</span>
        </div>
        <span style="white-space: nowrap; color: {% if book.stars == 5 %}gold{% endif %};">
          {% assign star_count = book.stars %}
          {% for i in (1..star_count) %}★{% endfor %}
        </span>
      </li>
    {% endfor %}
    {% for book in unrated_books %}
      <li style="display: grid; grid-template-columns: auto min-content; gap: 10px; align-items: start; margin-bottom: 10px;">
        <div>
          {% assign content_size = book.content | strip | size %}
          {% if content_size > 0 %}
            <a href="{{ book.url }}" rel="nofollow noopener" style="text-decoration: none; display: block;">
              {{ book.title }} <span style="font-size: 0.8em; color: #4a4a4a;">📝</span>
            </a>
          {% else %}
            <span style="display: block;">{{ book.title }}</span>
          {% endif %}
          <span style="display: block; font-size: 0.8em; color: #999;">by {{ book.author }}</span>
        </div>
        <span style="white-space: nowrap;">Unrated</span>
      </li>
    {% endfor %}
  </ul>
</div>

<div id="title-list" style="display: none;">
  {% assign sorted_books = site.books | sort: "title" %}
  <ul style="list-style-type: none; padding: 0;">
    {% for book in sorted_books %}
      <li style="display: grid; grid-template-columns: auto min-content; gap: 10px; align-items: start; margin-bottom: 10px;">
        <div>
          {% assign content_size = book.content | strip | size %}
          {% if content_size > 0 %}
            <a href="{{ book.url }}" rel="nofollow noopener" style="{% if book.stars == 5 %}font-weight: bold;{% endif %} text-decoration: none; display: block;">
              {{ book.title }} <span style="font-size: 0.8em; color: #4a4a4a;">📝</span>
            </a>
          {% else %}
            <span style="{% if book.stars == 5 %}font-weight: bold;{% endif %} display: block;">{{ book.title }}</span>
          {% endif %}
          <span style="{% if book.stars == 5 %}font-weight: bold;{% endif %} display: block; font-size: 0.8em; color: #999;">by {{ book.author }}</span>
        </div>
        <span style="white-space: nowrap; color: {% if book.stars == 5 %}gold{% endif %};">
          {% if book.stars %}
            {% assign star_count = book.stars %}
            {% for i in (1..star_count) %}★{% endfor %}
          {% endif %}
        </span>
      </li>
    {% endfor %}
  </ul>
</div>

<script>
function showList(listType) {
  document.getElementById('date-list').style.display = 'none';
  document.getElementById('rating-list').style.display = 'none';
  document.getElementById('title-list').style.display = 'none';
  document.getElementById(listType + '-list').style.display = 'block';
}
</script>
