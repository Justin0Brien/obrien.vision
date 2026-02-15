import os
import shutil

moves = {
    '2026-02-15-ames-room.md': 'ames-room.md',
    '2026-02-15-benhams-top.md': 'benhams-top.md',
    '2026-02-15-blindspot.md': 'blindspot.md',
    '2026-02-14-biological-motion.md': 'biological-motion.md'
}

src_dir = '_visualizations'
dest_dir = '_illusions'

for src_file, dest_file in moves.items():
    src_path = os.path.join(src_dir, src_file)
    dest_path = os.path.join(dest_dir, dest_file)
    
    if os.path.exists(src_path):
        with open(src_path, 'r') as f:
            content = f.read()
        
        # Update front matter (simple string replacement)
        # Note: Be careful not to replace multiple times if running repeatedly,
        # but here we are moving files so it should be one-off.
        
        if 'layout: visualization' in content:
            content = content.replace('layout: visualization', 'layout: illusion')
        
        # We need to insert properties after layout: illusion
        # Let's find where the front matter ends or just replace the layout line with multiple lines
        
        # Construct new lines to inject
        slug = dest_file.replace('.md', '')
        injections = []
        
        if 'permalink:' not in content:
            injections.append(f'permalink: /illusions/{slug}/')
        
        if 'difficulty:' not in content:
            injections.append('difficulty: "Medium"')
            
        if 'categories:' not in content:
            # We can leave categories if they exist, or add them. 
            # The prompt implies categorization.
            injections.append('categories: [visual, interactive]')
            
        replacement = 'layout: illusion\n' + '\n'.join(injections)
        content = content.replace('layout: illusion', replacement)
        
        with open(dest_path, 'w') as f:
            f.write(content)
        
        os.remove(src_path)
        print(f"Moved {src_file} to {dest_file}")
    else:
        print(f"File not found: {src_file}")

# Delete sales dashboard
dashboard_file = os.path.join(src_dir, '2024-01-15-sales-dashboard.md')
if os.path.exists(dashboard_file):
    os.remove(dashboard_file)
    print("Deleted sales dashboard")
else:
    print("Sales dashboard not found (might be already deleted)")
