#!/bin/bash

echo "🎨 Creating favicons for obrien.vision"
echo "===================================="

# Check if ImageMagick is available
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Install with: brew install imagemagick"
    echo "💡 For now, using placeholder files..."
else
    echo "✅ ImageMagick found. Creating optimized favicons..."
    
    # Create a simple text-based icon as source
    convert -size 180x180 xc:"#6069c7" \
            -font Arial -pointsize 120 -fill white \
            -gravity center -annotate +0+0 "O" \
            assets/icons/icon-180.png
    
    # Generate various sizes
    convert assets/icons/icon-180.png -resize 32x32 favicon.ico
    convert assets/icons/icon-180.png -resize 180x180 apple-touch-icon.png
    convert assets/icons/icon-180.png -resize 180x180 apple-touch-icon-precomposed.png
    convert assets/icons/icon-180.png -resize 192x192 assets/icons/icon-192.png
    convert assets/icons/icon-180.png -resize 512x512 assets/icons/icon-512.png
    
    echo "✅ Created optimized favicon files"
fi

# Create manifest for PWA support
cat > site.webmanifest << 'EOF'
{
    "name": "obrien.vision",
    "short_name": "obrien.vision",
    "description": "Justin O'Brien - Psychology, Vision Science, and Trustworthy AI",
    "icons": [
        {
            "src": "/assets/icons/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/assets/icons/icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "theme_color": "#6069c7",
    "background_color": "#ffffff",
    "display": "minimal-ui",
    "start_url": "/"
}
EOF

echo "📱 Created site.webmanifest for PWA support"
echo "🎉 Favicon setup complete!"
echo ""
echo "To customize your favicon:"
echo "1. Replace the source icon in assets/icons/"
echo "2. Run this script again to regenerate all sizes"
echo "3. Or manually replace favicon.ico and apple-touch-icon.png"
