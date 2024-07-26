---
title: Reading
permalink: /reading/
layout: default
---

These are books I've read in (generally) reverse chronological order since 2023.

<div>
{% assign dated_books = site.books | where_exp: "book", "book.date" %}
{% assign year_only_books = site.books | where_exp: "book", "book.year_read and book.year_read != 'Previous Years'" %}
{% assign previous_years_books = site.books | where_exp: "book", "book.year_read == 'Previous Years'" %}

{% assign all_years = dated_books | map: "date" | map: "year" | concat: year_only_books | map: "year_read" | uniq | sort | reverse %}

{% for year in all_years %}
    <div>
        <h2>{{ year }}</h2>
        {% assign year_dated_books = dated_books | where_exp: "book", "book.date | date: '%Y' == year" %}
        {% assign year_only_books_for_year = year_only_books | where: "year_read", year %}
        {% assign all_year_books = year_dated_books | concat: year_only_books_for_year | sort: "date" | reverse %}
        <p>{{ all_year_books | size }} books</p>
        <ul style="list-style-type: none; padding: 0;">
            {% for book in all_year_books %}
                <li style="display: grid; grid-template-columns: auto min-content; gap: 10px; align-items: start; margin-bottom: 10px;">
                    <div>
                        {% if book.content != "" %}
                            <a href="{{ book.url }}" rel="nofollow noopener" style="{% if book.stars == 5 %}font-weight: bold;{% endif %} text-decoration: none; display: block;">
                                {{ book.title }}
                            </a>
                        {% else %}
                            <span style="{% if book.stars == 5 %}font-weight: bold;{% endif %} display: block;">{{ book.title }}</span>
                        {% endif %}
                        <span style="display: block; font-size: 0.8em; color: #999;">by {{ book.author }}</span>
                    </div>
                    <span style="white-space: nowrap; color: {% if book.stars == 5 %}gold{% else %}black{% endif %};">
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
{% endfor %}

{% if previous_years_books.size > 0 %}
    <div>
        <h2>Previous Years</h2>
        <p>{{ previous_years_books | size }} books</p>
        <ul style="list-style-type: none; padding: 0;">
            {% for book in previous_years_books %}
                <li style="display: grid; grid-template-columns: auto min-content; gap: 10px; align-items: start; margin-bottom: 10px;">
                    <div>
                        {% if book.content != "" %}
                            <a href="{{ book.url }}" rel="nofollow noopener" style="{% if book.stars == 5 %}font-weight: bold;{% endif %} text-decoration: none; display: block;">
                                {{ book.title }}
                            </a>
                        {% else %}
                            <span style="{% if book.stars == 5 %}font-weight: bold;{% endif %} display: block;">{{ book.title }}</span>
                        {% endif %}
                        <span style="display: block; font-size: 0.8em; color: #999;">by {{ book.author }}</span>
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
</div>