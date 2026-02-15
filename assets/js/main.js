// Main JavaScript for obrien.vision
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initRevealAnimations();
    enhanceExternalLinks();
  });

  function initRevealAnimations() {
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (!revealEls.length) return;

    const supportsMatchMedia = typeof window.matchMedia === 'function';
    const prefersReducedMotion = supportsMatchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(el => el.classList.add('is-visible'));
      return;
    }

    let observer;
    try {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.16,
        rootMargin: '0px 0px -5% 0px'
      });
    } catch (err) {
      // If the observer cannot be constructed (older browsers / polyfills), reveal immediately
      revealEls.forEach(el => el.classList.add('is-visible'));
      return;
    }

    // Safety timeout: if checking takes too long, just show content
    setTimeout(() => {
        revealEls.forEach(el => el.classList.add('is-visible'));
    }, 1000);

    revealEls.forEach(el => {
      const delay = el.getAttribute('data-reveal-delay');
      if (delay) {
        el.style.setProperty('--reveal-delay', `${delay}ms`);
      }
      observer.observe(el);
    });

    document.documentElement.classList.add('has-reveal');

    function onIntersect(entries, obs) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }
  }

  function enhanceExternalLinks() {
    document.addEventListener('click', function(event) {
      const target = event.target.closest('a[href]');
      if (!target) return;
      try {
        const url = new URL(target.href);
        if (url.origin !== window.location.origin) {
          target.setAttribute('target', '_blank');
          target.setAttribute('rel', 'noopener noreferrer');
        }
      } catch (err) {
        // Ignore malformed URLs
      }
    });
  }
})();
