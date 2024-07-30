---
title: Reading
permalink: /reading/
layout: default
---

These are books I've read in (generally) reverse chronological order since 2023.

<div>
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
