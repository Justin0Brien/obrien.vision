#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Image ingestion & processing watchdog.

Run this script (normally via scripts/run_image_pipeline.sh) to watch the
uploads/new directory for newly added source images. Each new file is:
    * normalised to PNG (temp)
    * (attempted) invisible-watermark embed
    * exported to WebP: original, 512w, 256w
    * XMP author / rights metadata injected (if exiftool available)
    * small JSON manifest written alongside images

Outputs are placed in assets/images so Jekyll can serve them. Temporary
intermediate files live in .image_pipeline_tmp (ignored by git).

Usage:
    python scripts/image_pipeline.py [--once] [--verbose]

Options:
    --once      Process existing files and exit (no watching)
    --verbose   Enable DEBUG-level logging

Environment:
    Requires: Pillow, watchdog, blind-watermark (see requirements.txt)
    Optional: exiftool (for XMP metadata)
"""

import argparse
import json
import logging
import pathlib
import shutil
import subprocess
import sys
import time
import unicodedata
from datetime import datetime
from typing import Optional, Tuple

# Third-party imports - check availability
try:
    from watchdog.observers import Observer
    from watchdog.events import FileSystemEventHandler, FileCreatedEvent, FileModifiedEvent
except ImportError as e:
    sys.exit(f"ERROR: Missing dependency 'watchdog'. Install with: pip install watchdog\n{e}")

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError as e:
    sys.exit(f"ERROR: Missing dependency 'Pillow'. Install with: pip install Pillow\n{e}")

try:
    from blind_watermark import WaterMark
except ImportError as e:
    sys.exit(f"ERROR: Missing dependency 'blind-watermark'. Install with: pip install blind-watermark\n{e}")


# -----------------------------------------------------------------------------
# Logging configuration
# -----------------------------------------------------------------------------
LOG_FORMAT = "%(asctime)s [%(levelname)s] %(message)s"
LOG_DATE_FORMAT = "%Y-%m-%d %H:%M:%S"

logger = logging.getLogger("image_pipeline")


def setup_logging(verbose: bool = False) -> None:
    """Configure logging for the image pipeline."""
    level = logging.DEBUG if verbose else logging.INFO
    logging.basicConfig(
        level=level,
        format=LOG_FORMAT,
        datefmt=LOG_DATE_FORMAT,
        handlers=[logging.StreamHandler(sys.stdout)]
    )


# -----------------------------------------------------------------------------
# Configuration constants
# -----------------------------------------------------------------------------
PROJECT_ROOT = pathlib.Path(__file__).resolve().parent.parent
UPLOADS_DIR = PROJECT_ROOT / "uploads" / "new"
OUTPUT_DIR = PROJECT_ROOT / "assets" / "images"
TMP_DIR = PROJECT_ROOT / ".image_pipeline_tmp"

WM_TEXT = "© Justin O'Brien — https://obrien.vision/rights"
WM_PASS_IMG = 1
WM_PASS_WM = 1

AUTHOR = "Justin O'Brien"
RIGHTS_YEAR = datetime.now().year
RIGHTS_TEXT = f"© {AUTHOR}, {RIGHTS_YEAR}. All rights reserved."
RIGHTS_URL = "https://obrien.vision/rights"

WEBP_QUALITY_ORIGINAL = 90
WEBP_QUALITY_RESIZED = 90
RESIZED_WIDTH = 512
THUMB_WIDTH = 256

ALLOWED_EXT = {".jpg", ".jpeg", ".png", ".tif", ".tiff", ".bmp", ".webp"}

EXIFTOOL_BIN_CANDIDATES = [
    "/opt/homebrew/bin/exiftool",
    "/usr/local/bin/exiftool",
    "exiftool"
]


# -----------------------------------------------------------------------------
# Utility functions
# -----------------------------------------------------------------------------
def ensure_dirs() -> None:
    """Create required directories if they don't exist."""
    for p in (UPLOADS_DIR, OUTPUT_DIR, TMP_DIR):
        p.mkdir(parents=True, exist_ok=True)
        logger.debug(f"Ensured directory exists: {p}")


