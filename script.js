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
    name: 'macbook air m2',
    display: 'Apple MacBook Air M2',
    category: 'laptop',
    tags: ['laptop', 'notebook', 'apple', 'macbook'],
    amazon: {
      price: '₹1,19,900',
      rating: '4.7 / 5',
      reviews: '6,100 ratings',
      deals: 'No-cost EMI available',
      url: 'https://www.amazon.in/dp/B0B3CK5D4K'
    },
    flipkart: {
      price: '₹1,18,900',
      rating: '4.7 / 5',
      reviews: '5,880 ratings',
      deals: 'Exchange offer available',
      url: 'https://www.flipkart.com/apple-macbook-air-m2'
    }
  },
  {
    name: 'dell inspiron 15',
    display: 'Dell Inspiron 15',
    category: 'laptop',
    tags: ['laptop', 'notebook', 'dell'],
    amazon: {
      price: '₹53,990',
      rating: '4.4 / 5',
      reviews: '5,200 ratings',
      deals: 'Bank offer up to 7.5%',
      url: 'https://www.amazon.in/dp/B0C7Z5Z8RM'
    },
    flipkart: {
      price: '₹52,990',
      rating: '4.3 / 5',
      reviews: '4,980 ratings',
      deals: 'No-cost EMI',
      url: 'https://www.flipkart.com/dell-inspiron-15'
    }
  },
  {
    name: 'hp pavilion gaming',
    display: 'HP Pavilion Gaming Laptop',
    category: 'laptop',
    tags: ['laptop', 'gaming', 'hp', 'notebook'],
    amazon: {
      price: '₹64,999',
      rating: '4.2 / 5',
      reviews: '3,900 ratings',
      deals: 'Free gaming mouse',
      url: 'https://www.amazon.in/dp/B0B4TX4BSJ'
    },
    flipkart: {
      price: '₹63,999',
      rating: '4.1 / 5',
      reviews: '3,620 ratings',
      deals: 'Exchange offer up to ₹12,000',
      url: 'https://www.flipkart.com/hp-pavilion-gaming'
    }
  },
  {
    name: 'sony wh-1000xm4',
    display: 'Sony WH-1000XM4 Wireless Headphones',
    category: 'audio',
    tags: ['headphones', 'audio', 'wireless', 'sony'],
    amazon: {
      price: '₹24,990',
      rating: '4.6 / 5',
      reviews: '28,700 ratings',
      deals: 'No-cost EMI available',
      url: 'https://www.amazon.in/dp/B0863TXGM3'
    },
    flipkart: {
      price: '₹24,490',
      rating: '4.6 / 5',
      reviews: '24,100 ratings',
      deals: '10% off with ICICI Bank',
      url: 'https://www.flipkart.com/sony-wh-1000xm4'
    }
  },
  {
    name: 'boat airdopes 441',
    display: 'boAt Airdopes 441',
    category: 'audio',
    tags: ['earbuds', 'audio', 'wireless', 'boat'],
    amazon: {
      price: '₹1,999',
      rating: '4.1 / 5',
      reviews: '34,500 ratings',
      deals: '₹300 off',
      url: 'https://www.amazon.in/dp/B08YXNQWQ7'
    },
    flipkart: {
      price: '₹1,899',
      rating: '4.0 / 5',
      reviews: '29,100 ratings',
      deals: 'Free delivery',
      url: 'https://www.flipkart.com/boat-airdopes-441'
    }
  },
  {
    name: 'samsung q60c',
    display: 'Samsung Q60C 4K QLED TV',
    category: 'tv',
    tags: ['tv', 'television', 'samsung', '4k'],
    amazon: {
      price: '₹76,990',
      rating: '4.3 / 5',
      reviews: '6,700 ratings',
      deals: 'Exchange offer available',
      url: 'https://www.amazon.in/dp/B0BJY9H3QK'
    },
    flipkart: {
      price: '₹75,999',
      rating: '4.2 / 5',
      reviews: '5,400 ratings',
      deals: 'No-cost EMI',
      url: 'https://www.flipkart.com/samsung-q60c-4k-tv'
    }
  },
  {
    name: 'canon eos 1500d',
    display: 'Canon EOS 1500D DSLR',
    category: 'camera',
    tags: ['camera', 'dslr', 'canon', 'photography'],
    amazon: {
      price: '₹29,990',
      rating: '4.4 / 5',
      reviews: '4,450 ratings',
      deals: 'Extra 5% off',
      url: 'https://www.amazon.in/dp/B0793WX5T2'
    },
    flipkart: {
      price: '₹28,990',
      rating: '4.3 / 5',
      reviews: '3,980 ratings',
      deals: 'Free SD card',
      url: 'https://www.flipkart.com/canon-eos-1500d'
    }
  },
  {
    name: 'philips air fryer',
    display: 'Philips Air Fryer 2.2L',
    category: 'appliance',
    tags: ['kitchen', 'appliance', 'air fryer', 'philips'],
    amazon: {
      price: '₹8,995',
      rating: '4.5 / 5',
      reviews: '10,200 ratings',
      deals: 'Bank offer available',
      url: 'https://www.amazon.in/dp/B07Y9X6M1J'
    },
    flipkart: {
      price: '₹8,499',
      rating: '4.4 / 5',
      reviews: '9,800 ratings',
      deals: 'No-cost EMI',
      url: 'https://www.flipkart.com/philips-air-fryer'
    }
  },
  {
    name: 'boat stone 145',
    display: 'boAt Stone 145 Speaker',
    category: 'audio',
    tags: ['speaker', 'audio', 'portable', 'boat'],
    amazon: {
      price: '₹1,499',
      rating: '4.2 / 5',
      reviews: '13,400 ratings',
      deals: 'Extra 5% off',
      url: 'https://www.amazon.in/dp/B08M8W6P7J'
    },
    flipkart: {
      price: '₹1,399',
      rating: '4.1 / 5',
      reviews: '11,700 ratings',
      deals: 'Free delivery',
      url: 'https://www.flipkart.com/boat-stone-145'
    }
  },
  {
    name: 'samsung galaxy watch 5',
    display: 'Samsung Galaxy Watch 5',
    category: 'wearable',
    tags: ['watch', 'wearable', 'samsung', 'fitness'],
    amazon: {
      price: '₹23,999',
      rating: '4.4 / 5',
      reviews: '5,120 ratings',
      deals: 'Exchange offer available',
      url: 'https://www.amazon.in/dp/B0B5N2P5M6'
    },
    flipkart: {
      price: '₹22,999',
      rating: '4.3 / 5',
      reviews: '4,520 ratings',
      deals: 'No-cost EMI',
      url: 'https://www.flipkart.com/samsung-galaxy-watch-5'
    }
  },
  {
    name: 'amazfit gtr 4',
    display: 'Amazfit GTR 4',
    category: 'wearable',
    tags: ['watch', 'wearable', 'smartwatch', 'fitness'],
    amazon: {
      price: '₹13,999',
      rating: '4.2 / 5',
      reviews: '6,400 ratings',
      deals: '₹500 off',
      url: 'https://www.amazon.in/dp/B09RXPV9WN'
    },
    flipkart: {
      price: '₹13,499',
      rating: '4.1 / 5',
      reviews: '5,900 ratings',
      deals: 'Free delivery',
      url: 'https://www.flipkart.com/amazfit-gtr-4'
    }
  },
  {
    name: 'xbox series s',
    display: 'Microsoft Xbox Series S',
    category: 'console',
    tags: ['console', 'gaming', 'xbox', 'game'],
    amazon: {
      price: '₹34,990',
      rating: '4.6 / 5',
      reviews: '2,890 ratings',
      deals: 'EMI from ₹2,916',
      url: 'https://www.amazon.in/dp/B09V4Z6RZ9'
    },
    flipkart: {
      price: '₹34,990',
      rating: '4.5 / 5',
      reviews: '2,420 ratings',
      deals: 'Free delivery',
      url: 'https://www.flipkart.com/microsoft-xbox-series-s'
    }
  },
  {
    name: 'nintendo switch',
    display: 'Nintendo Switch',
    category: 'console',
    tags: ['console', 'gaming', 'nintendo', 'switch'],
    amazon: {
      price: '₹34,999',
      rating: '4.7 / 5',
      reviews: '2,600 ratings',
      deals: 'No-cost EMI available',
      url: 'https://www.amazon.in/dp/B01LTHXA5O'
    },
    flipkart: {
      price: '₹34,990',
      rating: '4.7 / 5',
      reviews: '2,110 ratings',
      deals: 'Exchange offer available',
      url: 'https://www.flipkart.com/nintendo-switch'
    }
  },
  {
    name: 'lenovo ideapad 3',
    display: 'Lenovo IdeaPad 3 Laptop',
    category: 'laptop',
    tags: ['laptop', 'notebook', 'lenovo'],
    amazon: {
      price: '₹39,990',
      rating: '4.3 / 5',
      reviews: '3,350 ratings',
      deals: 'Bank offer available',
      url: 'https://www.amazon.in/dp/B08XY89J4D'
    },
    flipkart: {
      price: '₹38,990',
      rating: '4.2 / 5',
      reviews: '3,120 ratings',
      deals: 'No-cost EMI',
      url: 'https://www.flipkart.com/lenovo-ideapad-3'
    }
  },
  {
    name: 'asus vivobook 15',
    display: 'ASUS VivoBook 15',
    category: 'laptop',
    tags: ['laptop', 'notebook', 'asus'],
    amazon: {
      price: '₹44,990',
      rating: '4.3 / 5',
      reviews: '4,100 ratings',
      deals: '₹3,000 instant discount',
      url: 'https://www.amazon.in/dp/B0B1G6BFJX'
    },
    flipkart: {
      price: '₹43,990',
      rating: '4.2 / 5',
      reviews: '3,780 ratings',
      deals: 'Exchange offer available',
      url: 'https://www.flipkart.com/asus-vivobook-15'
    }
  },
  {
    name: 'airpods 3',
    display: 'Apple AirPods 3',
    category: 'audio',
    tags: ['earbuds', 'audio', 'wireless', 'apple'],
    amazon: {
      price: '₹17,900',
      rating: '4.4 / 5',
      reviews: '12,100 ratings',
      deals: 'No-cost EMI available',
      url: 'https://www.amazon.in/dp/B0BDG7KJ2G'
    },
    flipkart: {
      price: '₹17,499',
      rating: '4.4 / 5',
      reviews: '11,700 ratings',
      deals: '₹1,000 off with ICICI',
      url: 'https://www.flipkart.com/apple-airpods-3'
    }
  },
  {
    name: 'lg oled c2',
    display: 'LG OLED C2 TV',
    category: 'tv',
    tags: ['tv', 'television', 'lg', 'oled'],
    amazon: {
      price: '₹1,49,990',
      rating: '4.7 / 5',
      reviews: '8,300 ratings',
      deals: 'Free wall mount',
      url: 'https://www.amazon.in/dp/B09JGFTCC2'
    },
    flipkart: {
      price: '₹1,48,999',
      rating: '4.7 / 5',
      reviews: '7,900 ratings',
      deals: 'No-cost EMI',
      url: 'https://www.flipkart.com/lg-oled-c2'
    }
  },
  {
    name: 'nikon d3500',
    display: 'Nikon D3500 DSLR',
    category: 'camera',
    tags: ['camera', 'dslr', 'nikon', 'photography'],
    amazon: {
      price: '₹32,990',
      rating: '4.5 / 5',
      reviews: '5,300 ratings',
      deals: 'Extra 5% off',
      url: 'https://www.amazon.in/dp/B07GWKDLGT'
    },
    flipkart: {
      price: '₹31,990',
      rating: '4.4 / 5',
      reviews: '4,780 ratings',
      deals: 'Free delivery',
      url: 'https://www.flipkart.com/nikon-d3500'
    }
  },
  {
    name: 'instant pot duo',
    display: 'Instant Pot Duo 7-in-1',
    category: 'appliance',
    tags: ['kitchen', 'appliance', 'pressure cooker', 'instant pot'],
    amazon: {
      price: '₹9,999',
      rating: '4.5 / 5',
      reviews: '16,900 ratings',
      deals: 'Bank offer available',
      url: 'https://www.amazon.in/dp/B00FLYWNYQ'
    },
    flipkart: {
      price: '₹9,499',
      rating: '4.4 / 5',
      reviews: '14,700 ratings',
      deals: 'No-cost EMI',
      url: 'https://www.flipkart.com/instant-pot-duo'
    }
  },
  {
    name: 'apple watch se',
    display: 'Apple Watch SE',
    category: 'wearable',
    tags: ['watch', 'wearable', 'apple', 'fitness'],
    amazon: {
      price: '₹24,900',
      rating: '4.4 / 5',
      reviews: '7,100 ratings',
      deals: 'No-cost EMI available',
      url: 'https://www.amazon.in/dp/B08J5J7N3M'
    },
    flipkart: {
      price: '₹24,499',
      rating: '4.3 / 5',
      reviews: '6,750 ratings',
      deals: 'Exchange offer available',
      url: 'https://www.flipkart.com/apple-watch-se'
    }
  },
  {
    name: 'fitbit versa 4',
    display: 'Fitbit Versa 4',
    category: 'wearable',
    tags: ['watch', 'wearable', 'fitness', 'tracker'],
    amazon: {
      price: '₹19,999',
      rating: '4.3 / 5',
      reviews: '4,580 ratings',
      deals: '₹1,000 off',
      url: 'https://www.amazon.in/dp/B0BDGYP3WX'
    },
    flipkart: {
      price: '₹18,999',
      rating: '4.2 / 5',
      reviews: '4,100 ratings',
      deals: 'Free delivery',
      url: 'https://www.flipkart.com/fitbit-versa-4'
    }
  }
];

const CATEGORY_KEYWORDS = {
  mobile: ['mobile', 'phone', 'smartphone', 'android', 'ios'],
  audio: ['earbuds', 'headphones', 'audio', 'speaker', 'sound', 'wireless'],
  wearable: ['watch', 'band', 'fitness', 'wearable', 'smartwatch', 'tracker'],
  console: ['console', 'gaming', 'ps5', 'xbox', 'switch'],
  laptop: ['laptop', 'notebook', 'macbook', 'dell', 'hp', 'asus', 'acer', 'lenovo'],
  tv: ['tv', 'television', 'qled', 'led', 'smart tv', 'oled'],
  camera: ['camera', 'dslr', 'photography', 'nikon', 'canon', 'sony'],
  appliance: ['appliance', 'air fryer', 'kitchen', 'home', 'pressure cooker', 'instant pot']
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
