/**
 * Theme toggle functionality for obrien.vision
 * 
 * Handles light/dark theme switching with:
 *   - localStorage persistence
 *   - System preference detection (prefers-color-scheme)
 *   - Fallback button creation if not in navigation
 *   - ARIA accessibility labels
 * 
 * @module theme-toggle
 * @version 2.0.0
 */
(function() {
  'use strict';
  
  // -----------------------------------------------------------------------------
  // Configuration
  // -----------------------------------------------------------------------------
  var STORAGE_KEY = 'theme';
  var THEME_DARK = 'dark';
  var THEME_LIGHT = 'light';
  var TOGGLE_ID = 'theme-toggle';
  
  // -----------------------------------------------------------------------------
  // Logging (lightweight, disabled in production)
  // -----------------------------------------------------------------------------
  var DEBUG = false;  // Set to true for debugging
  
  function log(message, data) {
    if (DEBUG && window.console && console.log) {
      console.log('[theme-toggle] ' + message, data || '');
    }
  }
  
  function logError(message, error) {
    if (window.console && console.error) {
      console.error('[theme-toggle] ERROR: ' + message, error || '');
    }
  }
  
  // -----------------------------------------------------------------------------
  // Utility functions
  // -----------------------------------------------------------------------------
  
  /**
   * Safely get item from localStorage
   * @param {string} key - Storage key
   * @returns {string|null} Stored value or null
   */
  function safeGetStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      logError('localStorage read failed', e);
      return null;
    }
  }
  
  /**
   * Safely set item in localStorage
   * @param {string} key - Storage key
   * @param {string} value - Value to store
   */
  function safeSetStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      logError('localStorage write failed', e);
    }
  }
  
  /**
   * Check if matchMedia is supported
   * @returns {boolean}
   */
  function hasMatchMedia() {
    return typeof window.matchMedia === 'function';
  }
  
  // -----------------------------------------------------------------------------
  // Theme logic
  // -----------------------------------------------------------------------------
  
  /**
   * Get current theme from localStorage or system preference
   * @returns {string} 'dark' or 'light'
   */
  function getCurrentTheme() {
    var savedTheme = safeGetStorage(STORAGE_KEY);
    if (savedTheme === THEME_DARK || savedTheme === THEME_LIGHT) {
      log('Using saved theme', savedTheme);
      return savedTheme;
    }
    
    // Check system preference
    if (hasMatchMedia()) {
      try {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          log('Using system preference', THEME_DARK);
          return THEME_DARK;
        }
      } catch (e) {
        logError('matchMedia query failed', e);
      }
    }
    
    log('Using default theme', THEME_LIGHT);
    return THEME_LIGHT;
  }
  
  /**
   * Apply theme to document
   * @param {string} theme - 'dark' or 'light'
   */
  function applyTheme(theme) {
    // Validate theme value
    if (theme !== THEME_DARK && theme !== THEME_LIGHT) {
      logError('Invalid theme value', theme);
      theme = THEME_LIGHT;
    }
    
    // Apply to document
    if (document.documentElement) {
      document.documentElement.setAttribute('data-theme', theme);
    }
    
    // Persist preference
    safeSetStorage(STORAGE_KEY, theme);
    
    // Update toggle button
    var toggleButton = document.getElementById(TOGGLE_ID);
    if (toggleButton) {
      var isNavButton = toggleButton.classList && toggleButton.classList.contains('theme-toggle-nav');
      
      if (isNavButton) {
        // Navigation button - just emoji
        toggleButton.textContent = theme === THEME_DARK ? '☀️' : '🌙';
      } else {
        // Fixed position button - emoji + text
        toggleButton.textContent = theme === THEME_DARK ? '☀️ Light' : '🌙 Dark';
      }
      
      var oppositeTheme = theme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
      toggleButton.setAttribute('aria-label', 'Switch to ' + oppositeTheme + ' mode');
    }
    
    log('Theme applied', theme);
  }
  
  /**
   * Toggle between themes
   */
  function toggleTheme() {
    var currentTheme = getCurrentTheme();
    var newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    applyTheme(newTheme);
  }
  
  // -----------------------------------------------------------------------------
  // Initialization
  // -----------------------------------------------------------------------------
  
  /**
   * Initialize theme on page load
   */
  function initTheme() {
    log('Initializing theme toggle');
    
    var currentTheme = getCurrentTheme();
    applyTheme(currentTheme);
    
    // Look for existing toggle button in navigation
    var toggleButton = document.getElementById(TOGGLE_ID);
    
    if (!toggleButton) {
      // Create fallback fixed position button if nav button doesn't exist
      log('Creating fallback toggle button');
      toggleButton = document.createElement('button');
      toggleButton.id = TOGGLE_ID;
      toggleButton.className = 'theme-toggle';
      
      var oppositeTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
      toggleButton.setAttribute('aria-label', 'Switch to ' + oppositeTheme + ' mode');
      
      if (document.body) {
        document.body.appendChild(toggleButton);
      } else {
        logError('document.body not available for button creation');
        return;
      }
    }
    
    // Add click handler (with defensive check)
    if (toggleButton.addEventListener) {
      toggleButton.addEventListener('click', toggleTheme);
    } else if (toggleButton.attachEvent) {
      // Legacy IE support
      toggleButton.attachEvent('onclick', toggleTheme);
    }
    
    // Set initial button text based on button type
    var isNavButton = toggleButton.classList && toggleButton.classList.contains('theme-toggle-nav');
    if (isNavButton) {
      toggleButton.textContent = currentTheme === THEME_DARK ? '☀️' : '🌙';
    } else {
      toggleButton.textContent = currentTheme === THEME_DARK ? '☀️ Light' : '🌙 Dark';
    }
    
    log('Theme toggle initialized');
  }
  
  // -----------------------------------------------------------------------------
  // Event listeners
  // -----------------------------------------------------------------------------
  
  // Listen for system theme changes
  if (hasMatchMedia()) {
    try {
      var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Use addEventListener if available, otherwise addListener (older browsers)
      var handler = function(e) {
        // Only auto-switch if user hasn't manually set a preference
        if (!safeGetStorage(STORAGE_KEY)) {
          log('System theme changed', e.matches ? THEME_DARK : THEME_LIGHT);
          applyTheme(e.matches ? THEME_DARK : THEME_LIGHT);
        }
      };
      
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handler);
      } else if (mediaQuery.addListener) {
        // Deprecated but needed for older Safari
        mediaQuery.addListener(handler);
      }
    } catch (e) {
      logError('Failed to set up system theme listener', e);
    }
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
