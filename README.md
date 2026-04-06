# obrien.vision

Personal Jekyll site for writing and consulting pages.

## Daily Workflow

### 1) Run locally

```bash
./start-dev.sh
```

Open `http://127.0.0.1:4000`.

### 2) Create a post

```bash
./bin/new-post.sh "Your Post Title"
```

This creates a dated file in `_posts/` with front matter ready to edit.

### 3) Add images

Put post images under:

`assets/images/posts/<your-post-folder>/`

Then reference in markdown as:

```markdown
![Alt text](/assets/images/posts/<your-post-folder>/<image-file>)
```

### 4) Publish

```bash
git add .
git commit -m "Add post: your title"
git push
```

## Repo Focus

- Core content: `_posts/`, `index.html`, `blog.md`, `about.md`, `contact.md`
- Theme/layout: `_layouts/`, `_includes/`, `assets/css/`, `assets/js/`
- Build config: `_config.yml`, `Gemfile`

## License

Content and code © Justin O'Brien. All rights reserved.
