# Quick Reference

## Start local server

```bash
./start-dev.sh
```

Open `http://127.0.0.1:4000`.

## Create a new post

```bash
./bin/new-post.sh "Your Post Title"
```

This creates `_posts/YYYY-MM-DD-your-post-title.md`.

## Add an image

Store image in:

`assets/images/posts/<post-folder>/<image-file>`

Use in post:

```markdown
![Alt text](/assets/images/posts/<post-folder>/<image-file>)
```

## Publish

```bash
git add .
git commit -m "Add post: your title"
git push
```
