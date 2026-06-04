export const products = [
  { id: 'p1', name: 'Aurora Headphones', category: 'Audio', price: 129, original: 159, rating: 4.7, img: 'headphones', tag: 'new' },
  { id: 'p2', name: 'Nebula Keyboard', category: 'Accessories', price: 89, original: 119, rating: 4.5, img: 'keyboard', tag: 'sale' },
  { id: 'p3', name: 'Horizon Monitor', category: 'Displays', price: 399, original: 499, rating: 4.8, img: 'monitor', tag: 'premium' },
  { id: 'p4', name: 'Orbit Speaker', category: 'Audio', price: 59, original: 79, rating: 4.3, img: 'speaker' },
  { id: 'p5', name: 'Driftwatch', category: 'Wearables', price: 199, original: 249, rating: 4.6, img: 'watch' },
  { id: 'p6', name: 'Cloud Wallet', category: 'Lifestyle', price: 49, original: 69, rating: 4.2, img: 'wallet' }
];

export function findById(id) { return products.find(p => p.id === id); }

export function categories() { return Array.from(new Set(products.map(p => p.category))); }
