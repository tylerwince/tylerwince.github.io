---
layout: page
title: Reading
permalink: /reading/
---


{% for entry in site.data.reading.list %}    
     
       
{{entry.year}}

       
{{entry.books | size}} books
     
     
       
{{entry.year}}">         {% for book in entry.books %}           
             {{book.link}}" alt="_blank" rel="nofollow noopener">{{book.title}} by {{book.author}}{% if book.star %}â{% endif %}           
         {% endfor %}       
     
   
    {% endfor %}