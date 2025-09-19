# Content Guide

This project is a Jekyll site with a few custom collections and helper scripts. Use this quick reference to add, review, and publish content consistently.

## Collections at a glance

| Collection | Source folder | Output URL | Layout | Notes |
|------------|---------------|------------|--------|-------|
| Posts      | `_posts/`     | `/blog/...`| `post` | Standard Markdown posts with YAML front matter. |
| Projects   | `_projects/`  | `/projects/:slug/` | `project` | Featured dashboard/portfolio items. |
| Visualisations | `_visualizations/` | `/visualizations/:slug/` | `visualization` | Interactive data stories. Supports gallery images and iframe demos. |
| Illusions  | `_illusions/` | `/illusions/:slug/` | `illusion` | Optical-illusion explainers with optional iframe demos and controls. |
| Gallery    | `_gallery/`   | `/images/:slug/` | `gallery-item` | Static image showcases, typically paired with uploads in `assets/images/gallery/`. |

All collections are Markdown files with front matter. Each `layout` is responsible for the page chrome and shared UI.

## Working locally

1. **Install dependencies**:
   ```bash
   eval "$(rbenv init -)"
   bundle install
   ```
2. **Build or serve**:
   ```bash
   bundle exec jekyll build    # generates _site/
   bundle exec jekyll serve    # local preview with auto-regeneration
   ```
3. **File preview**: Opening `_site/*.html` directly with `file://` also works—the site injects a helper script so CSS/JS resolve correctly even without `jekyll serve`.

## Adding content via Markdown

1. Duplicate an existing file in the target collection.
2. Update the YAML front matter (title, permalink, dates, tags, etc.).
3. Write the body in Markdown. The layouts already inject typography and reveal animations, so keep markup simple (headings, lists, callouts).
4. Run `bundle exec jekyll build` (or `serve`) and sanity check the rendered page.

### Posts (`_posts`)
- File naming: `YYYY-MM-DD-slug.md`
- Optional front matter keys:
  - `excerpt`: overrides the automatic teaser.
  - `image` / `thumbnail`: shown in listing cards.
  - `tags`, `categories` (used on card chips).

### Visualisations (`_visualizations`)
- Supports iframe embeds (`iframe_url`, `iframe_width`, `iframe_height`).
- `gallery_images` array powers the listing thumbnail + in-page gallery.
- `technologies` array is surfaced in filters on `/visualizations/`.

### Illusions (`_illusions`)
- Optional keys: `difficulty`, `duration`, `iframe_src`, `controls` (for interactive sliders/buttons).
- Markdown body is rendered inside the explanatory section—structured headings make the explainers skimmable.

### Gallery (`_gallery`)
- Add the processed WebP assets under `assets/images/gallery/` (a 256w/512w pair + original).
- Reference the base filename in `image_filename` (e.g. `spark.webp`). The layout generates responsive variants automatically.

## Managing uploads

- Use `uploads/` for raw assets during drafting.
- Final, optimized assets live under `assets/images/`.
- For new illusions or visualisations, consider adding an entry to `_data/navigation.yml` if you want quick access in the nav.

## Quality checklist before publishing

- ✅ Run `bundle exec jekyll build` (no Liquid warnings/errors).
- ✅ Open the generated page in `_site/` to confirm typography, reveal animations, and media load correctly.
- ✅ Verify meta descriptions and titles (front matter `description` for pages, `excerpt` for posts).
- ✅ Check responsive behaviour—the layouts rely on CSS grid; narrow viewports should maintain readability.

Keep this guide alongside the other docs (`docs/`). Update it as you add new collections or workflows.
