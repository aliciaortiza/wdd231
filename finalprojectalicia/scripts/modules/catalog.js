/**
 * Catalog Module - Async data fetching and content generation (15 items)
 */
import { getFavorites, toggleFavorite, updateFavCountUI } from './favorites.js';
import { openProductModal } from './modal.js';

let allProducts = [];

export async function initCatalog() {
    const gridContainer = document.getElementById('dynamic-products-grid');
    if (!gridContainer) return; // Prevent failure on other pages without the catalog

    // Fetch API with custom robust try/catch block
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) {
            throw new Error(`HTTP Error status: ${response.status}`);
        }
        allProducts = await response.json();

        // Initialize standard counter view
        updateFavCountUI();

        // Render dynamic items (Total: 15 items inside JSON)
        renderProducts(allProducts);
        setupCategoryFilters();

    } catch (error) {
        console.error('Fatal data fetching exception caught:', error);
        gridContainer.innerHTML = `
      <p class="loading-placeholder" style="color: #CA0F25;">
        Error loading the Smokehouse catalog. Please reload or check your connection.
      </p>
    `;
    }
}

function renderProducts(productsList) {
    const gridContainer = document.getElementById('dynamic-products-grid');
    if (!gridContainer) return;

    if (productsList.length === 0) {
        gridContainer.innerHTML = `<p class="loading-placeholder">No artisanal items found matching criteria.</p>`;
        return;
    }

    const favorites = getFavorites();

    // Array methods (map, join) and template literals for dynamic HTML strings
    const cardsHTML = productsList.map(product => {
        const isFavorited = favorites.includes(product.id);
        const favClass = isFavorited ? 'favorited' : '';

        return `
      <article class="catalog-card animate-on-scroll revealed">
        <div class="card-img-wrapper">
          <img src="${product.image}" alt="Culinary smoked product image detailing ${product.name}" loading="lazy" width="400" height="250">
          <span class="card-category-badge">${product.category}</span>
          <button class="favorite-btn ${favClass}" data-id="${product.id}" aria-label="Add ${product.name} to favorites" title="Favorite">
            &#9829;
          </button>
        </div>
        <div class="card-body">
          <h3>${product.name}</h3>
          <p class="card-price">${product.price}</p>
          <p class="card-desc">${product.description}</p>
          <button class="card-details-btn" data-id="${product.id}">View Details</button>
        </div>
      </article>
    `;
    }).join('');

    gridContainer.innerHTML = cardsHTML;
    attachCardEvents();
}

function attachCardEvents() {
    // Favorite Toggles Event delegation loop
    const favButtons = document.querySelectorAll('.favorite-btn');
    favButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = btn.getAttribute('data-id');
            const isFav = toggleFavorite(productId);

            if (isFav) {
                btn.classList.add('favorited');
            } else {
                btn.classList.remove('favorited');
            }
        });
    });

    // Modal display event handlers
    const detailButtons = document.querySelectorAll('.card-details-btn');
    detailButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.getAttribute('data-id');
            const product = allProducts.find(p => p.id === productId);
            if (product) {
                openProductModal(product);
            }
        });
    });
}

function setupCategoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Manage active visual state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedCategory = btn.getAttribute('data-category');

            if (selectedCategory === 'all') {
                renderProducts(allProducts);
            } else if (selectedCategory === 'favorites') {
                const favorites = getFavorites();
                // Array filter method
                const favoriteProducts = allProducts.filter(p => favorites.includes(p.id));
                renderProducts(favoriteProducts);
            } else {
                // Array filter method
                const filtered = allProducts.filter(p => p.category === selectedCategory);
                renderProducts(filtered);
            }
        });
    });
}