#!/usr/bin/env ruby

require 'fileutils'
require 'yaml'
require 'time'

# Simple test script to debug frontmatter parsing
content = File.read('_drafts/auto-process/debug-test.md')
puts "Original content:"
puts content
puts "\n" + "="*50 + "\n"

# Test the regex parsing
if content =~ /\A---\r?\n(.*?)\r?\n---\r?\n(.*)\z/m
  frontmatter_text = $1
  body = $2
  puts "Frontmatter text found:"
  puts frontmatter_text.inspect
  puts "\nBody:"
  puts body.inspect
  
  begin
    frontmatter = YAML.load(frontmatter_text) || {}
    puts "\nParsed frontmatter:"
    puts frontmatter.inspect
  rescue YAML::SyntaxError => e
    puts "YAML error: #{e.message}"
  end
else
  puts "No frontmatter found"
end
