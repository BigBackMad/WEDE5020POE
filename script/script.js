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


// ==========================================
// CATALOGUE QUICK-VIEW MODAL
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('book-modal');
  if (!modal) return; // Guard clause: only runs if the modal exists on the page

  // Modal DOM Elements
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalAuthor = document.getElementById('modal-author');
  const modalGenre = document.getElementById('modal-genre');
  const modalCondition = document.getElementById('modal-condition');
  const modalPrice = document.getElementById('modal-price');
  const modalAddCartBtn = document.getElementById('modal-add-cart-btn');

  // 1. Open the modal from "See the Book" buttons
  document.addEventListener('click', (event) => {
    const triggerBtn = event.target.closest('.quick-view-btn') || event.target.closest('.book-details button');

    if (triggerBtn) {
      const card = triggerBtn.closest('.book-card') || triggerBtn.closest('.book-item');
      if (!card) return;

      const title = card.dataset.title || card.querySelector('h3, .book-name')?.textContent || 'Book Details';
      const author = card.dataset.author || card.querySelector('.author')?.textContent || 'Little Woods Books';
      const genre = card.dataset.genre || 'General';
      const condition = card.dataset.condition || 'Good';
      const price = card.dataset.price ? `R${parseFloat(card.dataset.price).toFixed(2)}` : (card.querySelector('.price')?.textContent || 'R0.00');
      const imgSrc = card.querySelector('img')?.src || '';

      if (modalTitle) modalTitle.textContent = title;
      if (modalAuthor) modalAuthor.textContent = author.startsWith('By') ? author : `By ${author}`;
      if (modalGenre) modalGenre.textContent = `Genre: ${genre}`;
      if (modalCondition) modalCondition.textContent = condition.replace('-', ' ');
      if (modalPrice) modalPrice.textContent = price;
      if (modalImg) {
        modalImg.src = imgSrc;
        modalImg.alt = `${title} book cover`;
      }

      modal.showModal();
    }
  });

  // 2. Close handlers (close button + backdrop click)
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => modal.close());
  }

  modal.addEventListener('click', (event) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog = (
      rect.top <= event.clientY && event.clientY <= rect.bottom &&
      rect.left <= event.clientX && event.clientX <= rect.right
    );
    if (!isInDialog) modal.close();
  });

  // 3. Modal "Add to Cart" button -> saves the book to the cart
  if (modalAddCartBtn) {
    modalAddCartBtn.addEventListener('click', () => {
      const title = modalTitle.textContent;
      const price = modalPrice.textContent.replace('R', '');
      const imgSrc = modalImg.src;

      addBookToCart(title, price, imgSrc);
      modal.close();
      showToast(`Added "${title}" to your reading list!`);
    });
  }
});


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

    // 1. Recalculate card price when an add-on is ticked
    function updateCardPrice() {
      let currentTotal = basePrice;

      checkboxes.forEach(cb => {
        if (cb.checked) {
          currentTotal += parseFloat(cb.dataset.addonPrice || '0');
        }
      });

      if (priceDisplay) {
        priceDisplay.textContent = currentTotal.toFixed(2);
      }
    }

    checkboxes.forEach(cb => cb.addEventListener('change', updateCardPrice));
    updateCardPrice();

    // 2. "Add to Cart" button -> saves the bundle (with its add-on total) to the cart
    if (addCartBtn) {
      addCartBtn.addEventListener('click', () => {
        const baseTitle = card.dataset.title || card.querySelector('h2')?.textContent || 'Gift Bundle';
        const price = card.querySelector('.price-value')?.textContent || basePrice;
        const imgSrc = card.querySelector('img')?.src || '';

        // Mention add-ons in the cart item so the higher price makes sense
        const addonCount = Array.from(checkboxes).filter(cb => cb.checked).length;
        const title = addonCount > 0 ? `${baseTitle} (+${addonCount} add-on${addonCount > 1 ? 's' : ''})` : baseTitle;

        addBookToCart(title, price, imgSrc);
        showToast(`Added "${title}" to your cart!`);
      });
    }
  });
});


