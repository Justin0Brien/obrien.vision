#!/usr/bin/env python3
"""
Simple development server for the Jekyll site.
This serves the site files directly without Jekyll processing.
"""

import http.server
import socketserver
import os
import sys
import webbrowser
from pathlib import Path

def serve_site(port=4000):
    """Serve the Jekyll site on the specified port."""
    
    # Get the directory where this script is located
    site_dir = Path(__file__).parent
    
    # Change to the site directory
    os.chdir(site_dir)
    
    # Create a simple HTTP server
    handler = http.server.SimpleHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", port), handler) as httpd:
            print(f"Serving Jekyll site at http://localhost:{port}")
            print(f"Site directory: {site_dir.absolute()}")
            print("Press Ctrl+C to stop the server")
            print()
            print("Note: This is a simple file server. Jekyll templating won't work,")
            print("but you can preview your static HTML files.")
            print()
            
            # Try to open the browser
            try:
                webbrowser.open(f"http://localhost:{port}")
            except:
                pass
            
            # Start serving
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\nServer stopped.")
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"Port {port} is already in use. Try a different port:")
            print(f"python serve.py {port + 1}")
        else:
            print(f"Error starting server: {e}")

if __name__ == "__main__":
    port = 4000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("Invalid port number. Using default port 4000.")
    
    serve_site(port)
