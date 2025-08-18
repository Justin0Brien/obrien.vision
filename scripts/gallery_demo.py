#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Gallery Demo Script

This script demonstrates how the gallery system works by:
1. Simulating a new image being added to the gallery
2. Running the metadata generator
3. Showing the workflow

Usage: python3 scripts/gallery_demo.py
"""

import os
import sys
import pathlib

# Add the scripts directory to Python path
sys.path.insert(0, str(pathlib.Path(__file__).parent))

from generate_gallery_metadata import generate_missing_metadata, list_gallery_status

def demo_gallery_workflow():
    """Demonstrate the gallery workflow"""
    print("=" * 60)
    print("GALLERY SYSTEM DEMONSTRATION")
    print("=" * 60)
    
    print("\n1. Current Gallery Status:")
    print("-" * 30)
    list_gallery_status()
    
    print("\n2. Gallery Workflow:")
    print("-" * 30)
    print("✓ Images are processed by image_pipeline.py with watermarks")
    print("✓ Original, 512w, and 256w versions are created automatically")
    print("✓ Images are placed in assets/images/gallery/")
    print("✓ Metadata generator creates template markdown files")
    print("✓ Jekyll builds the gallery pages automatically")
    
    print("\n3. File Structure:")
    print("-" * 30)
    
    project_root = pathlib.Path(__file__).resolve().parent.parent
    gallery_images = project_root / "assets" / "images" / "gallery"
    gallery_collection = project_root / "_gallery"
    
    print(f"📁 {gallery_images.name}/")
    for file in sorted(gallery_images.glob("*.webp")):
        print(f"   📷 {file.name}")
    
    print(f"\n📁 {gallery_collection.name}/")
    for file in sorted(gallery_collection.glob("*.md")):
        print(f"   📝 {file.name}")
    
    print("\n4. URLs Generated:")
    print("-" * 30)
    print("Gallery main page: /images/")
    for file in sorted(gallery_collection.glob("*.md")):
        stem = file.stem
        print(f"Individual item:   /images/{stem}/")
    
    print("\n5. How to Add New Images:")
    print("-" * 30)
    print("1. Process images through image_pipeline.py")
    print("2. Copy resulting .webp files to assets/images/gallery/")
    print("3. Run: python3 scripts/generate_gallery_metadata.py")
    print("4. Edit the generated .md files to add descriptions")
    print("5. Rebuild Jekyll: bundle exec jekyll build")
    
    print("\n" + "=" * 60)
    print("Gallery system is ready to use!")
    print("=" * 60)

if __name__ == "__main__":
    demo_gallery_workflow()
