#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Gallery Manager Script

This script scans the assets/images/gallery/ directory for WebP images
and creates corresponding markdown files in the _gallery/ collection
if they don't already exist.

Usage: python3 scripts/generate_gallery_metadata.py
"""

import os
import pathlib
from datetime import datetime

# Paths
PROJECT_ROOT = pathlib.Path(__file__).resolve().parent.parent
GALLERY_IMAGES_DIR = PROJECT_ROOT / "assets" / "images" / "gallery"
GALLERY_COLLECTION_DIR = PROJECT_ROOT / "_gallery"

def get_original_images():
    """Get list of original images (not the -256w or -512w versions)"""
    if not GALLERY_IMAGES_DIR.exists():
        print(f"Gallery directory not found: {GALLERY_IMAGES_DIR}")
        return []
    
    images = []
    for file in GALLERY_IMAGES_DIR.glob("*.webp"):
        # Skip resized versions
        if not (file.stem.endswith("-256w") or file.stem.endswith("-512w")):
            images.append(file)
    
    return sorted(images)

def create_markdown_template(image_file):
    """Create a template markdown file for an image"""
    stem = image_file.stem
    title = stem.replace("-", " ").replace("_", " ").title()
    
    current_date = datetime.now().strftime("%Y-%m-%d")
    
    template = f"""---
title: "{title}"
image_filename: "{image_file.name}"
date: {current_date}
caption: "Add a brief caption describing this image"
description: |
  Add a detailed description of this image here. 
  You can use multiple lines and markdown formatting.
tags: ["add", "relevant", "tags"]
camera: ""
location: ""
technical_notes: |
  This image has been processed through the automated pipeline with both 
  invisible and visible watermarks for copyright protection.
---

Add additional content about this image here if needed.
"""
    
    return template

def generate_missing_metadata():
    """Generate markdown files for images that don't have them"""
    # Ensure _gallery directory exists
    GALLERY_COLLECTION_DIR.mkdir(exist_ok=True)
    
    images = get_original_images()
    created_count = 0
    
    print(f"Found {len(images)} original images in gallery")
    
    for image_file in images:
        md_file = GALLERY_COLLECTION_DIR / f"{image_file.stem}.md"
        
        if not md_file.exists():
            print(f"Creating metadata file: {md_file.name}")
            
            template_content = create_markdown_template(image_file)
            
            with open(md_file, 'w', encoding='utf-8') as f:
                f.write(template_content)
            
            created_count += 1
        else:
            print(f"Metadata exists: {md_file.name}")
    
    print(f"\nCreated {created_count} new metadata files")
    
    if created_count > 0:
        print("\nDon't forget to:")
        print("1. Edit the generated markdown files to add proper descriptions")
        print("2. Update tags, captions, and other metadata")
        print("3. Rebuild your Jekyll site to see the changes")

def list_gallery_status():
    """List all images and their metadata status"""
    images = get_original_images()
    
    print("Gallery Status:")
    print("=" * 50)
    
    for image_file in images:
        md_file = GALLERY_COLLECTION_DIR / f"{image_file.stem}.md"
        status = "✓ Has metadata" if md_file.exists() else "✗ Missing metadata"
        print(f"{image_file.name:<30} {status}")

if __name__ == "__main__":
    print("Gallery Metadata Generator")
    print("=" * 30)
    
    # Show current status
    list_gallery_status()
    print()
    
    # Generate missing files
    generate_missing_metadata()
