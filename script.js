const formInput = document.getElementById('product-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results');

const PRODUCTS = [
  {
    name: 'iphone 14',
    display: 'Apple iPhone 14',
    category: 'mobile',
    tags: ['mobile', 'phone', 'smartphone', 'apple'],
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
    name: 'samsung galaxy s23',
    display: 'Samsung Galaxy S23',
    category: 'mobile',
    tags: ['mobile', 'phone', 'smartphone', 'samsung'],
    amazon: {
      price: '₹69,999',
      rating: '4.5 / 5',
      reviews: '9,700 ratings',
      deals: '₹8,000 instant discount',
      url: 'https://www.amazon.in/dp/B0BDJXJZ5H'
    },
    flipkart: {
      price: '₹68,999',
      rating: '4.4 / 5',
      reviews: '7,810 ratings',
      deals: 'No-cost EMI',
      url: 'https://www.flipkart.com/samsung-galaxy-s23'
    }
  },
  {
    name: 'oneplus 11',
    display: 'OnePlus 11',
    category: 'mobile',
    tags: ['mobile', 'phone', 'smartphone', 'oneplus'],
    amazon: {
      price: '₹54,999',
      rating: '4.4 / 5',
      reviews: '8,020 ratings',
      deals: 'Bank offer up to 10%',
      url: 'https://www.amazon.in/dp/B0B1M2NQTH'
    },
    flipkart: {
      price: '₹52,999',
      rating: '4.3 / 5',
      reviews: '6,340 ratings',
      deals: 'Exchange offer available',
      url: 'https://www.flipkart.com/oneplus-11'
    }
  },
  {
    name: 'redmi note 13',
    display: 'Xiaomi Redmi Note 13',
    category: 'mobile',
    tags: ['mobile', 'phone', 'smartphone', 'xiaomi'],
    amazon: {
      price: '₹15,999',
      rating: '4.2 / 5',
      reviews: '17,500 ratings',
      deals: 'Bundle offer with case',
      url: 'https://www.amazon.in/dp/B0BZ9F5ZN4'
    },
    flipkart: {
      price: '₹14,999',
      rating: '4.1 / 5',
      reviews: '13,450 ratings',
      deals: '₹1,000 discount with SBI Card',
      url: 'https://www.flipkart.com/redmi-note-13'
    }
  },
  {
    name: 'realme narzo 70',
    display: 'Realme Narzo 70',
    category: 'mobile',
    tags: ['mobile', 'phone', 'smartphone', 'realme'],
    amazon: {
      price: '₹11,999',
      rating: '4.1 / 5',
      reviews: '11,200 ratings',
      deals: 'Free screen protector',
      url: 'https://www.amazon.in/dp/B0C1R8R6QD'
    },
    flipkart: {
      price: '₹10,999',
      rating: '4.0 / 5',
      reviews: '8,400 ratings',
      deals: '10% off with ICICI card',
      url: 'https://www.flipkart.com/realme-narzo-70'
    }
  },
  {
    name: 'poco x6 pro',
    display: 'POCO X6 Pro',
    category: 'mobile',
    tags: ['mobile', 'phone', 'smartphone', 'poco'],
    amazon: {
      price: '₹17,499',
      rating: '4.2 / 5',
      reviews: '7,100 ratings',
      deals: 'Exchange offer up to ₹15,000',
      url: 'https://www.amazon.in/dp/B0BYCVCDX8'
    },
    flipkart: {
      price: '₹16,999',
      rating: '4.1 / 5',
      reviews: '5,600 ratings',
      deals: 'Free delivery',
      url: 'https://www.flipkart.com/poco-x6-pro'
    }
  },
  {
    name: 'vivo v29',
    display: 'vivo V29',
    category: 'mobile',
    tags: ['mobile', 'phone', 'smartphone', 'vivo'],
    amazon: {
      price: '₹24,999',
      rating: '4.3 / 5',
      reviews: '6,720 ratings',
      deals: 'Extra 5% off with bank cards',
      url: 'https://www.amazon.in/dp/B0B4XC9H8T'
    },
    flipkart: {
      price: '₹23,999',
      rating: '4.2 / 5',
      reviews: '5,900 ratings',
      deals: 'No-cost EMI available',
      url: 'https://www.flipkart.com/vivo-v29'
    }
  },
  {
    name: 'oppo reno 11',
    display: 'OPPO Reno 11',
    category: 'mobile',
    tags: ['mobile', 'phone', 'smartphone', 'oppo'],
    amazon: {
      price: '₹21,999',
      rating: '4.2 / 5',
      reviews: '8,300 ratings',
      deals: '₹1,000 instant discount',
      url: 'https://www.amazon.in/dp/B0B5N2J8TF'
    },
    flipkart: {
      price: '₹20,999',
      rating: '4.1 / 5',
      reviews: '6,900 ratings',
      deals: 'Bank offer up to 10%',
      url: 'https://www.flipkart.com/oppo-reno-11'
    }
  },
  {
    name: 'google pixel 8',
    display: 'Google Pixel 8',
    category: 'mobile',
    tags: ['mobile', 'phone', 'smartphone', 'google'],
    amazon: {
      price: '₹69,999',
      rating: '4.5 / 5',
      reviews: '4,200 ratings',
      deals: 'No-cost EMI available',
      url: 'https://www.amazon.in/dp/B0CCQ4FRD5'
    },
    flipkart: {
      price: '₹68,999',
      rating: '4.5 / 5',
      reviews: '3,980 ratings',
      deals: 'Exchange offer available',
      url: 'https://www.flipkart.com/google-pixel-8'
    }
  },
  {
    name: 'motorola edge 50',
    display: 'Motorola Edge 50',
    category: 'mobile',
    tags: ['mobile', 'phone', 'smartphone', 'motorola'],
    amazon: {
      price: '₹28,999',
      rating: '4.3 / 5',
      reviews: '3,750 ratings',
      deals: '₹2,000 bank discount',
      url: 'https://www.amazon.in/dp/B0BR6V1YV4'
    },
    flipkart: {
      price: '₹27,999',
      rating: '4.2 / 5',
      reviews: '3,100 ratings',
      deals: 'Flat ₹1,500 off',
      url: 'https://www.flipkart.com/motorola-edge-50'
    }
  },
  {
    name: 'noise buds earbuds',
    display: 'Noise Buds Earbuds',
    category: 'audio',
    tags: ['earbuds', 'audio', 'headphones', 'wireless'],
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
    name: 'mi band 7',
    display: 'Mi Smart Band 7',
    category: 'wearable',
    tags: ['watch', 'fitness', 'wearable', 'band'],
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
    name: 'ps5',
    display: 'Sony PlayStation 5',
    category: 'console',
    tags: ['console', 'gaming', 'playstation', 'ps5'],
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

const CATEGORY_KEYWORDS = {
  mobile: ['mobile', 'phone', 'smartphone', 'android', 'ios'],
  audio: ['earbuds', 'headphones', 'audio', 'speaker'],
  wearable: ['watch', 'band', 'fitness', 'wearable'],
  console: ['console', 'gaming', 'ps5']
};

function normalize(text) {
  return text.trim().toLowerCase();
}

function matchesProduct(product, query) {
  const normalizedQuery = normalize(query);
  const terms = [product.name, product.display, ...(product.tags || [])].map(normalize);
  return terms.some(term => term.includes(normalizedQuery));
}

function findProducts(query) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];

  const directMatches = PRODUCTS.filter(product => matchesProduct(product, normalizedQuery));
  if (directMatches.length > 0) {
    return directMatches;
  }

  const category = Object.keys(CATEGORY_KEYWORDS).find(key =>
    CATEGORY_KEYWORDS[key].some(keyword => normalizedQuery.includes(keyword))
  );

  if (category) {
    return PRODUCTS.filter(product => product.category === category).slice(0, 10);
  }

  return [];
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
      <p>${bestPrice}</p>
      <p>${bestRating}</p>
    </div>
  `;
}

function renderSingleProduct(product) {
  return `
    <div class="card result-card">
      <h2>Comparing ${product.display}</h2>
      <div class="comparison-grid">
        ${buildStoreCard('Amazon', product.amazon, 'badge-amazon')}
        ${buildStoreCard('Flipkart', product.flipkart, 'badge-flipkart')}
      </div>
      ${compareValues(product)}
    </div>
  `;
}

function renderProductList(products, query) {
  const heading = products.length === 1
    ? `<h2>Match for ${query}</h2>`
    : `<h2>Showing ${products.length} results for “${query}”</h2>`;

  const items = products.map(product => `
    <div class="card result-card">
      <h3>${product.display}</h3>
      <div class="comparison-grid">
        ${buildStoreCard('Amazon', product.amazon, 'badge-amazon')}
        ${buildStoreCard('Flipkart', product.flipkart, 'badge-flipkart')}
      </div>
      ${compareValues(product)}
    </div>
  `).join('');

  return `<div class="card info-card"><div>${heading}</div></div>${items}`;
}

function renderEmpty(query) {
  resultsContainer.innerHTML = `
    <div class="card info-card">
      <h2>No results found</h2>
      <p>We couldn't find a match for <strong>${query}</strong>. Try a broader term like <strong>mobile</strong>, <strong>earbuds</strong>, or <strong>smartwatch</strong>.</p>
    </div>
  `;
}

function handleSearch() {
  const query = formInput.value.trim();
  if (!query) {
    resultsContainer.innerHTML = `
      <div class="card info-card">
        <h2>Enter a product name to compare</h2>
        <p>Try generic terms like <strong>mobile</strong>, <strong>laptop</strong>, or <strong>earbuds</strong>.</p>
      </div>
    `;
    return;
  }

  const matches = findProducts(query);
  if (matches.length > 0) {
    resultsContainer.innerHTML = renderProductList(matches, query);
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
