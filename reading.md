---
title: Reading
permalink: /reading/
layout: default
---

These are books I've read in (generally) reverse chronological order since 2023.

<div>
{% assign books_with_date = site.books | where_exp: "book", "book.date" %}
{% assign books_without_date = site.books | where_exp: "book", "book.year_read" %}

{% assign years = books_with_date | group_by_exp: "book", "book.date | date: '%Y'" %}
{% assign years = years | concat: books_without_date | group_by: "year_read" | sort: "name" | reverse %}

{% for year in years %}
    <div>
        <h2>{{ year.name }}</h2>
        <p>{{ year.items | size }} books</p>
        <ul style="list-style-type: none; padding: 0;">
            {% assign sorted_books = year.items | sort: "date" | reverse %}
            {% for book in sorted_books %}
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
                        {% else %}
                            <span style="display: block; font-size: 0.8em; color: #999;">Currently Reading</span>
                        {% endif %}
                    </span>
                </li>
            {% endfor %}
        </ul>
    </div>
{% endfor %}
</div>