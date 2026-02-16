# obrien.vision

Personal and professional website showcasing data visualizations, analysis, and insights exploring the intersection of technology, data, and human experience.

## About

This Jekyll-powered website features:

- **Interactive Visualizations**: Data-driven stories using D3.js and modern web technologies
- **Employment Analysis**: Research and insights into career transitions, job market dynamics, and economic trends
- **Blog Content**: Commentary on data visualization techniques, research findings, and industry analysis

## Featured Projects

### [Outcomes For Professionals Age 50+ After Redundancy](sankey.html)

An interactive Sankey diagram visualizing employment outcomes for professionals aged 50+ following redundancy, tracking career transitions over 24 months.

## Local Development

This project is configured for rbenv so local runs are seamless and match GitHub Pages’ constraints.

Quick start (macOS):

1) One-time bootstrap

- Install Homebrew if needed: <https://brew.sh>
- Run the project setup script:

```bash
./bin/setup
```

1) Start the dev server

Run the **Serve Jekyll Site** task in VS Code (Cmd+Shift+P > Tasks: Run Task), or from the terminal:

```bash
./start-dev.sh
```

Details:

- .ruby-version pins Ruby to 3.2.4 for this repo (rbenv auto-switches).
- Gems install to vendor/bundle (no sudo; no global pollution).
- GitHub Pages compatibility is ensured via the github-pages gem in Gemfile. If you need custom plugins, use a GitHub Actions build instead of Pages’ default.

### Python helper scripts (image pipeline)

Some asset tasks are automated with Python (e.g. `scripts/image_pipeline.py`) to watch `uploads/new` for images and emit optimized WebP + metadata into `assets/images`.

Bootstrap / update the virtual environment:

```bash
./scripts/setup_python_env.sh 3.11
```

Run the image pipeline watcher:

```bash
./scripts/run_image_pipeline.sh
```

Manual activation (alternative):

```bash
source .venv/bin/activate
python scripts/image_pipeline.py
```

Dependencies live in `requirements.txt`.

### asdf users

This repo also includes a `.tool-versions` file. If you use asdf:

```bash
asdf plugin add ruby || true
asdf install
bundle config set path 'vendor/bundle'
bundle install
./start-dev.sh
```

- Ruby (version 2.7 or higher)
- Bundler gem
- Jekyll

### Setup

1. Clone the repository
2. Install dependencies: `bundle install`
3. Run locally: `bundle exec jekyll serve`
4. Open `http://localhost:4000` in your browser

### GitHub Pages Deployment

This site is configured for GitHub Pages deployment. Simply push to the main branch and GitHub will automatically build and deploy the site.

## Content Structure

```text
├── _config.yml          # Jekyll configuration
├── _layouts/            # Page layouts
├── _posts/              # Blog posts
├── _includes/           # Reusable components
├── assets/
│   ├── css/            # Stylesheets
│   └── js/             # JavaScript files
├── index.html          # Homepage
├── about.md            # About page
├── blog.md             # Blog listing page
├── contact.md          # Contact page
└── sankey.html         # Featured Sankey visualization
```

## Technologies Used

- **Jekyll**: Static site generator
- **D3.js**: Interactive data visualizations
- **Responsive CSS**: Mobile-first design
- **GitHub Pages**: Hosting and deployment

## Data Sources

Visualizations and analysis incorporate data from:

- Office for National Statistics (ONS)
- Labour Force Survey
- Ageing Better reports
- Resolution Foundation research
- Academic and policy research publications

## License

Content and code © 2025 Justin O'Brien. All rights reserved.

Data visualizations may incorporate publicly available datasets - see individual project pages for specific attribution and sources.
