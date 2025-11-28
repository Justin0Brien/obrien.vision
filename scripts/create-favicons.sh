#!/usr/bin/env bash
#
# create-favicons.sh - Generate favicon set from source image
#
# Usage:
#   ./scripts/create-favicons.sh source-image.png
#
# Requires:
#   - ImageMagick (convert command)
#   - optionally: optipng for optimization
#
# Outputs:
#   - favicon.ico (multi-size ICO)
#   - favicon-16x16.png
#   - favicon-32x32.png
#   - apple-touch-icon.png (180x180)
#   - android-chrome-192x192.png
#   - android-chrome-512x512.png
#

set -euo pipefail

# -----------------------------------------------------------------------------
# Configuration
# -----------------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
OUTPUT_DIR="$PROJECT_ROOT/assets/favicons"

# -----------------------------------------------------------------------------
# Functions
# -----------------------------------------------------------------------------
log_info() {
    echo "[INFO] $*"
}

log_error() {
    echo "[ERROR] $*" >&2
}

log_warn() {
    echo "[WARN] $*" >&2
}

die() {
    log_error "$@"
    exit 1
}

usage() {
    cat <<EOF
Usage: $(basename "$0") <source-image>

Generate a complete favicon set from a source image.

Arguments:
  source-image   Path to source image (PNG recommended, at least 512x512)

Requirements:
  - ImageMagick (convert command)

Output files are created in: $OUTPUT_DIR

EOF
}

check_dependencies() {
    if ! command -v convert &>/dev/null; then
        die "ImageMagick 'convert' command not found. Install with: brew install imagemagick"
    fi
    log_info "ImageMagick found: $(convert --version | head -n1)"
}

# -----------------------------------------------------------------------------
# Main
# -----------------------------------------------------------------------------
main() {
    # Check for required argument
    if [[ $# -lt 1 ]]; then
        usage
        exit 1
    fi
    
    local source_image="$1"
    
    # Validate source image
    if [[ ! -f "$source_image" ]]; then
        die "Source image not found: $source_image"
    fi
    
    # Check dependencies
    check_dependencies
    
    # Create output directory
    mkdir -p "$OUTPUT_DIR"
    log_info "Output directory: $OUTPUT_DIR"
    
    # Generate favicons
    log_info "Generating favicons from: $source_image"
    
    # Standard web favicons
    convert "$source_image" -resize 16x16 "$OUTPUT_DIR/favicon-16x16.png"
    log_info "Created: favicon-16x16.png"
    
    convert "$source_image" -resize 32x32 "$OUTPUT_DIR/favicon-32x32.png"
    log_info "Created: favicon-32x32.png"
    
    # Multi-size ICO file
    convert "$source_image" \
        \( -clone 0 -resize 16x16 \) \
        \( -clone 0 -resize 32x32 \) \
        \( -clone 0 -resize 48x48 \) \
        -delete 0 \
        "$OUTPUT_DIR/favicon.ico"
    log_info "Created: favicon.ico"
    
    # Apple Touch Icon
    convert "$source_image" -resize 180x180 "$OUTPUT_DIR/apple-touch-icon.png"
    log_info "Created: apple-touch-icon.png"
    
    # Android Chrome icons
    convert "$source_image" -resize 192x192 "$OUTPUT_DIR/android-chrome-192x192.png"
    log_info "Created: android-chrome-192x192.png"
    
    convert "$source_image" -resize 512x512 "$OUTPUT_DIR/android-chrome-512x512.png"
    log_info "Created: android-chrome-512x512.png"
    
    # Optional: optimize PNGs if optipng available
    if command -v optipng &>/dev/null; then
        log_info "Optimizing PNG files..."
        optipng -quiet "$OUTPUT_DIR"/*.png
    else
        log_warn "optipng not found - skipping PNG optimization"
    fi
    
    log_info "Done! Favicon set created in: $OUTPUT_DIR"
}

main "$@"