// ==========================================
// CONTACT PAGE FEATURES: VALIDATION, FAQ & STATUS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('reservation-form');
  const faqSection = document.querySelector('.faq-accordion');
  const statusBadge = document.getElementById('store-status-badge');

  // Guard clause: only run if contact page elements exist
  if (!contactForm && !faqSection && !statusBadge) return;

  // ------------------------------------------
  // 1. Real-Time Store Status Indicator
  // ------------------------------------------
  if (statusBadge) {
    checkStoreStatus();
  }

  function checkStoreStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Mon, ..., 6 = Sat
    const hours = now.getHours();

    // Store hours: Mon - Sat (1 to 6), 09:00 - 17:00
    const isOpenDay = day >= 1 && day <= 6;
    const isOpenHours = hours >= 9 && hours < 17;

    if (isOpenDay && isOpenHours) {
      statusBadge.textContent = 'Open Now';
      statusBadge.className = 'status-badge open';
    } else {
      statusBadge.textContent = 'Closed Now';
      statusBadge.className = 'status-badge closed';
    }
  }

  // ------------------------------------------
  // 2. Client-Side Form Validation
  // ------------------------------------------
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Stop default HTML submission

      clearFormErrors();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');
      const successBanner = document.getElementById('form-success-banner');

      let isValid = true;

      // Name
      if (!nameInput.value.trim()) {
        showFieldError(nameInput, 'name-error', 'Please enter your full name.');
        isValid = false;
      }

      // Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        showFieldError(emailInput, 'email-error', 'Please enter your email address.');
        isValid = false;
      } else if (!emailRegex.test(emailInput.value.trim())) {
        showFieldError(emailInput, 'email-error', 'Please enter a valid email format (e.g. name@domain.com).');
        isValid = false;
      }

      // Subject
      if (!subjectInput.value) {
        showFieldError(subjectInput, 'subject-error', 'Please select an inquiry type.');
        isValid = false;
      }

      // Message
      if (!messageInput.value.trim()) {
        showFieldError(messageInput, 'message-error', 'Please enter a message.');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        showFieldError(messageInput, 'message-error', 'Your message must be at least 10 characters long.');
        isValid = false;
      }

      // Valid: show success banner and reset
      if (isValid) {
        contactForm.reset();
        if (successBanner) {
          successBanner.style.display = 'block';
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }

  function showFieldError(inputEl, errorId, errorMsg) {
    inputEl.classList.add('input-error');
    const errorSpan = document.getElementById(errorId);
    if (errorSpan) {
      errorSpan.textContent = errorMsg;
    }
  }

  function clearFormErrors() {
    const errorSpans = document.querySelectorAll('.error-msg');
    const inputs = document.querySelectorAll('.input-error');
    const successBanner = document.getElementById('form-success-banner');

    errorSpans.forEach(span => span.textContent = '');
    inputs.forEach(input => input.classList.remove('input-error'));
    if (successBanner) successBanner.style.display = 'none';
  }

  // ------------------------------------------
  // 3. Interactive FAQ Accordion
  // ------------------------------------------
  if (faqSection) {
    const faqQuestions = faqSection.querySelectorAll('.faq-question');

    faqQuestions.forEach(questionBtn => {
      questionBtn.addEventListener('click', () => {
        const item = questionBtn.parentElement;
        const isOpen = item.classList.contains('is-open');

        // Close all panels
        faqSection.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('is-open');
          i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Open the clicked one if it was closed
        if (!isOpen) {
          item.classList.add('is-open');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }
});


// ==========================================
// BLOG PAGE: NEWSLETTER & LIKE COUNTERS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.getElementById('newsletter-form');

  // Any card with a data-post-id (your .review-card articles) gets a like button
  const likeCards = document.querySelectorAll('[data-post-id]');

  // Guard clause: only run on pages that have these
  if (!newsletterForm && likeCards.length === 0) return;

  // ------------------------------------------
  // 1. Like Counter (remembers likes in LocalStorage)
  // ------------------------------------------
  likeCards.forEach(card => {
    const postId = card.dataset.postId;
    const likeBtn = card.querySelector('.like-btn');
    const likeCountSpan = card.querySelector('.like-count');
    const heartIcon = card.querySelector('.heart-icon');
    const likeText = card.querySelector('.like-text');

    if (!postId || !likeBtn || !likeCountSpan) return;

    // The number written in the HTML is the starting count
    const baseCount = parseInt(likeCountSpan.textContent || '0', 10);
    const storageKey = `lw_liked_${postId}`;

    let liked = false;
    try { liked = localStorage.getItem(storageKey) === 'true'; } catch (e) { /* storage blocked */ }

    // Draw the button in its liked / not-liked state
    function render() {
      likeBtn.classList.toggle('is-liked', liked);
      likeBtn.setAttribute('aria-pressed', String(liked));
      likeCountSpan.textContent = baseCount + (liked ? 1 : 0);
      if (heartIcon) heartIcon.innerHTML = liked ? '&#9829;' : '&#9825;'; // solid / empty heart
      if (likeText) likeText.textContent = liked ? 'Liked' : 'Like';
    }

    render();

    likeBtn.addEventListener('click', () => {
      liked = !liked;
      try { localStorage.setItem(storageKey, String(liked)); } catch (e) { /* storage blocked */ }
      render();
    });
  });

  // ------------------------------------------
  // 2. Newsletter Email Validation
  // ------------------------------------------
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailInput = document.getElementById('newsletter-email');
      const errorSpan = document.getElementById('newsletter-error');
      const successBanner = document.getElementById('newsletter-success');

      // Reset states
      if (errorSpan) errorSpan.textContent = '';
      if (emailInput) emailInput.classList.remove('input-error');
      if (successBanner) successBanner.style.display = 'none';

      const emailValue = emailInput ? emailInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailValue) {
        showNewsletterError(emailInput, errorSpan, 'Please enter an email address.');
        return;
      }

      if (!emailRegex.test(emailValue)) {
        showNewsletterError(emailInput, errorSpan, 'Please enter a valid email format (e.g., name@domain.com).');
        return;
      }

      // Valid
      newsletterForm.reset();
      if (successBanner) {
        successBanner.style.display = 'block';
      }
    });
  }

  function showNewsletterError(inputEl, errorEl, message) {
    if (inputEl) inputEl.classList.add('input-error');
    if (errorEl) errorEl.textContent = message;
  }
});


