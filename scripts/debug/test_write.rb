#!/usr/bin/env ruby

require 'yaml'

# Test writing frontmatter
test_frontmatter = {
  'title' => 'Test Post',
  'date' => '2025-01-08',
  'categories' => ['test'],
  'tags' => ['debug']
}

puts "Test frontmatter:"
puts test_frontmatter.inspect
puts "\n" + "="*50 + "\n"

File.open('test_output.md', 'w') do |file|
  file.write("---\n")
  
  %w[layout title date categories tags excerpt author image thumbnail].each do |key|
    next unless test_frontmatter[key]
    
    puts "Writing key '#{key}' with value: #{test_frontmatter[key].inspect}"
    
    case test_frontmatter[key]
    when Array
      file.write("#{key}:\n")
      test_frontmatter[key].each { |item| file.write("- #{item}\n") }
    when String
      file.write("#{key}: '#{test_frontmatter[key]}'\n")
    else
      file.write("#{key}: #{test_frontmatter[key]}\n")
    end
  end
  
  file.write("---\n")
  file.write("\nTest body content\n")
end

puts "\nGenerated file:"
puts File.read('test_output.md')
