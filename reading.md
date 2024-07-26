---
title: Reading
permalink: /reading/
layout: default
---

These are books I've read in (generally) reverse chronological order since 2023.

<div>
{% assign all_books = site.books | sort: "date" | reverse %}
{% assign previous_years_books = site.books | where: "year_read", "Previous Years" %}

{% assign current_year = "now" | date: "%Y" %}
{% assign years = current_year | minus: 2022 %}

{% for i in (0..years) %}
    {% assign year = current_year | minus: i %}
    {% assign year_books = all_books | where_exp: "book", "book.date contains year or book.year_read == year" %}
    {% if year_books.size > 0 %}
        <div>
            <h2>{{ year }}</h2>
            <p>{{ year_books | size }} books</p>
            <ul style="list-style-type: none; padding: 0;">
                {% for book in year_books %}
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
                                {% for i in (1..book.stars) %}★{% endfor %}
                            {% endif %}
                        </span>
                    </li>
                {% endfor %}
            </ul>
        </div>
    {% endif %}
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
                            {% for i in (1..book.stars) %}★{% endfor %}
                        {% endif %}
                    </span>
                </li>
            {% endfor %}
        </ul>
    </div>
{% endif %}
</div>