// ==========================================
// HOMEPAGE: TRENDING SHELF SCROLL CONTROLS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const shelfTrack = document.getElementById('trending-shelf');
  const prevBtn = document.getElementById('prev-shelf-btn');
  const nextBtn = document.getElementById('next-shelf-btn');

  // Guard clause: only run if the trending shelf exists on index.html
  if (!shelfTrack || !prevBtn || !nextBtn) return;

  // Pick card is 170px wide + 20px gap (1.25rem) -> scroll one card at a time
  const scrollAmount = 190;

  prevBtn.addEventListener('click', () => {
    shelfTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    shelfTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
});


// ==========================================
// INTERACTIVE CART DRAWER & DELETE SYSTEM
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const clearCartBtn = document.getElementById('clear-cart-btn');
  const cartContainer = document.getElementById('cart-items-container');
  const cartTotalSpan = document.getElementById('cart-total-price');

  // Guard clause: the drawer markup has to exist on this page
  if (!cartDrawer) return;

  // Navbar Cart link opens the drawer
  document.querySelectorAll('.cart-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  });

  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartDrawer);
  if (clearCartBtn) clearCartBtn.addEventListener('click', clearEntireCart);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartDrawer.classList.contains('is-open')) closeCartDrawer();
  });

  function openCartDrawer() {
    renderCartDrawer();
    cartDrawer.classList.add('is-open');
    if (cartBackdrop) cartBackdrop.classList.add('is-open');
  }

  function closeCartDrawer() {
    cartDrawer.classList.remove('is-open');
    if (cartBackdrop) cartBackdrop.classList.remove('is-open');
  }

  // Small helper so titles with quotes/symbols can't break the HTML
  function escapeHTML(text) {
    return String(text).replace(/[&<>"']/g, ch => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
    ));
  }

  // Draw the cart items from LocalStorage
  function renderCartDrawer() {
    if (!cartContainer) return;

    const cartItems = getStoredCart();
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
      cartContainer.innerHTML = '<p class="cart-empty-msg">Your cart is currently empty.</p>';
      if (cartTotalSpan) cartTotalSpan.textContent = 'R0.00';
      return;
    }

    let grandTotal = 0;

    cartItems.forEach((item, index) => {
      const itemPrice = parseFloat(item.price || 0);
      grandTotal += itemPrice;

      const itemCard = document.createElement('div');
      itemCard.className = 'cart-item-card';
      itemCard.innerHTML = `
        <img src="${escapeHTML(item.imgSrc || 'images/book-placeholder.png')}" alt="${escapeHTML(item.title)}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-title">${escapeHTML(item.title)}</div>
          <div class="cart-item-price">R${itemPrice.toFixed(2)}</div>
        </div>
        <button type="button" class="cart-remove-btn" data-index="${index}" aria-label="Remove ${escapeHTML(item.title)}">
          🗑️
        </button>
      `;

      cartContainer.appendChild(itemCard);
    });

    if (cartTotalSpan) {
      cartTotalSpan.textContent = `R${grandTotal.toFixed(2)}`;
    }

    cartContainer.querySelectorAll('.cart-remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        deleteCartItem(parseInt(e.currentTarget.dataset.index, 10));
      });
    });
  }

  function deleteCartItem(index) {
    const cartItems = getStoredCart();
    const removedItem = cartItems[index];

    cartItems.splice(index, 1);
    saveStoredCart(cartItems);
    renderCartDrawer();

    if (removedItem) showToast(`Removed "${removedItem.title}" from your cart.`);
  }

  function clearEntireCart() {
    saveStoredCart([]);
    renderCartDrawer();
    showToast('Cleared all items from your cart.');
  }
});


// ==========================================
// GLOBAL HELPER FUNCTIONS (cart storage + toast)
// ==========================================

// Get the cart array from LocalStorage
function getStoredCart() {
  try {
    return JSON.parse(localStorage.getItem('lw_cart_items') || '[]');
  } catch (e) {
    return [];
  }
}

// Save the cart array (also refreshes the navbar badge)
function saveStoredCart(cartArray) {
  try {
    localStorage.setItem('lw_cart_items', JSON.stringify(cartArray));
  } catch (e) { /* storage blocked */ }
  updateCartBadge();
}

// Add one item to the cart
function addBookToCart(title, price, imgSrc) {
  const currentCart = getStoredCart();
  currentCart.push({
    title: title,
    price: parseFloat(price),
    imgSrc: imgSrc
  });
  saveStoredCart(currentCart);
}

// Navbar badge = number of items in the cart
function updateCartBadge() {
  const cartBadge = document.getElementById('cart-badge-count');
  if (cartBadge) {
    cartBadge.textContent = getStoredCart().length;
  }
}

// Toast notification (used by bundles, quick view, cart)
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