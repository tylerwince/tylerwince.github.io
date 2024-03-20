---
title: Reading
permalink: /reading/
---

These are books I've read in (generally) reverse chronological order. 

<div>
{% for entry in site.data.reading.list %}
    <div>
        <h2>{{ entry.year }}</h2>
        <p>{{ entry.books | size }} books</p>
        <ul style="list-style-type: none; padding: 0;">
            {% for book in entry.books %}
                <li style="{% if book.stars == 5 %}background-color: #fffbea;{% endif %} display: grid; grid-template-columns: auto min-content; gap: 10px; align-items: start; margin-bottom: 10px;">
                    <div>
                        {% if book.link %}
                            <a href="{{ book.link }}" target="_blank" rel="nofollow noopener" style="text-decoration: none; display: block;">
                                {{ book.title }}
                            </a>
                            <span style="display: block; font-size: 0.8em; color: #999;">by {{ book.author }}</span>
                        {% else %}
                            <span style="display: block;">{{ book.title }}</span>
                            <span style="display: block; font-size: 0.8em; color: #999;">by {{ book.author }}</span>
                        {% endif %}
                    </div>
                    <span style="white-space: nowrap; color: {% if book.stars == 5 %}gold{% else %}black{% endif %};">
                        {% if book.stars %}
                            {% assign star_count = book.stars %}
                            {% for i in (1..star_count) %}
                                ★
                            {% endfor %}
                        {% endif %}
                    </span>
                </li>
            {% endfor %}
        </ul>
    </div>
{% endfor %}
</div>
