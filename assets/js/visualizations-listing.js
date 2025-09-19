(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    const list = document.querySelector('[data-viz-list]');
    if (!list) return;

    const cards = Array.from(list.querySelectorAll('[data-viz-card]'));
    const searchInput = document.querySelector('[data-viz-search]');
    const filterButtons = document.querySelectorAll('[data-viz-filter]');
    const techSelect = document.querySelector('[data-viz-tech]');
    const emptyState = document.querySelector('[data-viz-empty]');
    const countEl = document.querySelector('[data-viz-count]');

    let mode = 'all';
    let searchTerm = '';
    let selectedTech = 'all';

    function applyFilters() {
      const trimmedSearch = searchTerm.trim().toLowerCase();
      let visibleCount = 0;

      cards.forEach(card => {
        const isInteractive = (card.dataset.interactive || 'false') === 'true';
        const keywords = card.dataset.keywords || '';
        const techs = (card.dataset.techs || '')
          .split(',')
          .map(str => str.trim())
          .filter(Boolean);

        const matchesMode = (
          mode === 'all' ||
          (mode === 'interactive' && isInteractive) ||
          (mode === 'static' && !isInteractive)
        );

        const matchesSearch = !trimmedSearch || keywords.indexOf(trimmedSearch) !== -1;
        const matchesTech = selectedTech === 'all' || techs.includes(selectedTech);

        const shouldShow = matchesMode && matchesSearch && matchesTech;
        card.hidden = !shouldShow;
        card.classList.toggle('is-filtered-in', shouldShow);

        if (shouldShow) {
          visibleCount += 1;
        }
      });

      if (countEl) {
        countEl.textContent = visibleCount;
      }
      if (emptyState) {
        emptyState.hidden = visibleCount !== 0;
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', function(event) {
        searchTerm = event.target.value || '';
        applyFilters();
      });
    }

    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('is-active'));
        button.classList.add('is-active');
        mode = button.dataset.vizFilter || 'all';
        applyFilters();
      });
    });

    if (techSelect) {
      techSelect.addEventListener('change', function(event) {
        selectedTech = (event.target.value || 'all').toLowerCase();
        applyFilters();
      });
    }

    applyFilters();
  });
})();
