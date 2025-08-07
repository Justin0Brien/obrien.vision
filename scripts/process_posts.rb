#!/usr/bin/env ruby

require 'fileutils'
require 'yaml'
require 'time'

class PostProcessor
  def initialize(source_dir = '_drafts/auto-process', site_root = '.')
    @source_dir = source_dir
    @site_root = site_root
    @posts_dir = File.join(@site_root, '_posts')
    @assets_dir = File.join(@site_root, 'assets', 'images', 'posts')
  end

  def process_all
    unless Dir.exist?(@source_dir)
      puts "❌ Source directory #{@source_dir} doesn't exist"
      puts "💡 Create it with: mkdir -p #{@source_dir}"
      return
    end
    
    md_files = Dir.glob(File.join(@source_dir, '*.md')).reject do |file|
      filename = File.basename(file, '.md').downcase
      filename.include?('readme') || filename.include?('usage')
    end
    
    if md_files.empty?
      puts "📝 No markdown files found in #{@source_dir}"
      puts "💡 Drop your .md files and images there to process them"
      return
    end
    
    md_files.each do |md_file|
      process_post_bundle(md_file)
    end
  end

  private
  
  def process_post_bundle(md_file)
    filename = File.basename(md_file, '.md')
    source_dir = File.dirname(md_file)
    
    puts "\n🔄 Processing: #{filename}"
    
    # Read and parse the markdown file
    content = File.read(md_file)
    frontmatter, body = parse_frontmatter(content)
    
    # Generate post date and filename
    date = frontmatter['date'] || Time.now.strftime('%Y-%m-%d')
    post_slug = sanitize_filename(filename)
    post_filename = "#{date}-#{post_slug}.md"
    post_dir_name = "#{date}-#{post_slug}"
    
    # Create image directory
    image_output_dir = File.join(@assets_dir, post_dir_name)
    FileUtils.mkdir_p(image_output_dir)
    
    # Find and process images
    image_files = find_images(source_dir)
    processed_images = process_images(image_files, image_output_dir, post_dir_name)
    
    # Update frontmatter with image references
    update_frontmatter_with_images(frontmatter, processed_images, post_dir_name)
    
    # Update body with image references
    updated_body = update_body_with_images(body, processed_images)
    
    # Write the processed post
    output_file = File.join(@posts_dir, post_filename)
    write_processed_post(output_file, frontmatter, updated_body)
    
    # Clean up source directory for this post
    cleanup_source_files(md_file, image_files)
    
    puts "✅ Created: #{post_filename}"
    puts "📁 Images: #{processed_images.length} processed"
    puts "📂 Location: #{image_output_dir}"
  end

  def find_images(source_dir)
    extensions = %w[.jpg .jpeg .png .gif .webp]
    Dir.glob(File.join(source_dir, '*')).select do |file|
      extensions.include?(File.extname(file).downcase)
    end
  end

  def process_images(image_files, output_dir, post_dir_name)
    processed = []
    
    image_files.each_with_index do |img_file, index|
      original_name = File.basename(img_file, File.extname(img_file))
      ext = File.extname(img_file).downcase
      
      # Determine image name (hero for first image, or keep original name)
      if index == 0 && !original_name.downcase.include?('hero')
        base_name = 'hero'
      else
        base_name = sanitize_filename(original_name)
      end
      
      # File paths
      web_image = "#{base_name}#{ext}"
      thumb_image = "#{base_name}-thumb#{ext}"
      
      web_path = "/assets/images/posts/#{post_dir_name}/#{web_image}"
      thumb_path = "/assets/images/posts/#{post_dir_name}/#{thumb_image}"
      
      # Copy and process main image
      main_output = File.join(output_dir, web_image)
      process_single_image(img_file, main_output, { type: 'main', max_width: 1200 })
      
      # Create thumbnail
      thumb_output = File.join(output_dir, thumb_image)
      process_single_image(img_file, thumb_output, { type: 'thumb', max_width: 400 })
      
      processed << {
        original: original_name,
        web_path: web_path,
        thumb_path: thumb_path,
        base_name: base_name,
        is_hero: index == 0
      }
      
      puts "  📸 #{File.basename(img_file)} → #{web_image} + thumbnail"
    end
    
    processed
  end

  def process_single_image(source, destination, options = {})
    # For now, just copy the file and add basic processing
    # You can enhance this with ImageMagick later
    
    FileUtils.cp(source, destination)
    
    # Basic file optimization would go here
    # For ImageMagick integration, you'd add:
    # - Resizing: image.resize "#{options[:max_width]}>"
    # - Watermarking: add_watermark(image)
    # - Quality optimization: image.quality 85
    # - EXIF metadata: image.set "exif:Copyright", "© 2025 obrien.vision"
    
    puts "    → Processed #{File.basename(destination)} (#{options[:type]})"
  end

  def update_frontmatter_with_images(frontmatter, processed_images, post_dir_name)
    return if processed_images.empty?
    
    hero_image = processed_images.find { |img| img[:is_hero] } || processed_images.first
    
    # Set main image and thumbnail
    frontmatter['image'] = hero_image[:web_path]
    frontmatter['thumbnail'] = hero_image[:thumb_path]
    
    # Ensure other required frontmatter
    frontmatter['layout'] ||= 'post'
    frontmatter['author'] ||= 'Justin O\'Brien'
    
    # Add categories if missing
    frontmatter['categories'] ||= ['blog']
    
    # Generate excerpt if missing
    unless frontmatter['excerpt']
      frontmatter['excerpt'] = 'Latest insights and analysis from obrien.vision'
    end
  end

  def update_body_with_images(body, processed_images)
    return body if processed_images.empty?
    
    # Add hero image at the top if not already present
    hero_image = processed_images.find { |img| img[:is_hero] } || processed_images.first
    
    unless body.include?('![') || body.include?('<img')
      hero_markdown = "\n![#{hero_image[:base_name].humanize}](#{hero_image[:web_path]})\n\n"
      body = hero_markdown + body
    end
    
    body
  end

  def parse_frontmatter(content)
    if content =~ /\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)/m
      begin
        frontmatter = YAML.load($1) || {}
      rescue YAML::SyntaxError => e
        puts "⚠️  YAML parsing error: #{e.message}"
        frontmatter = {}
      end
      body = content[($1.size + $2.size)..-1]
    else
      frontmatter = {}
      body = content
    end
    [frontmatter, body]
  end

  def write_processed_post(filepath, frontmatter, body)
    File.open(filepath, 'w') do |file|
      file.write("---\n")
      file.write(YAML.dump(frontmatter))
      file.write("---\n")
      file.write(body)
    end
  end

  def cleanup_source_files(md_file, image_files)
    # Remove processed files
    File.delete(md_file)
    image_files.each { |img| File.delete(img) }
    
    # Remove directory if empty
    source_dir = File.dirname(md_file)
    Dir.rmdir(source_dir) if Dir.empty?(source_dir)
  rescue StandardError => e
    puts "⚠️  Cleanup warning: #{e.message}"
  end

  def sanitize_filename(filename)
    filename.downcase
            .gsub(/[^\w\s_-]+/, '')
            .gsub(/(^|\b\s)\s+(\s|\b$)/, '\1\2')
            .gsub(/\s+/, '-')
  end
end

# Utility methods
class String
  def humanize
    self.gsub(/[-_]/, ' ').split.map(&:capitalize).join(' ')
  end
end

# Main execution
if __FILE__ == $0
  puts "🚀 obrien.vision Post Processor"
  puts "================================"
  
  processor = PostProcessor.new
  processor.process_all
  
  puts "🎉 Processing complete!"
  puts "💡 Run 'bundle exec jekyll serve' to see your posts"
end
