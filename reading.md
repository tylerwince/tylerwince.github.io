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
                <li style="display: grid; grid-template-columns: auto min-content; gap: 10px; align-items: center; margin-bottom: 10px;">
                    {% if book.link %}
                        <a href="{{ book.link }}" target="_blank" rel="nofollow noopener" style="text-decoration: none;">
                            {{ book.title }} by {{ book.author }}
                        </a>
                    {% else %}
                        <span>{{ book.title }} by {{ book.author }}</span>
                    {% endif %}
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