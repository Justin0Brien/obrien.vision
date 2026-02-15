import os
import re

VISUALIZATIONS_DIR = "/Users/justin/code/obrien.vision/_visualizations"

def process_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # check if layout is null
    if "layout: null" not in content:
        return

    print(f"Processing {filepath}...")
    
    # split frontmatter
    parts = re.split(r"^---$", content, maxsplit=2, flags=re.MULTILINE)
    if len(parts) < 3:
        print(f"Skipping {filepath}: No valid frontmatter found.")
        return

    front_matter = parts[1]
    body_raw = parts[2]

    # Remove existing {% raw %} and {% endraw %} tags to clean up
    body_clean = body_raw.replace("{% raw %}", "").replace("{% endraw %}", "")

    # Extract content from <head> (styles, scripts)
    head_content = ""
    head_match = re.search(r"<head>(.*?)</head>", body_clean, re.DOTALL | re.IGNORECASE)
    if head_match:
        head_inner = head_match.group(1)
        # Extract scripts (src and inline)
        scripts = re.findall(r"(<script.*?>.*?</script>)", head_inner, re.DOTALL | re.IGNORECASE)
        # Extract styles
        styles = re.findall(r"(<style.*?>.*?</style>)", head_inner, re.DOTALL | re.IGNORECASE)
        # Extract links (css)
        links = re.findall(r"(<link.*?>)", head_inner, re.DOTALL | re.IGNORECASE)
        
        # Filter out common tags that might duplicate layout (title, meta charset, viewport)
        # We assume the layout handles title/meta/viewport
        
        # Combine custom head parts
        fragments = links + styles + scripts
        if fragments:
            head_content = "\n".join(fragments) + "\n"

    # Extract content from <body>
    body_content = ""
    body_match = re.search(r"<body.*?>(.*?)</body>", body_clean, re.DOTALL | re.IGNORECASE)
    if body_match:
        body_content = body_match.group(1).strip()
    else:
        # Fallback: if no body tag, maybe use entire body_clean (minus head if it was there)
        # valid for markdown files that don't have body tags
        # but these seem to be full HTML files
        # Let's try to remove everything outside body if body tags exist
        if "<body>" in body_clean:
             # Match failed but tag exists? Regex issue?
             pass
        else:
             body_content = body_clean

    # Construct new content default
    new_front_matter = front_matter.replace("layout: null", "layout: visualization")
    
    # Combine head extra + body
    new_body = head_content + body_content
    
    # Wrap in raw if it looks like it might conflict with Liquid
    # Safe bet: wrap it all in raw block, unless we specifically want liquid processing
    # The original files had {% raw %} around everything, implying they wanted NO liquid processing.
    # So we should wrap the new body content in {% raw %}...{% endraw %}
    
    final_content = f"---\n{new_front_matter}---\n{{% raw %}}\n{new_body}\n{{% endraw %}}"
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(final_content)
    print(f"Updated {filepath}")

def main():
    for filename in os.listdir(VISUALIZATIONS_DIR):
        if filename.endswith(".html") or filename.endswith(".md"):
            process_file(os.path.join(VISUALIZATIONS_DIR, filename))

if __name__ == "__main__":
    main()
