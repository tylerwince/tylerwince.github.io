---
title: Reading
permalink: /reading/
layout: default
---

These are books I've read in (generally) reverse chronological order since 2023.

<div>
{% for entry in site.data.reading.list %}
    <div>
        <h2>{{ entry.year }}</h2>
        <p>{{ entry.books | size }} books</p>
        <ul style="list-style-type: none; padding: 0;">
            {% for book in entry.books %}
                <li style="display: grid; grid-template-columns: auto min-content; gap: 10px; align-items: start; margin-bottom: 10px;">
                    <div>
                        {% if book.link %}
                            <a href="/{{ book.link }}" rel="nofollow noopener" style="{% if book.stars == 5 %}font-weight: bold;{% endif %} text-decoration: none; display: block;">
                                {{ book.title }}
                            </a>
                            <span style="display: block; font-size: 0.8em; color: #999;">by {{ book.author }}</span>
                        {% else %}
                            <span style="{% if book.stars == 5 %}font-weight: bold;{% endif %} display: block;">{{ book.title }}</span>
                            <span style="display: block; font-size: 0.8em; color: #999;">by {{ book.author }}</span>
                        {% endif %}
                    </div>
                    <span style="white-space: nowrap; color: {% if book.stars == 5 %}gold{% else %}black{% endif %};">
                        {% if book.stars %}
                            {% assign star_count = book.stars %}
                            {% for i in (1..star_count) %}
                                ★
                            {% endfor %}
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
