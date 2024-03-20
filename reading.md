---
title: Reading
permalink: /reading/
---

<div>
{% for entry in site.data.reading.list %}
    <div>
        <h2>{{ entry.year }}</h2>
        <p>{{ entry.books | size }} books</p>
        <ul style="list-style-type: none; padding: 0;">
            {% for book in entry.books %}
                <li style="display: flex; align-items: center; margin-bottom: 10px;">
                    <a href="{{ book.link }}" target="_blank" rel="nofollow noopener" style="flex-grow: 1; text-decoration: none; margin-right: 10px;">
                        {{ book.title }} by {{ book.author }}
                    </a>
                    <span style="white-space: nowrap;">
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
