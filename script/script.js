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


// ==========================================
// GLOBAL HEADER & NAVIGATION (runs on every page)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

  // 1. Footer year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // 2. Highlight the current page in the nav (skips the cart link)
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('header nav a:not(.cart-link)').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  // 3. Mobile hamburger menu
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const primaryNav = document.getElementById('primary-nav');

  if (hamburgerBtn && primaryNav) {
    const closeMenu = () => {
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      primaryNav.classList.remove('is-open');
    };

    hamburgerBtn.addEventListener('click', () => {
      const isOpen = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', String(!isOpen));
      primaryNav.classList.toggle('is-open');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburgerBtn.contains(e.target) && !primaryNav.contains(e.target)) closeMenu();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        closeMenu();
        hamburgerBtn.focus();
      }
    });
  }

  // 4. Cart badge
  updateCartBadge();
});

// Update the navbar cart count from localStorage
function updateCartBadge() {
  const badge = document.getElementById('cart-badge-count');
  if (!badge) return;
  let count = '0';
  try { count = localStorage.getItem('lw_cart_count') || '0'; } catch (e) { /* storage blocked */ }
  badge.textContent = count;
}

// Call this from any "Add to cart" button: incrementCartBadge();
function incrementCartBadge(amount = 1) {
  try {
    const current = parseInt(localStorage.getItem('lw_cart_count') || '0', 10);
    localStorage.setItem('lw_cart_count', String(current + amount));
  } catch (e) { /* storage blocked */ }
  updateCartBadge();
}

// ==========================================
// CATALOGUE QUICK-VIEW MODAL & TOAST SYSTEM
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('book-modal');
  if (!modal) return; // Guard clause: only runs if modal exists on catalogue.html

  // Modal DOM Elements
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalAuthor = document.getElementById('modal-author');
  const modalGenre = document.getElementById('modal-genre');
  const modalCondition = document.getElementById('modal-condition');
  const modalPrice = document.getElementById('modal-price');
  const modalAddCartBtn = document.getElementById('modal-add-cart-btn');

  let activeBookTitle = '';

  // 1. Attach Click Listener to "See the Book" Buttons on Catalogue Cards
  document.addEventListener('click', (event) => {
    const triggerBtn = event.target.closest('.quick-view-btn') || event.target.closest('.book-details button');
    
    if (triggerBtn) {
      const card = triggerBtn.closest('.book-card') || triggerBtn.closest('.book-item');
      if (!card) return;

      // Extract details from dataset and DOM elements
      const title = card.dataset.title || card.querySelector('h3, .book-name')?.textContent || 'Book Details';
      const author = card.dataset.author || card.querySelector('.author')?.textContent || 'Little Woods Books';
      const genre = card.dataset.genre || 'General';
      const condition = card.dataset.condition || 'Good';
      const price = card.dataset.price ? `R${parseFloat(card.dataset.price).toFixed(2)}` : (card.querySelector('.price')?.textContent || 'R0.00');
      const imgSrc = card.querySelector('img')?.src || '';

      activeBookTitle = title;

      // Populate Modal Fields
      if (modalTitle) modalTitle.textContent = title;
      if (modalAuthor) modalAuthor.textContent = author.startsWith('By') ? author : `By ${author}`;
      if (modalGenre) modalGenre.textContent = `Genre: ${genre}`;
      if (modalCondition) modalCondition.textContent = condition.replace('-', ' ');
      if (modalPrice) modalPrice.textContent = price;
      if (modalImg) {
        modalImg.src = imgSrc;
        modalImg.alt = `${title} book cover`;
      }

      // Open Modal natively
      modal.showModal();
    }
  });

  // 2. Close Modal Handlers (Close button & Backdrop click)
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => modal.close());
  }

  modal.addEventListener('click', (event) => {
    // Detect click on the backdrop (outside .modal-content container)
    const rect = modal.getBoundingClientRect();
    const isInDialog = (
      rect.top <= event.clientY && event.clientY <= rect.bottom &&
      rect.left <= event.clientX && event.clientX <= rect.right
    );
    if (!isInDialog) {
      modal.close();
    }
  });

  // 3. Modal "Add to Cart / Reserve" Button
  if (modalAddCartBtn) {
    modalAddCartBtn.addEventListener('click', () => {
      // Increment global cart counter badge (from Step 2 helper)
      if (typeof incrementCartBadge === 'function') {
        incrementCartBadge(1);
      }
      
      // Close modal & show toast feedback
      modal.close();
      showToast(`Added "${activeBookTitle}" to your reading list!`);
    });
  }
});

// Global Helper: Display Toast Notification
function showToast(message) {
  const toast = document.getElementById('toast-notification');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ==========================================
// GIFT BUNDLES INTERACTIVE CUSTOMIZER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const bundlesContainer = document.querySelector('.bundles-container') || document.querySelector('.bundles-page');
  if (!bundlesContainer) return; // Guard clause: runs only on bundles.html

  const bundleCards = document.querySelectorAll('.bundle-card');

  bundleCards.forEach(card => {
    const basePrice = parseFloat(card.dataset.price || '0');
    const checkboxes = card.querySelectorAll('.addon-checkbox');
    const priceDisplay = card.querySelector('.price-value');
    const addCartBtn = card.querySelector('.add-bundle-btn');

    // 1. Recalculate Card Price on Checkbox Toggle
    function updateCardPrice() {
      let currentTotal = basePrice;

      checkboxes.forEach(cb => {
        if (cb.checked) {
          const addonPrice = parseFloat(cb.dataset.addonPrice || '0');
          currentTotal += addonPrice;
        }
      });

      if (priceDisplay) {
        priceDisplay.textContent = currentTotal.toFixed(2);
      }
    }

    // Attach change listener to each checkbox
    checkboxes.forEach(cb => cb.addEventListener('change', updateCardPrice));

    // Initialize initial price
    updateCardPrice();

    // 2. Wire "Add Bundle to Cart" Button
    if (addCartBtn) {
      addCartBtn.addEventListener('click', () => {
        const title = card.dataset.title || card.querySelector('h2')?.textContent || 'Gift Bundle';
        
        // Count selected add-ons for detailed toast feedback
        const selectedAddonsCount = Array.from(checkboxes).filter(cb => cb.checked).length;
        const addonText = selectedAddonsCount > 0 ? ` with ${selectedAddonsCount} add-on(s)` : '';

        // Increment global header cart count
        if (typeof incrementCartBadge === 'function') {
          incrementCartBadge(1);
        }

        // Show confirmation toast
        if (typeof showToast === 'function') {
          showToast(`Added "${title}"${addonText} to your cart!`);
        }
      });
    }
  });
});

// ==========================================
// TOAST NOTIFICATION (used by bundles, quick view, etc.)
// ==========================================
function showToast(message, duration = 3000) {
  let toast = document.getElementById('toast');

  // Create the toast element once, reuse it after that
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toast.hideTimer);
  toast.hideTimer = setTimeout(() => toast.classList.remove('show'), duration);
}