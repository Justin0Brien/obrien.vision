#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate gallery markdown files from images in assets/images.

This script scans the assets/images directory for WebP files and creates
corresponding markdown files in the _gallery collection for each unique
image (excluding sized variants like -512w and -256w).

Usage:
    python scripts/generate_gallery_metadata.py [--verbose] [--dry-run]

Options:
    --verbose   Enable DEBUG-level logging
    --dry-run   Show what would be created without writing files
"""

import argparse
import logging
import pathlib
import sys
from datetime import datetime
from typing import List

# -----------------------------------------------------------------------------
# Logging configuration
# -----------------------------------------------------------------------------
LOG_FORMAT = "%(asctime)s [%(levelname)s] %(message)s"
LOG_DATE_FORMAT = "%Y-%m-%d %H:%M:%S"

logger = logging.getLogger("generate_gallery_metadata")


def setup_logging(verbose: bool = False) -> None:
    """Configure logging for the script."""
    level = logging.DEBUG if verbose else logging.INFO
    logging.basicConfig(
        level=level,
        format=LOG_FORMAT,
        datefmt=LOG_DATE_FORMAT,
        handlers=[logging.StreamHandler(sys.stdout)]
    )


# -----------------------------------------------------------------------------
# Configuration
# -----------------------------------------------------------------------------
PROJECT_ROOT = pathlib.Path(__file__).resolve().parent.parent
IMAGES_DIR = PROJECT_ROOT / "assets" / "images"
GALLERY_DIR = PROJECT_ROOT / "_gallery"

# Suffixes to exclude (these are sized variants)
SIZE_SUFFIXES = ("-512w", "-256w", "-thumb")


def get_base_images(images_dir: pathlib.Path) -> List[pathlib.Path]:
    """
    Get list of base WebP images (excluding sized variants).
    
    Args:
        images_dir: Directory containing images.
        
    Returns:
        List of paths to base WebP images.
    """
    if not images_dir.exists():
        logger.warning(f"Images directory does not exist: {images_dir}")
        return []
    
    base_images = []
    for webp_file in images_dir.glob("*.webp"):
        stem = webp_file.stem
        # Skip sized variants
        if any(stem.endswith(suffix) for suffix in SIZE_SUFFIXES):
            logger.debug(f"Skipping sized variant: {webp_file.name}")
            continue
        base_images.append(webp_file)
    
    logger.info(f"Found {len(base_images)} base images")
    return sorted(base_images)


def generate_markdown(image_path: pathlib.Path) -> str:
    """
    Generate markdown content for a gallery image.
    
    Args:
        image_path: Path to the WebP image.
        
    Returns:
        Markdown content string with YAML front matter.
    """
    stem = image_path.stem
    title = stem.replace("-", " ").replace("_", " ").title()
    
    # Check for sized variants
    parent = image_path.parent
    has_512 = (parent / f"{stem}-512w.webp").exists()
    has_256 = (parent / f"{stem}-256w.webp").exists()
    
    content = f"""---
layout: gallery-item
title: "{title}"
image: /assets/images/{image_path.name}
"""
    
    if has_512:
        content += f"image_512: /assets/images/{stem}-512w.webp\n"
    if has_256:
        content += f"image_256: /assets/images/{stem}-256w.webp\n"
    
    content += f"""date: {datetime.now().strftime('%Y-%m-%d')}
---

{title}
"""
    return content


def main() -> int:
    """
    Main entry point.
    
    Returns:
        Exit code (0 for success, 1 for errors).
    """
    parser = argparse.ArgumentParser(
        description="Generate gallery markdown files from images",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )
    parser.add_argument(
        "--verbose", "-v",
        action="store_true",
        help="Enable DEBUG-level logging"
    )
    parser.add_argument(
        "--dry-run", "-n",
        action="store_true",
        help="Show what would be created without writing files"
    )
    args = parser.parse_args()
    
    setup_logging(verbose=args.verbose)
    
    logger.info(f"Project root: {PROJECT_ROOT}")
    logger.info(f"Images directory: {IMAGES_DIR}")
    logger.info(f"Gallery directory: {GALLERY_DIR}")
    
    if args.dry_run:
        logger.info("DRY RUN MODE - no files will be written")
    
    # Ensure gallery directory exists
    if not args.dry_run:
        GALLERY_DIR.mkdir(parents=True, exist_ok=True)
    
    # Get base images
    images = get_base_images(IMAGES_DIR)
    
    if not images:
        logger.warning("No images found to process")
        return 0
    
    created = 0
    skipped = 0
    
    for image_path in images:
        md_path = GALLERY_DIR / f"{image_path.stem}.md"
        
        if md_path.exists():
            logger.debug(f"Skipping (already exists): {md_path.name}")
            skipped += 1
            continue
        
        content = generate_markdown(image_path)
        
        if args.dry_run:
            logger.info(f"Would create: {md_path.name}")
        else:
            try:
                md_path.write_text(content, encoding="utf-8")
                logger.info(f"Created: {md_path.name}")
                created += 1
            except Exception as e:
                logger.error(f"Failed to create {md_path.name}: {e}")
    
    logger.info(f"Summary: {created} created, {skipped} skipped")
    return 0


if __name__ == "__main__":
    sys.exit(main())
