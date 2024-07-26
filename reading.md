---
title: Reading
permalink: /reading/
layout: default
---

These are books I've read in (generally) reverse chronological order since 2023.

<div>
{% assign dated_books = site.books | where_exp: "book", "book.date" %}
{% assign previous_years_books = site.books | where_exp: "book", "book.year_read == 'Previous Years'" %}

{% assign years = dated_books | group_by_exp: "book", "book.date | date: '%Y'" | sort: "name" | reverse %}

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