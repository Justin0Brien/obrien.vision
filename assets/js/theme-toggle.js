// Theme toggle functionality
(function() {
  'use strict';
  
  // Get current theme from localStorage or default to system preference
  function getCurrentTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  }
  
  // Apply theme to document
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update toggle button text - check for both button types
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      if (toggleButton.classList.contains('theme-toggle-nav')) {
        // Navigation button - just emoji
        toggleButton.textContent = theme === 'dark' ? '☀️' : '🌙';
      } else {
        // Fixed position button - emoji + text
        toggleButton.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
      }
      toggleButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }
  
  // Toggle between themes
  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  }
  
  // Initialize theme on page load
  function initTheme() {
    const currentTheme = getCurrentTheme();
    applyTheme(currentTheme);
    
    // Look for existing toggle button in navigation
    let toggleButton = document.getElementById('theme-toggle');
    if (!toggleButton) {
      // Create fallback fixed position button if nav button doesn't exist
      toggleButton = document.createElement('button');
      toggleButton.id = 'theme-toggle';
      toggleButton.className = 'theme-toggle';
      toggleButton.setAttribute('aria-label', `Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`);
      document.body.appendChild(toggleButton);
    }
    
    // Add click handler
    toggleButton.addEventListener('click', toggleTheme);
    
    // Set initial button text based on button type
    if (toggleButton.classList.contains('theme-toggle-nav')) {
      toggleButton.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    } else {
      toggleButton.textContent = currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
    }
  }
  
  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
  
  // Expose toggleTheme globally for debugging
  window.toggleTheme = toggleTheme;
})();
