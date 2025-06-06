#!/usr/bin/env ruby

require 'fileutils'
require 'time'

# Prompt user for input
print "Post title: "
title = gets.chomp

print "Post description: "
description = gets.chomp

# Generate slug from title
slug = title.downcase.strip.gsub(/[^\w\s-]/, '').gsub(/\s+/, '-')

# Generate filename
date = Time.now.strftime("%Y-%m-%d")
time = Time.now.strftime("%H:%M:%S")
filename = "_posts/#{date}-#{slug}.md"

# Front matter content
front_matter = <<~FRONT
  ---
  layout: post
  title: #{title}
  description: #{description}
  date: #{date} #{time} +0000
  published: false
  tags: product-management
  ---
FRONT

# Create file
FileUtils.mkdir_p("_posts")
File.write(filename, front_matter)

puts "✅ Created new draft: #{filename}"
