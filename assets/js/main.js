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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0.16,
      rootMargin: '0px 0px -5% 0px'
    });

    revealEls.forEach(el => {
      const delay = el.getAttribute('data-reveal-delay');
      if (delay) {
        el.style.setProperty('--reveal-delay', `${delay}ms`);
      }
      observer.observe(el);
    });

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
