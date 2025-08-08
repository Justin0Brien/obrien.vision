# Jekyll Admin Configuration Guide

## ✅ Jekyll Admin Features Enabled

Your Jekyll Admin installation now has all relevant features enabled for comprehensive site management through the web interface.

### 🌐 Access URLs

**Local machine:**
- Main site: `http://localhost:4000`
- Admin interface: `http://localhost:4000/admin`

**From other devices on your network:**
- Main site: `http://192.168.1.226:4000`
- Admin interface: `http://192.168.1.226:4000/admin`

### 📋 Available Features

#### 1. **Posts Management** (`/admin/posts`)
- ✅ Create, edit, and delete blog posts
- ✅ Full markdown editor with preview
- ✅ Frontmatter editing (title, date, categories, tags, etc.)
- ✅ Draft management (view and edit drafts)
- ✅ Category and tag management
- ✅ SEO fields (excerpt, meta description)

#### 2. **Pages Management** (`/admin/pages`)
- ✅ Edit static pages (about.md, contact.md, etc.)
- ✅ Create new pages
- ✅ Full frontmatter support
- ✅ Markdown editing with preview

#### 3. **Projects Collection** (`/admin/collections/projects`)
- ✅ Manage portfolio projects
- ✅ Project metadata (technologies, status, links)
- ✅ Featured project settings
- ✅ Demo and repository links

#### 4. **Static Files** (`/admin/staticfiles`)
- ✅ Upload and manage images
- ✅ Organize assets in folders
- ✅ File type restrictions: jpg, jpeg, png, gif, pdf, svg, webp
- ✅ 10MB file size limit
- ✅ Default upload path: `/assets/images/uploads`

#### 5. **Data Files** (`/admin/datafiles`)
- ✅ Edit YAML data files
- ✅ Site navigation (`_data/navigation.yml`)
- ✅ Author information (`_data/author.yml`)
- ✅ Site settings (`_data/settings.yml`)

#### 6. **Configuration** (`/admin/configuration`)
- ✅ Edit `_config.yml` through web interface
- ✅ Modify site settings, plugins, collections
- ✅ Update Jekyll Admin settings

### 📁 Directory Structure Created

```
_data/
├── navigation.yml    # Site navigation menus
├── author.yml        # Author information and social links
└── settings.yml      # Site-wide settings and preferences

_projects/
└── employment-dashboard.md  # Example project

_layouts/
└── project.html      # Layout for project pages

assets/images/uploads/ # Default upload directory for admin
```

### 🔧 Configuration Details

#### File Upload Settings
- **Allowed types**: JPG, JPEG, PNG, GIF, PDF, SVG, WebP
- **Max file size**: 10MB
- **Upload path**: `/assets/images/uploads`

#### Editor Features
- **Preview**: Real-time markdown preview
- **Toolbar**: Rich text editing tools
- **Drafts**: Full draft support

#### Security
- **Network access**: Local network only (192.168.1.x)
- **Authentication**: None (local development environment)

### 💡 Usage Tips

1. **Creating Posts**: Use the Posts section to create new blog posts with proper frontmatter
2. **Image Management**: Upload images through Static Files, then reference them in posts
3. **Data Management**: Use Data Files to manage site navigation, author bio, and settings
4. **Project Portfolio**: Add new projects through the Collections section
5. **Configuration**: Modify site settings through the Configuration section

### 🚀 Workflow Examples

#### Adding a New Blog Post
1. Go to `/admin/posts`
2. Click "New Post"
3. Add title, content, categories, and tags
4. Upload featured image through Static Files
5. Reference image in post frontmatter
6. Publish or save as draft

#### Managing Site Navigation
1. Go to `/admin/datafiles`
2. Edit `navigation.yml`
3. Add/remove menu items
4. Save changes

#### Adding a Project
1. Go to `/admin/collections/projects`
2. Click "New Document"
3. Fill in project details, technologies, links
4. Add project description in markdown
5. Set featured status if desired

### 🔄 Restarting the Server

If you make configuration changes, restart Jekyll:
```bash
cd /Users/justin/Documents/map/obrien.vision
bundle exec jekyll serve --host=0.0.0.0 --port=4000
```

### 📱 Mobile Access

The admin interface is mobile-friendly and can be accessed from tablets and smartphones on your local network for quick content updates on the go.

---

**Status**: ✅ All features enabled and ready for use  
**Last updated**: August 8, 2025
