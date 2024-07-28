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

print "Enter difficulty level (1-5, where 1 is easiest): "
difficulty = gets.chomp.to_i

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
difficulty: #{difficulty}
---

## Summary
[3-5 sentences summarizing the book's main thesis, arguments, or story]

## Key Takeaways
1. [First key takeaway]
2. [Second key takeaway]
3. [Third key takeaway]
4. [Fourth key takeaway]
5. [Fifth key takeaway]

## Favorite Quotes
> Your favorite quote goes here
> 
> <span class="page-number">- Page XXX</span>

## Personal Thoughts
### How this book changed my perspective
[Reflections on how the book altered your viewpoint]

### Practical applications
[How you plan to apply the book's insights in your life or work]

### Questions for further exploration
[Questions raised by the book that you'd like to investigate further]

## Connections
### Related Books
1. [Book Title] by [Author]
   - Similarity: [Brief explanation of how this book relates to the current one]
   - Difference: [How this book contrasts with or complements the current one]

2. [Book Title] by [Author]
   - Similarity: [Brief explanation of how this book relates to the current one]
   - Difference: [How this book contrasts with or complements the current one]

### Related Concepts
1. [Concept or Theory Name]
   - Relation: [How this concept connects to ideas in the current book]
   - Application: [How understanding both enhances comprehension or practical use]

2. [Concept or Theory Name]
   - Relation: [How this concept connects to ideas in the current book]
   - Application: [How understanding both enhances comprehension or practical use]

### Interdisciplinary Connections
1. [Field or Discipline]
   - Connection: [How ideas from this book apply to or inform this field]
   - Insight: [What new understanding this connection provides]

## Action Items
- [Specific action 1 based on what you've learned]
- [Specific action 2 based on what you've learned]
- [Specific action 3 based on what you've learned]

## Updates
[Any new insights or changed perspectives upon rereading or reflecting on the book over time]

---
Last updated: #{date}
CONTENT

# Ensure the _books directory exists
FileUtils.mkdir_p('_books')

# Write the content to the file
File.write(File.join('_books', file_name), content)

puts "Book review template with structured connections created: _books/#{file_name}"
