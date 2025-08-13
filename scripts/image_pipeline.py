#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os, sys, time, json, shutil, pathlib, subprocess, unicodedata
from datetime import datetime
from typing import Optional
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler, FileCreatedEvent, FileModifiedEvent
from PIL import Image, ImageDraw, ImageFont
from blind_watermark import WaterMark

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

Note: PROJECT_ROOT previously pointed at scripts/, which created nested
scripts/assets/... folders. We correct that here by stepping one directory up.
"""

# Resolve repository root (the parent of the scripts/ directory containing this file)
PROJECT_ROOT = pathlib.Path(__file__).resolve().parent.parent
UPLOADS_DIR  = PROJECT_ROOT / "uploads" / "new"
OUTPUT_DIR   = PROJECT_ROOT / "assets" / "images"
TMP_DIR      = PROJECT_ROOT / ".image_pipeline_tmp"

WM_TEXT     = "© Justin O’Brien — https://obrien.vision/rights"
WM_PASS_IMG = 1
WM_PASS_WM  = 1

AUTHOR      = "Justin O’Brien"
RIGHTS_YEAR = datetime.now().year
RIGHTS_TEXT = f"© {AUTHOR}, {RIGHTS_YEAR}. All rights reserved."
RIGHTS_URL  = "https://obrien.vision/rights"

WEBP_QUALITY_ORIGINAL = 90
WEBP_QUALITY_RESIZED  = 90
RESIZED_WIDTH         = 512
THUMB_WIDTH           = 256

ALLOWED_EXT = {".jpg", ".jpeg", ".png", ".tif", ".tiff", ".bmp", ".webp"}

EXIFTOOL_BIN_CANDIDATES = [
    "/opt/homebrew/bin/exiftool",
    "/usr/local/bin/exiftool",
    "exiftool"
]

def ensure_dirs():
    for p in (UPLOADS_DIR, OUTPUT_DIR, TMP_DIR): p.mkdir(parents=True, exist_ok=True)

def find_exiftool() -> Optional[str]:
    for cand in EXIFTOOL_BIN_CANDIDATES:
        try:
            subprocess.run([cand, "-ver"], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            return cand
        except Exception:
            continue
    return None

EXIFTOOL = find_exiftool()

def web_safe_slug(text: str) -> str:
    text = unicodedata.normalize("NFKD", text)
    text = text.encode("ascii", "ignore").decode("ascii")
    text = text.lower()
    allowed = "-_."
    slug = "".join(c if c.isalnum() or c in allowed or c == " " else "-" for c in text)
    slug = slug.replace(" ", "-")
    while "--" in slug: slug = slug.replace("--", "-")
    slug = slug.strip("._-")
    return slug or "image"

def unique_stem(stem: str, folder: pathlib.Path) -> str:
    n, candidate = 1, stem
    while any((folder / f"{candidate}{suffix}.webp").exists() for suffix in ("", "-512w", "-256w")):
        n += 1
        candidate = f"{stem}-{n}"
    return candidate

def wait_for_stable(path: pathlib.Path, checks: int = 3, interval: float = 0.5) -> bool:
    last, stable = -1, 0
    for _ in range(checks * 8):
        try: sz = path.stat().st_size
        except FileNotFoundError: return False
        if sz == last and sz > 0:
            stable += 1
            if stable >= checks: return True
        else:
            stable, last = 0, sz
        time.sleep(interval)
    return False

def read_image_dimensions(path: pathlib.Path) -> Optional[tuple[int, int]]:
    try:
        with Image.open(path) as im:
            im.load(); return im.size
    except Exception:
        return None

def embed_invisible_watermark(src_path: pathlib.Path, out_path: pathlib.Path):
    bwm = WaterMark(password_wm=WM_PASS_WM, password_img=WM_PASS_IMG)
    bwm.read_img(str(src_path))
    bwm.read_wm(WM_TEXT, mode='str')
    bwm.embed(str(out_path))

def add_visible_watermark(src_path: pathlib.Path, out_path: pathlib.Path):
    """Add a visible copyright watermark to the bottom-left corner of the image.
    
    Uses a semi-transparent approach with both shadow and outline effects
    to ensure readability on any background (black, white, or noisy).
    """
    with Image.open(src_path) as im:
        im.load()
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGBA")
        else:
            im = im.convert("RGBA")
        
        # Create a transparent overlay for drawing
        overlay = Image.new("RGBA", im.size, (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)
        
        # Watermark text
        current_year = datetime.now().year
        watermark_text = f"© {current_year} Justin O'Brien"
        
        # Calculate font size based on image dimensions (aim for ~1.5% of image width)
        base_font_size = max(12, int(im.width * 0.015))
        
        # Try to load a good font, fall back to default if not available
        font = None
        font_candidates = [
            "/System/Library/Fonts/Helvetica.ttc",  # macOS
            "/System/Library/Fonts/Arial.ttf",      # macOS
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",  # Linux
            "/Windows/Fonts/arial.ttf",             # Windows
        ]
        
        for font_path in font_candidates:
            try:
                if pathlib.Path(font_path).exists():
                    font = ImageFont.truetype(font_path, base_font_size)
                    break
            except Exception:
                continue
        
        # Fall back to default font if no TrueType font found
        if font is None:
            try:
                font = ImageFont.load_default()
            except Exception:
                font = ImageFont.load_default()
        
        # Get text dimensions
        bbox = draw.textbbox((0, 0), watermark_text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        # Position: bottom-left with some margin
        margin = max(10, int(im.width * 0.01))  # 1% margin or minimum 10px
        x = margin
        y = im.height - text_height - margin
        
        # Draw shadow/outline effect for better visibility
        # This creates a subtle dark outline that helps on light backgrounds
        shadow_offset = max(1, int(base_font_size * 0.05))
        outline_color = (0, 0, 0, 128)  # Semi-transparent black
        
        # Draw outline by drawing text in multiple positions
        for dx in [-shadow_offset, 0, shadow_offset]:
            for dy in [-shadow_offset, 0, shadow_offset]:
                if dx != 0 or dy != 0:  # Skip the center position
                    draw.text((x + dx, y + dy), watermark_text, 
                             font=font, fill=outline_color)
        
        # Draw the main text in semi-transparent white
        main_color = (255, 255, 255, 128)  # Semi-transparent white
        draw.text((x, y), watermark_text, font=font, fill=main_color)
        
        # Composite the overlay onto the original image
        watermarked = Image.alpha_composite(im, overlay)
        
        # Convert back to RGB if needed (for JPEG compatibility)
        if watermarked.mode == "RGBA":
            # Create white background for final image
            final_im = Image.new("RGB", watermarked.size, (255, 255, 255))
            final_im.paste(watermarked, mask=watermarked.split()[-1])  # Use alpha channel as mask
            watermarked = final_im
        
        # Save the watermarked image
        out_path.parent.mkdir(parents=True, exist_ok=True)
        watermarked.save(out_path, format="PNG", compress_level=6)

def to_webp(in_path: pathlib.Path, out_path: pathlib.Path, quality: int):
    with Image.open(in_path) as im:
        im.load()
        if im.mode not in ("RGB", "RGBA"): im = im.convert("RGB")
        out_path.parent.mkdir(parents=True, exist_ok=True)
        im.save(out_path, format="WEBP", quality=quality, method=6)

def resize_to_width(in_path: pathlib.Path, out_path: pathlib.Path, width: int, quality: int):
    with Image.open(in_path) as im:
        im.load()
        w, h = im.size
        if w <= width:
            to_webp(in_path, out_path, quality=quality); return
        new_h = int(h * (width / float(w)))
        # Pillow changed constants location across versions; look them up dynamically.
        resample_filter = (
            getattr(Image, "LANCZOS", None)
            or getattr(getattr(Image, "Resampling", object()), "LANCZOS", None)
            or getattr(Image, "BICUBIC", None)
            or getattr(Image, "NEAREST", 0)
        )
        im = im.resize((width, new_h), resample=resample_filter)
        if im.mode not in ("RGB", "RGBA"): im = im.convert("RGB")
        out_path.parent.mkdir(parents=True, exist_ok=True)
        im.save(out_path, format="WEBP", quality=quality, method=6)

def write_xmp_webp(webp_path: pathlib.Path):
    if not EXIFTOOL:
        print("Warning: exiftool not found; skipping XMP write.", file=sys.stderr); return
    xmp_cmd = [
        EXIFTOOL, "-overwrite_original",
        f"-XMP-dc:creator={AUTHOR}",
        f"-XMP-dc:rights={RIGHTS_TEXT}",
        "-XMP-xmpRights:Marked=True",
        f"-XMP-xmpRights:WebStatement={RIGHTS_URL}",
        str(webp_path)
    ]
    subprocess.run(xmp_cmd, check=True)

def normalise_to_png(src_file: pathlib.Path, tmp_dest: pathlib.Path):
    with Image.open(src_file) as im:
        im.load()
        if im.mode not in ("RGB", "RGBA"): im = im.convert("RGB")
        tmp_dest.parent.mkdir(parents=True, exist_ok=True)
        im.save(tmp_dest, format="PNG", compress_level=6)

def process_image(src_file: pathlib.Path):
    if src_file.suffix.lower() not in ALLOWED_EXT: 
        print(f"Skip (ext): {src_file.name}"); return
    if not wait_for_stable(src_file):
        print(f"File not stable: {src_file}"); return
    if not read_image_dimensions(src_file):
        print(f"Unreadable image: {src_file}"); return

    stem = unique_stem(web_safe_slug(src_file.stem), OUTPUT_DIR)
    tmp_src = TMP_DIR / f"{stem}-src.png"
    tmp_wm  = TMP_DIR / f"{stem}-wm.png"
    tmp_visible = TMP_DIR / f"{stem}-visible.png"

    try: normalise_to_png(src_file, tmp_src)
    except Exception as e:
        print(f"Normalise failed: {e}", file=sys.stderr); return

    try: embed_invisible_watermark(tmp_src, tmp_wm)
    except Exception as e:
        print(f"Watermark failed (continuing): {e}", file=sys.stderr)
        shutil.copy2(tmp_src, tmp_wm)

    try: add_visible_watermark(tmp_wm, tmp_visible)
    except Exception as e:
        print(f"Visible watermark failed (continuing): {e}", file=sys.stderr)
        shutil.copy2(tmp_wm, tmp_visible)

    out_full  = OUTPUT_DIR / f"{stem}.webp"
    out_512   = OUTPUT_DIR / f"{stem}-512w.webp"
    out_thumb = OUTPUT_DIR / f"{stem}-256w.webp"

    try:
        to_webp(tmp_visible, out_full, quality=WEBP_QUALITY_ORIGINAL)
        resize_to_width(tmp_visible, out_512, width=RESIZED_WIDTH, quality=WEBP_QUALITY_RESIZED)
        resize_to_width(tmp_visible, out_thumb, width=THUMB_WIDTH,  quality=WEBP_QUALITY_RESIZED)
    except Exception as e:
        print(f"WebP write failed: {e}", file=sys.stderr); return

    try:
        write_xmp_webp(out_full); write_xmp_webp(out_512); write_xmp_webp(out_thumb)
    except subprocess.CalledProcessError as e:
        print(f"ExifTool failed: {e}", file=sys.stderr)

    manifest = {
        "source": str(src_file),
        "outputs": [str(out_full), str(out_512), str(out_thumb)],
        "author": AUTHOR, "rights": RIGHTS_TEXT, "rights_url": RIGHTS_URL,
        "created_at": datetime.now().isoformat(timespec="seconds")
    }
    with open(OUTPUT_DIR / f"{stem}.json", "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    for p in (tmp_src, tmp_wm, tmp_visible):
        try: p.unlink()
        except Exception: pass

    print(f"✔ {src_file.name} → {out_full.name}, {out_512.name}, {out_thumb.name}")

class NewImageHandler(FileSystemEventHandler):
    def on_created(self, event):
        if isinstance(event, FileCreatedEvent):
            p = pathlib.Path(event.src_path)
            if p.is_file(): process_image(p)
    def on_modified(self, event):
        if isinstance(event, FileModifiedEvent):
            p = pathlib.Path(event.src_path)
            if p.is_file():
                stem = web_safe_slug(p.stem)
                if not (OUTPUT_DIR / f"{stem}.webp").exists():
                    process_image(p)

def main():
    if find_exiftool() is None:
        print("Warning: exiftool not found. Install via Homebrew.", file=sys.stderr)
    ensure_dirs()
    observer = Observer()
    handler = NewImageHandler()
    observer.schedule(handler, path=str(UPLOADS_DIR), recursive=False)
    observer.start()
    print(f"Watching '{UPLOADS_DIR}'. Output → '{OUTPUT_DIR}'. Ctrl+C to stop.")
    try:
        while True: time.sleep(1.0)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

if __name__ == "__main__":
    main()