// ==========================================
// CATALOGUE HUB: SEARCH, FILTER & SORT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const bookGrid = document.querySelector('.book-grid');

  // Guard clause: only run this block on catalogue.html
  if (!bookGrid) return;

  // DOM Elements
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  const priceSelect = document.getElementById('price-filter');
  const resultsCount = document.getElementById('results-count');
  const noResultsBox = document.getElementById('no-results');
  const clearFiltersBtn = document.getElementById('clear-filters-btn');

  // Cards (class is book-item) + remember original order for "Featured" sort
  const bookCards = Array.from(document.querySelectorAll('.book-item'));
  bookCards.forEach((card, i) => { card.dataset.index = i; });

  // Filter checkboxes (matched by the classes in catalogue.html)
  const genreInputs = document.querySelectorAll('.genre-filter');
  const conditionInputs = document.querySelectorAll('.condition-filter');

  // 1. Stop the search form from reloading the page
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      filterAndSortBooks();
    });
  }

  // 2. Live event listeners
  if (searchInput) searchInput.addEventListener('input', filterAndSortBooks);
  if (sortSelect) sortSelect.addEventListener('change', filterAndSortBooks);
  if (priceSelect) priceSelect.addEventListener('change', filterAndSortBooks);

  [...genreInputs, ...conditionInputs].forEach(input => {
    input.addEventListener('change', filterAndSortBooks);
  });

  if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', resetAllFilters);

  // 3. Core filter + sort
  function filterAndSortBooks() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedGenres = getCheckedValues(genreInputs);
    const selectedConditions = getCheckedValues(conditionInputs);
    const selectedPrice = priceSelect ? priceSelect.value : 'all';

    let visibleCount = 0;

    bookCards.forEach(card => {
      const title = (card.dataset.title || '').toLowerCase();
      const author = (card.dataset.author || '').toLowerCase();
      const price = parseFloat(card.dataset.price || '0');

      // Split genres into whole words so "fiction" never matches "non-fiction"
      const cardGenres = (card.dataset.genre || '').toLowerCase().split(/\s+/);
      const cardCondition = (card.dataset.condition || '').toLowerCase().trim();

      const matchesSearch = !query || title.includes(query) || author.includes(query);
      const matchesGenre = selectedGenres.length === 0 || selectedGenres.some(g => cardGenres.includes(g));
      const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(cardCondition);
      const matchesPrice = checkPriceRange(price, selectedPrice);

      const show = matchesSearch && matchesGenre && matchesCondition && matchesPrice;
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    sortCards();
    updateUserFeedback(visibleCount);
  }

  // Helper: checked checkbox values
  function getCheckedValues(nodeList) {
    return Array.from(nodeList)
      .filter(cb => cb.checked)
      .map(cb => cb.value.toLowerCase().trim());
  }

  // Helper: price range check (values match the #price-filter options)
  function checkPriceRange(price, rangeValue) {
    switch (rangeValue) {
      case 'under-100': return price < 100;
      case '100-149':   return price >= 100 && price <= 149;
      case '150-249':   return price >= 150 && price <= 249;
      case '250-plus':  return price >= 250;
      default:          return true; // "all"
    }
  }

  // Helper: sort every card, then re-append in order (hidden ones stay hidden)
  function sortCards() {
    if (!sortSelect) return;
    const sortValue = sortSelect.value;

    const sorted = [...bookCards].sort((a, b) => {
      const priceA = parseFloat(a.dataset.price || '0');
      const priceB = parseFloat(b.dataset.price || '0');
      const titleA = (a.dataset.title || '').toLowerCase();
      const titleB = (b.dataset.title || '').toLowerCase();

      if (sortValue === 'price-low') return priceA - priceB;
      if (sortValue === 'price-high') return priceB - priceA;
      if (sortValue === 'title-az') return titleA.localeCompare(titleB);
      return a.dataset.index - b.dataset.index; // Featured = original order
    });

    sorted.forEach(card => bookGrid.appendChild(card));
  }

  // Helper: results counter + empty state
  function updateUserFeedback(count) {
    if (resultsCount) {
      resultsCount.textContent = `Showing ${count} of ${bookCards.length} books`;
    }
    if (noResultsBox) {
      noResultsBox.style.display = count === 0 ? 'block' : 'none';
    }
  }

  // Helper: reset everything
  function resetAllFilters() {
    if (searchInput) searchInput.value = '';
    if (sortSelect) sortSelect.value = 'default';
    if (priceSelect) priceSelect.value = 'all';

    [...genreInputs, ...conditionInputs].forEach(input => { input.checked = false; });

    filterAndSortBooks();
  }

  // Run once on load so the counter shows straight away
  filterAndSortBooks();
});