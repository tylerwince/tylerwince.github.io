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

date = nil
loop do
  print "Enter date read (YYYY-MM-DD, blank for today): "
  input = gets.chomp.strip
  begin
    date = input.empty? ? Date.today : Date.strptime(input, '%Y-%m-%d')
    break
  rescue ArgumentError
    puts "Invalid date. Please use the format YYYY-MM-DD."
  end
end
date_str = date.strftime('%Y-%m-%d')

# Create the file name
file_name = "#{title.downcase.gsub(/[^a-z0-9]+/, '-')}.md"

# Create the file content
content = <<-CONTENT
---
layout: book
title: "#{title}"
author: "#{author}"
date: #{date_str}
stars: #{stars}
difficulty: #{difficulty}
---
CONTENT

# Ensure the _books directory exists
FileUtils.mkdir_p('_books')

# Write the content to the file
File.write(File.join('_books', file_name), content)

puts "Book review template with structured connections created: _books/#{file_name}"
