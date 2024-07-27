#!/usr/bin/env ruby

require 'date'
require 'fileutils'

# Get book details from user input
print "Enter book title: "
title = gets.chomp

print "Enter author name: "
author = gets.chomp

print "Enter star rating (1-5): "
stars = gets.chomp.to_i

# Create the file name
date = Date.today.strftime("%Y-%m-%d")
file_name = "#{title.downcase.gsub(/[^a-z0-9]+/, '-')}.md"

# Create the file content
content = <<-CONTENT
---
layout: book
title: "#{title}"
author: "#{author}"
date: #{date}
stars: #{stars}
---

<!--
## Summary
[3-5 sentences summarizing the book's main thesis, arguments, or story]

## Key Takeaways
1. [First key point]
2. [Second key point]
3. [Third key point]
4. [Fourth key point]
5. [Fifth key point]

## Favorite Quotes
> Your favorite quote goes here
> 
> <span class="page-number">- Page XXX</span>

## Personal Thoughts
[Your reflections on the book, how it impacted you, or how it relates to your experiences and worldview]

## Strengths
- [Strength 1]
- [Strength 2]
- [Strength 3]

## Weaknesses
- [Weakness 1]
- [Weakness 2]
- [Weakness 3]

## Related Books
- [Related Book 1]: [Brief explanation of relation]
- [Related Book 2]: [Brief explanation of relation]
- [Related Book 3]: [Brief explanation of relation]

## Updates
[Any new insights or changed perspectives upon rereading or reflecting on the book over time]

---
Last updated: #{date}
-->
CONTENT

# Ensure the _books directory exists
FileUtils.mkdir_p('_books')

# Write the content to the file
File.write(File.join('_books', file_name), content)

puts "Book review template created: _books/#{file_name}"