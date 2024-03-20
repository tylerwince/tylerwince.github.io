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
                            <span style="font-weight: bold;">{{ book.title }}</span> <span style="font-size: 0.8em; color: #999;">by {{ book.author }}</span>
                        </a>
                    {% else %}
                        <span><span style="font-weight: bold;">{{ book.title }}</span> <span style="font-size: 0.8em; color: #999;">by {{ book.author }}</span></span>
                    {% endif %}
                    <span style="white-space: nowrap; {% if book.stars == 5 %}color: gold;{% endif %}">
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
