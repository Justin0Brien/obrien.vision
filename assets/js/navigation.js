/**
 * Mobile Navigation Toggle for obrien.vision
 * 
 * Handles:
 *   - Mobile hamburger menu toggle
 *   - Click-outside-to-close behavior
 *   - Escape key to close menu
 *   - Smooth scrolling for anchor links
 *   - Active navigation item highlighting
 *   - ARIA accessibility attributes
 * 
 * @module navigation
 * @version 2.0.0
 */
(function() {
  'use strict';
  
  // -----------------------------------------------------------------------------
  // Logging (lightweight, disabled in production)
  // -----------------------------------------------------------------------------
  var DEBUG = false;
  
  function log(message, data) {
    if (DEBUG && window.console && console.log) {
      console.log('[navigation] ' + message, data || '');
    }
  }
  
  function logError(message, error) {
    if (window.console && console.error) {
      console.error('[navigation] ERROR: ' + message, error || '');
    }
  }
  
  // -----------------------------------------------------------------------------
  // Utility functions
  // -----------------------------------------------------------------------------
  
  /**
   * Safely query selector with null check
   * @param {string} selector - CSS selector
   * @param {Element} [context] - Parent element (defaults to document)
   * @returns {Element|null}
   */
  function $(selector, context) {
    try {
      return (context || document).querySelector(selector);
    } catch (e) {
      logError('querySelector failed', e);
      return null;
    }
  }
  
  /**
   * Safely query all selectors
   * @param {string} selector - CSS selector
   * @param {Element} [context] - Parent element (defaults to document)
   * @returns {NodeList}
   */
  function $$(selector, context) {
    try {
      return (context || document).querySelectorAll(selector);
    } catch (e) {
      logError('querySelectorAll failed', e);
      return [];
    }
  }
  
  /**
   * Safely add event listener
   * @param {Element} element - Target element
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   */
  function addEvent(element, event, handler) {
    if (!element) return;
    
    if (element.addEventListener) {
      element.addEventListener(event, handler);
    } else if (element.attachEvent) {
      element.attachEvent('on' + event, handler);
    }
  }
  
  /**
   * Check if element has a class
   * @param {Element} element - Target element
   * @param {string} className - Class name
   * @returns {boolean}
   */
  function hasClass(element, className) {
    if (!element || !element.classList) return false;
    return element.classList.contains(className);
  }
  
  /**
   * Add class to element
   * @param {Element} element - Target element
   * @param {string} className - Class name
   */
  function addClass(element, className) {
    if (!element || !element.classList) return;
    element.classList.add(className);
  }
  
  /**
   * Remove class from element
   * @param {Element} element - Target element
   * @param {string} className - Class name
   */
  function removeClass(element, className) {
    if (!element || !element.classList) return;
    element.classList.remove(className);
  }
  
  // -----------------------------------------------------------------------------
  // Mobile menu functionality
  // -----------------------------------------------------------------------------
  
  /**
   * Close the mobile menu
   * @param {Element} navMenu - Navigation menu element
   * @param {Element} mobileToggle - Toggle button element
   */
  function closeMenu(navMenu, mobileToggle) {
    removeClass(navMenu, 'active');
    removeClass(mobileToggle, 'active');
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
    log('Menu closed');
  }
  
  /**
   * Open the mobile menu
   * @param {Element} navMenu - Navigation menu element
   * @param {Element} mobileToggle - Toggle button element
   */
  function openMenu(navMenu, mobileToggle) {
    addClass(navMenu, 'active');
    addClass(mobileToggle, 'active');
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-expanded', 'true');
    }
    log('Menu opened');
  }
  
  /**
   * Initialize mobile navigation
   */
  function initMobileNav() {
    var mobileToggle = $('.mobile-menu-toggle');
    var navMenu = $('.nav-menu');
    var navLinks = $$('.nav-link');
    
    if (!mobileToggle || !navMenu) {
      log('Mobile navigation elements not found, skipping mobile nav init');
      return;
    }
    
    log('Initializing mobile navigation');
    
    // Toggle mobile menu
    addEvent(mobileToggle, 'click', function(e) {
      e.preventDefault();
      
      if (hasClass(navMenu, 'active')) {
        closeMenu(navMenu, mobileToggle);
      } else {
        openMenu(navMenu, mobileToggle);
      }
    });
    
    // Close mobile menu when clicking nav links
    if (navLinks && navLinks.length) {
      for (var i = 0; i < navLinks.length; i++) {
        addEvent(navLinks[i], 'click', function() {
          closeMenu(navMenu, mobileToggle);
        });
      }
    }
    
    // Close mobile menu when clicking outside
    addEvent(document, 'click', function(event) {
      if (!event || !event.target) return;
      
      var isClickInsideToggle = mobileToggle.contains && mobileToggle.contains(event.target);
      var isClickInsideNav = navMenu.contains && navMenu.contains(event.target);
      
      if (!isClickInsideToggle && !isClickInsideNav && hasClass(navMenu, 'active')) {
        closeMenu(navMenu, mobileToggle);
      }
    });
    
    // Handle escape key
    addEvent(document, 'keydown', function(event) {
      var key = event.key || event.keyCode;
      var isEscape = key === 'Escape' || key === 'Esc' || key === 27;
      
      if (isEscape && hasClass(navMenu, 'active')) {
        closeMenu(navMenu, mobileToggle);
      }
    });
    
    log('Mobile navigation initialized');
  }
  
  // -----------------------------------------------------------------------------
  // Smooth scrolling
  // -----------------------------------------------------------------------------
  
  /**
   * Initialize smooth scrolling for anchor links
   */
  function initSmoothScroll() {
    var anchorLinks = $$('a[href^="#"]');
    
    if (!anchorLinks || !anchorLinks.length) {
      log('No anchor links found');
      return;
    }
    
    log('Initializing smooth scroll for ' + anchorLinks.length + ' links');
    
    var navMenu = $('.nav-menu');
    var mobileToggle = $('.mobile-menu-toggle');
    
    for (var i = 0; i < anchorLinks.length; i++) {
      addEvent(anchorLinks[i], 'click', function(e) {
        var targetId = this.getAttribute('href');
        
        if (!targetId || targetId === '#') return;
        
        var targetElement = $(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          // Use smooth scroll if supported
          if (targetElement.scrollIntoView) {
            try {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            } catch (error) {
              // Fallback for browsers that don't support options
              targetElement.scrollIntoView();
            }
          }
          
          // Close mobile menu if open
          if (hasClass(navMenu, 'active')) {
            closeMenu(navMenu, mobileToggle);
          }
        }
      });
    }
  }
  
  // -----------------------------------------------------------------------------
  // Active navigation highlighting
  // -----------------------------------------------------------------------------
  
  /**
   * Update active navigation item based on current URL
   */
  function updateActiveNavigation() {
    var currentPath;
    
    try {
      currentPath = window.location.pathname;
    } catch (e) {
      logError('Could not get current path', e);
      return;
    }
    
    var navLinks = $$('.nav-link');
    
    if (!navLinks || !navLinks.length) return;
    
    for (var i = 0; i < navLinks.length; i++) {
      var link = navLinks[i];
      var linkPath;
      
      try {
        linkPath = new URL(link.href).pathname;
      } catch (e) {
        // Fallback for older browsers
        linkPath = link.pathname || '';
      }
      
      // Remove active class from all links
      removeClass(link, 'active');
      
      // Add active class to matching link
      if (currentPath === linkPath || 
          (linkPath !== '/' && currentPath.indexOf(linkPath) === 0)) {
        addClass(link, 'active');
      }
    }
    
    log('Active navigation updated for path', currentPath);
  }
  
  // -----------------------------------------------------------------------------
  // Initialization
  // -----------------------------------------------------------------------------
  
  /**
   * Main initialization function
   */
  function init() {
    log('Initializing navigation module');
    
    initMobileNav();
    initSmoothScroll();
    updateActiveNavigation();
    
    // Update active navigation on popstate (back/forward buttons)
    addEvent(window, 'popstate', updateActiveNavigation);
    
    log('Navigation module initialized');
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    addEvent(document, 'DOMContentLoaded', init);
  } else {
    init();
  }
})();
