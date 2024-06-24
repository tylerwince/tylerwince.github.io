---
layout: default
---

<h1><i>{{page.title}}</i></h1>
<p><strong>Author: </strong>{{page.author}}</p>

<p><strong>Rating: </strong><span style="{% if book.stars == 5 %}font-weight: bold;{% endif %} "><span style="white-space: nowrap; color: {% if page.stars == 5 %}gold{% else %}black{% endif %};">
                        {% if page.stars %}
                            {% assign star_count = page.stars %}
                            {% for i in (1..star_count) %}
                                ★
                            {% endfor %}
                        {% else %}
                            <span style="display: block; font-size: 0.8em; color: #999;">Currently Reading</span>
                        {% endif %}
                    </span>
</span></p>
<hr>
<br>
{{ content }}

