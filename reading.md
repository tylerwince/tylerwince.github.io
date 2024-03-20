---
title: Reading
permalink: /reading/
---

<div>
{% for entry in site.data.reading.list %}
    <div>
        <h2>{{ entry.year }}</h2>
        <p>{{ entry.books | size }} books</p>
        <ul>
            {% for book in entry.books %}
                <li>
                    <a href="{{ book.link }}" target="_blank" rel="nofollow noopener">
                        {{ book.title }} by {{ book.author }}{% if book.star %} ★{% endif %}
                    </a>
                </li>
            {% endfor %}
        </ul>
    </div>
{% endfor %}
</div>