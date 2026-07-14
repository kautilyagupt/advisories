const formInput = document.getElementById('product-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results');

const PRODUCTS = [
  {
    name: 'iphone 14',
    display: 'Apple iPhone 14',
    amazon: {
      price: '₹79,900',
      rating: '4.6 / 5',
      reviews: '12,345 ratings',
      deals: 'No-cost EMI available',
      url: 'https://www.amazon.in/dp/B0BDJXN4TM'
    },
    flipkart: {
      price: '₹78,499',
      rating: '4.5 / 5',
      reviews: '9,120 ratings',
      deals: 'Exchange offer up to ₹14,600',
      url: 'https://www.flipkart.com/apple-iphone-14'
    }
  },
  {
    name: 'mi band 7',
    display: 'Mi Smart Band 7',
    amazon: {
      price: '₹2,999',
      rating: '4.2 / 5',
      reviews: '24,600 ratings',
      deals: '₹500 instant discount',
      url: 'https://www.amazon.in/dp/B09ZRRJ23D'
    },
    flipkart: {
      price: '₹2,799',
      rating: '4.3 / 5',
      reviews: '18,900 ratings',
      deals: 'Bank offer up to 10%',
      url: 'https://www.flipkart.com/mi-smart-band-7'
    }
  },
  {
    name: 'noise earbuds',
    display: 'Noise Buds Earbuds',
    amazon: {
      price: '₹1,799',
      rating: '4.1 / 5',
      reviews: '15,200 ratings',
      deals: 'Flat ₹250 off',
      url: 'https://www.amazon.in/dp/B09PZY6WS4'
    },
    flipkart: {
      price: '₹1,699',
      rating: '4.0 / 5',
      reviews: '10,870 ratings',
      deals: 'Free delivery',
      url: 'https://www.flipkart.com/noise-buds-earbuds'
    }
  },
  {
    name: 'ps5',
    display: 'Sony PlayStation 5',
    amazon: {
      price: '₹49,990',
      rating: '4.8 / 5',
      reviews: '3,540 ratings',
      deals: 'EMI from ₹4,166',
      url: 'https://www.amazon.in/dp/B09P7LTGSS'
    },
    flipkart: {
      price: '₹49,990',
      rating: '4.7 / 5',
      reviews: '3,280 ratings',
      deals: 'Free installation available',
      url: 'https://www.flipkart.com/sony-ps5'
    }
  }
];

function findProduct(query) {
  const normalized = query.trim().toLowerCase();
  return PRODUCTS.find(product => product.name.includes(normalized) || product.display.toLowerCase().includes(normalized));
}

function buildStoreCard(storeName, data, badgeClass) {
  return `
    <div class="store-card">
      <div class="store-header">
        <span class="store-badge ${badgeClass}">${storeName.charAt(0)}</span>
        <div class="store-title">
          <strong>${storeName}</strong>
          <span>${data.deals}</span>
        </div>
      </div>
      <div class="metric">
        <strong>${data.price}</strong>
        <span>Price</span>
      </div>
      <div class="metric">
        <strong>${data.rating}</strong>
        <span>Rating</span>
      </div>
      <div class="metric">
        <strong>${data.reviews}</strong>
        <span>Reviews</span>
      </div>
      <div class="link-row">
        <a href="${data.url}" target="_blank" rel="noreferrer">View on ${storeName}</a>
      </div>
    </div>
  `;
}

function compareValues(product) {
  const priceAmazon = Number(product.amazon.price.replace(/[^0-9]/g, ''));
  const priceFlipkart = Number(product.flipkart.price.replace(/[^0-9]/g, ''));

  let bestPrice = 'Amazon and Flipkart have the same price.';
  if (priceAmazon < priceFlipkart) {
    bestPrice = 'Amazon is cheaper for this product.';
  } else if (priceFlipkart < priceAmazon) {
    bestPrice = 'Flipkart is cheaper for this product.';
  }

  const ratingAmazon = Number(product.amazon.rating.split(' ')[0]);
  const ratingFlipkart = Number(product.flipkart.rating.split(' ')[0]);

  let bestRating = 'Both stores have similar ratings.';
  if (ratingAmazon > ratingFlipkart) {
    bestRating = 'Amazon has a slightly higher rating.';
  } else if (ratingFlipkart > ratingAmazon) {
    bestRating = 'Flipkart has a slightly higher rating.';
  }

  return `
    <div class="summary">
      <p><strong>${bestPrice}</strong></p>
      <p><strong>${bestRating}</strong></p>
    </div>
  `;
}

function renderResult(product) {
  const productTitle = `<div class="card result-card"><h2>Comparing ${product.display}</h2><div class="comparison-grid">${buildStoreCard('Amazon', product.amazon, 'badge-amazon')}${buildStoreCard('Flipkart', product.flipkart, 'badge-flipkart')}</div>${compareValues(product)}</div>`;
  resultsContainer.innerHTML = productTitle;
}

function renderEmpty(query) {
  resultsContainer.innerHTML = `
    <div class="card info-card">
      <h2>No results found</h2>
      <p>We couldn't find a match for <strong>${query}</strong>. Try a different product such as <strong>iPhone 14</strong>, <strong>Mi Band 7</strong>, <strong>Noise Earbuds</strong>, or <strong>PS5</strong>.</p>
    </div>
  `;
}

function handleSearch() {
  const query = formInput.value.trim();
  if (!query) {
    resultsContainer.innerHTML = `
      <div class="card info-card">
        <h2>Enter a product name to compare</h2>
        <p>Try products like <strong>iPhone 14</strong>, <strong>Mi Band 7</strong>, or <strong>PS5</strong>.</p>
      </div>
    `;
    return;
  }

  const product = findProduct(query);
  if (product) {
    renderResult(product);
  } else {
    renderEmpty(query);
  }
}

searchButton.addEventListener('click', handleSearch);
formInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleSearch();
  }
});

handleSearch();
