#!/usr/bin/env bash
#
# new-post.sh - Create a new Jekyll blog post with proper front matter
#
# Usage:
#   ./bin/new-post.sh "My Post Title"
#   ./bin/new-post.sh "My Post Title" "optional-custom-slug"
#
# Creates a new markdown file in _posts/ with:
#   - Date-prefixed filename
#   - YAML front matter (title, date, layout)
#   - Ready for editing
#

set -euo pipefail

# -----------------------------------------------------------------------------
# Configuration
# -----------------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
POSTS_DIR="$PROJECT_ROOT/_posts"

# -----------------------------------------------------------------------------
# Functions
# -----------------------------------------------------------------------------
log_info() {
    echo "[INFO] $*"
}

log_error() {
    echo "[ERROR] $*" >&2
}

die() {
    log_error "$@"
    exit 1
}

usage() {
    cat <<EOF
Usage: $(basename "$0") "Post Title" [slug]

Creates a new Jekyll blog post in _posts/

Arguments:
  title   Required. The title of the post (quoted if contains spaces)
  slug    Optional. Custom URL slug (defaults to slugified title)

Examples:
  $(basename "$0") "My Great Post"
  $(basename "$0") "My Great Post" "custom-slug"
EOF
}

slugify() {
    # Convert to lowercase, replace spaces/underscores with hyphens, remove special chars
    echo "$1" | tr '[:upper:]' '[:lower:]' | tr ' _' '-' | sed 's/[^a-z0-9-]//g' | sed 's/--*/-/g' | sed 's/^-//' | sed 's/-$//'
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
    
    local title="$1"
    local slug="${2:-$(slugify "$title")}"
    local date
    date="$(date +%Y-%m-%d)"
    local filename="${date}-${slug}.md"
    local filepath="$POSTS_DIR/$filename"
    
    # Ensure posts directory exists
    mkdir -p "$POSTS_DIR"
    
    # Check if file already exists
    if [[ -f "$filepath" ]]; then
        die "Post already exists: $filepath"
    fi
    
    # Create the post with front matter
    cat > "$filepath" <<FRONTMATTER
---
layout: post
title: "$title"
date: $date
categories: []
tags: []
---

Write your post content here.
FRONTMATTER

    log_info "Created: $filepath"
    log_info "Edit with: code \"$filepath\""
}

main "$@"