def find_exiftool() -> Optional[str]:
    """
    Locate the exiftool binary on the system.
    
    Returns:
        Path to exiftool binary if found, None otherwise.
    """
    for cand in EXIFTOOL_BIN_CANDIDATES:
        try:
            subprocess.run(
                [cand, "-ver"],
                check=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL
            )
            logger.debug(f"Found exiftool at: {cand}")
            return cand
        except (FileNotFoundError, subprocess.CalledProcessError):
            continue
    return None


EXIFTOOL = find_exiftool()


def web_safe_slug(text: str) -> str:
    """
    Convert text to a URL-safe slug.
    
    Args:
        text: Input string to convert.
        
    Returns:
        Lowercase, ASCII-only slug with hyphens.
    """
    text = unicodedata.normalize("NFKD", text)
    text = text.encode("ascii", "ignore").decode("ascii")
    text = text.lower()
    allowed = "-_."
    slug = "".join(c if c.isalnum() or c in allowed or c == " " else "-" for c in text)
    slug = slug.replace(" ", "-")
    while "--" in slug:
        slug = slug.replace("--", "-")
    slug = slug.strip("._-")
    return slug or "image"


def unique_stem(stem: str, folder: pathlib.Path) -> str:
    """
    Generate a unique filename stem to avoid collisions.
    
    Args:
        stem: Base filename stem.
        folder: Target directory to check for existing files.
        
    Returns:
        Unique stem (possibly with numeric suffix).
    """
    n, candidate = 1, stem
    while any((folder / f"{candidate}{suffix}.webp").exists() for suffix in ("", "-512w", "-256w")):
        n += 1
        candidate = f"{stem}-{n}"
    return candidate


def wait_for_stable(path: pathlib.Path, checks: int = 3, interval: float = 0.5) -> bool:
    """
    Wait for a file to stabilize (finish writing).
    
    Args:
        path: Path to the file.
        checks: Number of consecutive stable checks required.
        interval: Time between checks in seconds.
        
    Returns:
        True if file is stable, False if timeout or file disappeared.
    """
    last, stable = -1, 0
    for _ in range(checks * 8):
        try:
            sz = path.stat().st_size
        except FileNotFoundError:
            logger.warning(f"File disappeared while waiting: {path}")
            return False
        if sz == last and sz > 0:
            stable += 1
            if stable >= checks:
                return True
        else:
            stable, last = 0, sz
        time.sleep(interval)
    logger.warning(f"File did not stabilize within timeout: {path}")
    return False


def read_image_dimensions(path: pathlib.Path) -> Optional[Tuple[int, int]]:
    """
    Read image dimensions without fully loading the image.
    
    Args:
        path: Path to the image file.
        
    Returns:
        Tuple of (width, height) or None if unreadable.
    """
    try:
        with Image.open(path) as im:
            im.load()
            return im.size
    except Exception as e:
        logger.debug(f"Could not read image dimensions for {path}: {e}")
        return None


# -----------------------------------------------------------------------------
# Image processing functions
# -----------------------------------------------------------------------------
def embed_invisible_watermark(src_path: pathlib.Path, out_path: pathlib.Path) -> None:
    """
    Embed an invisible watermark into an image.
    
    Args:
        src_path: Source image path.
        out_path: Output image path.
        
    Raises:
        Exception: If watermarking fails.
    """
    bwm = WaterMark(password_wm=WM_PASS_WM, password_img=WM_PASS_IMG)
    bwm.read_img(str(src_path))
    bwm.read_wm(WM_TEXT, mode='str')
    bwm.embed(str(out_path))
    logger.debug(f"Embedded invisible watermark: {out_path.name}")


