(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    const list = document.querySelector('[data-illusion-list]');
    if (!list) return;

    const cards = Array.from(list.querySelectorAll('[data-illusion-card]'));
    const searchInput = document.querySelector('[data-illusion-search]');
    const filterButtons = document.querySelectorAll('[data-illusion-filter]');
    const emptyState = document.querySelector('[data-illusion-empty]');
    const countEl = document.querySelector('[data-illusion-count]');

    let activeDifficulty = 'all';
    let searchTerm = '';

    function applyFilters() {
      const trimmedSearch = searchTerm.trim().toLowerCase();
      let visibleCount = 0;

      cards.forEach(card => {
        const cardDifficulty = (card.dataset.difficulty || 'all').toLowerCase();
        const keywords = card.dataset.keywords || '';

        const matchesDifficulty = activeDifficulty === 'all' || cardDifficulty === activeDifficulty;
        const matchesSearch = !trimmedSearch || keywords.indexOf(trimmedSearch) !== -1;

        const shouldShow = matchesDifficulty && matchesSearch;
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
        activeDifficulty = button.dataset.illusionFilter || 'all';
        applyFilters();
      });
    });

    applyFilters();
  });
})();
