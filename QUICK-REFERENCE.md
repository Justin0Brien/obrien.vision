# Quick Reference: Jekyll CMS

## ⚡ Quick Start Commands

```bash
# Start development server
# Option 1: Run Task (Cmd+Shift+P > "Tasks: Run Task" > "Serve Jekyll Site")
# Option 2: Run via terminal script
./start-dev.sh
```

## 📝 New Post Checklist

1. **Create post file:** `_posts/YYYY-MM-DD-title-with-hyphens.md`
2. **Add front matter:**

   ```yaml
   ---
   layout: default
   title: "Your Title"
   date: YYYY-MM-DD HH:MM:SS +0000
   categories: [category1, category2]
   tags: [tag1, tag2, tag3]
   author: "Justin O'Brien"
   excerpt: "Summary for previews"
   ---
   ```

3. **Create image folder:** `assets/images/posts/YYYY-MM-DD/`
4. **Write content** with proper markdown formatting
5. **Test locally** at <http://localhost:4000>
6. **Deploy:**

   ```bash
   git add .
   git commit -m "Add new post: Title"
   git push origin main
   ```

## 🖼️ Image Reference

```markdown
![Alt text](/assets/images/posts/YYYY-MM-DD/filename.png)
*Optional caption*
```

## 📚 Content Examples

### Headings

```markdown
# Post Title (automatic from front matter)
## Main Section
### Subsection
```

### Emphasis

```markdown
**Bold text**
*Italic text*
`Code or technical terms`
```

### Links

```markdown
[Link text](/page-url/)
[External link](https://example.com)
```

### Lists

```markdown
- Bullet point
- Another point

1. Numbered list
2. Second item
```

### Quotes

```markdown
> Important quote or callout
```

---

**🚀 Your site automatically updates on GitHub Pages within 2-10 minutes of pushing changes!**