def add_visible_watermark(src_path: pathlib.Path, out_path: pathlib.Path) -> None:
    """
    Add a visible copyright watermark to the bottom-left corner.
    
    Uses semi-transparent text with shadow/outline for readability
    on any background.
    
    Args:
        src_path: Source image path.
        out_path: Output image path.
    """
    with Image.open(src_path) as im:
        im.load()
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGBA")
        else:
            im = im.convert("RGBA")
        
        overlay = Image.new("RGBA", im.size, (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)
        
        current_year = datetime.now().year
        watermark_text = f"© {current_year} Justin O'Brien"
        
        base_font_size = max(12, int(im.width * 0.015))
        
        font = _load_font(base_font_size)
        
        bbox = draw.textbbox((0, 0), watermark_text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        margin = max(10, int(im.width * 0.01))
        x = margin
        y = im.height - text_height - margin
        
        shadow_offset = max(1, int(base_font_size * 0.05))
        outline_color = (0, 0, 0, 128)
        
        for dx in [-shadow_offset, 0, shadow_offset]:
            for dy in [-shadow_offset, 0, shadow_offset]:
                if dx != 0 or dy != 0:
                    draw.text((x + dx, y + dy), watermark_text, font=font, fill=outline_color)
        
        main_color = (255, 255, 255, 128)
        draw.text((x, y), watermark_text, font=font, fill=main_color)
        
        watermarked = Image.alpha_composite(im, overlay)
        
        if watermarked.mode == "RGBA":
            final_im = Image.new("RGB", watermarked.size, (255, 255, 255))
            final_im.paste(watermarked, mask=watermarked.split()[-1])
            watermarked = final_im
        
        out_path.parent.mkdir(parents=True, exist_ok=True)
        watermarked.save(out_path, format="PNG", compress_level=6)
        logger.debug(f"Added visible watermark: {out_path.name}")


def _load_font(size: int):
    """Load a TrueType font, falling back to default if necessary."""
    font_candidates = [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/Windows/Fonts/arial.ttf",
    ]
    
    for font_path in font_candidates:
        try:
            if pathlib.Path(font_path).exists():
                return ImageFont.truetype(font_path, size)
        except Exception:
            continue
    
    try:
        return ImageFont.load_default()
    except Exception:
        return ImageFont.load_default()


def to_webp(in_path: pathlib.Path, out_path: pathlib.Path, quality: int) -> None:
    """
    Convert an image to WebP format.
    
    Args:
        in_path: Source image path.
        out_path: Output WebP path.
        quality: WebP quality (1-100).
    """
    with Image.open(in_path) as im:
        im.load()
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGB")
        out_path.parent.mkdir(parents=True, exist_ok=True)
        im.save(out_path, format="WEBP", quality=quality, method=6)


def resize_to_width(in_path: pathlib.Path, out_path: pathlib.Path, width: int, quality: int) -> None:
    """
    Resize an image to a target width and save as WebP.
    
    Maintains aspect ratio. If image is already smaller than target,
    converts without resizing.
    
    Args:
        in_path: Source image path.
        out_path: Output WebP path.
        width: Target width in pixels.
        quality: WebP quality (1-100).
    """
    with Image.open(in_path) as im:
        im.load()
        w, h = im.size
        if w <= width:
            to_webp(in_path, out_path, quality=quality)
            return
        
        new_h = int(h * (width / float(w)))
        
        # Handle Pillow version differences for resampling filter
        resample_filter = (
            getattr(Image, "LANCZOS", None)
            or getattr(getattr(Image, "Resampling", object()), "LANCZOS", None)
            or getattr(Image, "BICUBIC", None)
            or getattr(Image, "NEAREST", 0)
        )
        im = im.resize((width, new_h), resample=resample_filter)
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGB")
        out_path.parent.mkdir(parents=True, exist_ok=True)
        im.save(out_path, format="WEBP", quality=quality, method=6)


def write_xmp_webp(webp_path: pathlib.Path) -> None:
    """
    Write XMP metadata to a WebP file using exiftool.
    
    Args:
        webp_path: Path to the WebP file.
    """
    if not EXIFTOOL:
        logger.debug(f"Skipping XMP write (exiftool not available): {webp_path.name}")
        return
    
    xmp_cmd = [
        EXIFTOOL, "-overwrite_original",
        f"-XMP-dc:creator={AUTHOR}",
        f"-XMP-dc:rights={RIGHTS_TEXT}",
        "-XMP-xmpRights:Marked=True",
        f"-XMP-xmpRights:WebStatement={RIGHTS_URL}",
        str(webp_path)
    ]
    try:
        subprocess.run(xmp_cmd, check=True, capture_output=True)
        logger.debug(f"Wrote XMP metadata: {webp_path.name}")
    except subprocess.CalledProcessError as e:
        logger.warning(f"ExifTool failed for {webp_path.name}: {e.stderr.decode() if e.stderr else e}")


def normalise_to_png(src_file: pathlib.Path, tmp_dest: pathlib.Path) -> None:
    """
    Normalize any supported image format to PNG.
    
    Args:
        src_file: Source image path.
        tmp_dest: Temporary PNG output path.
    """
    with Image.open(src_file) as im:
        im.load()
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGB")
        tmp_dest.parent.mkdir(parents=True, exist_ok=True)
        im.save(tmp_dest, format="PNG", compress_level=6)


# -----------------------------------------------------------------------------
# Main processing logic
# -----------------------------------------------------------------------------
def process_image(src_file: pathlib.Path) -> bool:
    """
    Process a single source image through the full pipeline.
    
    Args:
        src_file: Path to the source image.
        
    Returns:
        True if processing succeeded, False otherwise.
    """
    if src_file.suffix.lower() not in ALLOWED_EXT:
        logger.debug(f"Skipping (unsupported extension): {src_file.name}")
        return False
    
    if not wait_for_stable(src_file):
        logger.warning(f"Skipping (file not stable): {src_file.name}")
        return False
    
    if not read_image_dimensions(src_file):
        logger.error(f"Skipping (unreadable image): {src_file.name}")
        return False
    
    stem = unique_stem(web_safe_slug(src_file.stem), OUTPUT_DIR)
    tmp_src = TMP_DIR / f"{stem}-src.png"
    tmp_wm = TMP_DIR / f"{stem}-wm.png"
    tmp_visible = TMP_DIR / f"{stem}-visible.png"
    
    logger.info(f"Processing: {src_file.name} → {stem}")
    
    # Step 1: Normalize to PNG
    try:
        normalise_to_png(src_file, tmp_src)
    except Exception as e:
        logger.error(f"Normalization failed for {src_file.name}: {e}")
        return False
    
    # Step 2: Invisible watermark
    try:
        embed_invisible_watermark(tmp_src, tmp_wm)
    except Exception as e:
        logger.warning(f"Invisible watermark failed (continuing): {e}")
        shutil.copy2(tmp_src, tmp_wm)
    
    # Step 3: Visible watermark
    try:
        add_visible_watermark(tmp_wm, tmp_visible)
    except Exception as e:
        logger.warning(f"Visible watermark failed (continuing): {e}")
        shutil.copy2(tmp_wm, tmp_visible)
    
    # Step 4: Generate WebP outputs
    out_full = OUTPUT_DIR / f"{stem}.webp"
    out_512 = OUTPUT_DIR / f"{stem}-512w.webp"
    out_thumb = OUTPUT_DIR / f"{stem}-256w.webp"
    
    try:
        to_webp(tmp_visible, out_full, quality=WEBP_QUALITY_ORIGINAL)
        resize_to_width(tmp_visible, out_512, width=RESIZED_WIDTH, quality=WEBP_QUALITY_RESIZED)
        resize_to_width(tmp_visible, out_thumb, width=THUMB_WIDTH, quality=WEBP_QUALITY_RESIZED)
    except Exception as e:
        logger.error(f"WebP generation failed for {src_file.name}: {e}")
        return False
    
    # Step 5: Write XMP metadata
    for webp_file in (out_full, out_512, out_thumb):
        write_xmp_webp(webp_file)
    
    # Step 6: Write JSON manifest
    manifest = {
        "source": str(src_file),
        "outputs": [str(out_full), str(out_512), str(out_thumb)],
        "author": AUTHOR,
        "rights": RIGHTS_TEXT,
        "rights_url": RIGHTS_URL,
        "created_at": datetime.now().isoformat(timespec="seconds")
    }
    manifest_path = OUTPUT_DIR / f"{stem}.json"
    try:
        with open(manifest_path, "w", encoding="utf-8") as f:
            json.dump(manifest, f, ensure_ascii=False, indent=2)
    except Exception as e:
        logger.warning(f"Failed to write manifest: {e}")
    
    # Cleanup temporary files
    for p in (tmp_src, tmp_wm, tmp_visible):
        try:
            p.unlink()
        except Exception:
            pass
    
    logger.info(f"✔ Completed: {src_file.name} → {out_full.name}, {out_512.name}, {out_thumb.name}")
    return True


class NewImageHandler(FileSystemEventHandler):
    """Watchdog event handler for new images in the uploads directory."""
    
    def on_created(self, event):
        if isinstance(event, FileCreatedEvent):
            p = pathlib.Path(event.src_path)
            if p.is_file():
                logger.debug(f"Detected new file: {p.name}")
                process_image(p)
    
    def on_modified(self, event):
        if isinstance(event, FileModifiedEvent):
            p = pathlib.Path(event.src_path)
            if p.is_file():
                stem = web_safe_slug(p.stem)
                # Only process if output doesn't already exist
                if not (OUTPUT_DIR / f"{stem}.webp").exists():
                    logger.debug(f"Detected modified file: {p.name}")
                    process_image(p)


def process_existing_files() -> int:
    """
    Process all existing files in the uploads directory.
    
    Returns:
        Number of files successfully processed.
    """
    processed = 0
    if not UPLOADS_DIR.exists():
        logger.warning(f"Uploads directory does not exist: {UPLOADS_DIR}")
        return 0
    
    files = list(UPLOADS_DIR.iterdir())
    logger.info(f"Found {len(files)} files in uploads directory")
    
    for src_file in files:
        if src_file.is_file() and src_file.suffix.lower() in ALLOWED_EXT:
            if process_image(src_file):
                processed += 1
    
    return processed


def main() -> int:
    """
    Main entry point for the image pipeline.
    
    Returns:
        Exit code (0 for success, 1 for errors).
    """
    parser = argparse.ArgumentParser(
        description="Image ingestion and processing pipeline for obrien.vision",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )
    parser.add_argument(
        "--once",
        action="store_true",
        help="Process existing files and exit (no watching)"
    )
    parser.add_argument(
        "--verbose", "-v",
        action="store_true",
        help="Enable DEBUG-level logging"
    )
    args = parser.parse_args()
    
    setup_logging(verbose=args.verbose)
    
    # Warn if exiftool is not available
    if EXIFTOOL is None:
        logger.warning("exiftool not found; XMP metadata will not be written")
        logger.warning("Install via: brew install exiftool")
    
    # Ensure directories exist
    ensure_dirs()
    
    # Log configuration
    logger.info(f"Project root: {PROJECT_ROOT}")
    logger.info(f"Uploads directory: {UPLOADS_DIR}")
    logger.info(f"Output directory: {OUTPUT_DIR}")
    
    if args.once:
        # One-shot mode: process existing files and exit
        logger.info("Running in one-shot mode")
        processed = process_existing_files()
        logger.info(f"Processed {processed} files")
        return 0
    
    # Watch mode: monitor directory for new files
    observer = Observer()
    handler = NewImageHandler()
    observer.schedule(handler, path=str(UPLOADS_DIR), recursive=False)
    observer.start()
    
    logger.info(f"Watching '{UPLOADS_DIR}' for new images...")
    logger.info("Press Ctrl+C to stop")
    
    try:
        while True:
            time.sleep(1.0)
    except KeyboardInterrupt:
        logger.info("Shutting down...")
        observer.stop()
    
    observer.join()
    return 0


if __name__ == "__main__":
    sys.exit(main())
