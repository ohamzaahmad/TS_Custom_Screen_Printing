
import { Product, Category } from '../types';

// Initial Seed Data
const INITIAL_CATEGORIES: Category[] = [
  {
    id: 't-shirts',
    name: 'T-Shirts',
    description: 'The ultimate canvas. Premium cotton, heavyweight, and soft-blend varieties.',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800'
  }
];

const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Premium Heavy Cotton Tee', category: 't-shirts', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400', description: 'Our most popular standard t-shirt. Durable and perfect for high-detail screen printing.', colors: ['Black', 'White', 'Navy', 'Red', 'Forest Green'] },
  { id: '2', name: 'Vintage Wash Tee', category: 't-shirts', price: 16.50, imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=400', description: 'Super soft, broken-in feel with a relaxed fit. Ideal for premium brand merch.', colors: ['Dusty Rose', 'Olive', 'Sand', 'Stone'] },
  { id: '3', name: 'Organic Sustainable Tee', category: 't-shirts', price: 18.99, imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=400', description: '100% GOTS certified organic cotton. Eco-friendly inks and sustainable manufacturing.', colors: ['Natural', 'Sage', 'Charcoal'] },
  { id: '4', name: 'Oversized Streetwear Tee', category: 't-shirts', price: 19.99, imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=400', description: 'Drop-shoulder, heavy-weight boxy fit. The gold standard for modern streetwear brands.', colors: ['Jet Black', 'Off White', 'Deep Royal'] }
];

const INITIAL_PRICING = [
  { qty: '12-23', c1: '5.06', c2: '-', c3: '-', c4: '-', c5: '-', c6: '-' },
  { qty: '24-47', c1: '4.78', c2: '5.91', c3: '6.76', c4: '7.86', c5: '8.66', c6: '10.55' },
  { qty: '48-71', c1: '4.50', c2: '5.35', c3: '5.91', c4: '7.33', c5: '7.86', c6: '9.50' },
  { qty: '72-99', c1: '4.22', c2: '5.06', c3: '5.62', c4: '6.83', c5: '7.51', c6: '8.93' },
  { qty: '100-199', c1: '3.92', c2: '4.72', c3: '5.12', c4: '6.30', c5: '7.33', c6: '8.40' },
  { qty: '200-399', c1: '3.37', c2: '4.50', c3: '4.78', c4: '5.62', c5: '6.20', c6: '7.21' },
  { qty: '400-599', c1: '2.52', c2: '3.10', c3: '3.65', c4: '4.22', c5: '4.78', c6: '5.62' },
  { qty: '600+', c1: '1.97', c2: '2.82', c3: '3.37', c4: '3.65', c5: '4.50', c6: '4.78' },
];

const INITIAL_INKS = {
  stock: [
    { name: 'Black', pantone: 'Standard', hex: '#000000' },
    { name: 'White', pantone: 'Standard', hex: '#FFFFFF' },
    { name: 'Red', pantone: 'Pantone 186 C', hex: '#C8102E' },
    { name: 'Orange', pantone: 'Pantone 165 C', hex: '#FF6720' },
    { name: 'Golden Yellow', pantone: 'Pantone 1235 C', hex: '#FFB81C' },
    { name: 'Lemon Yellow', pantone: 'Pantone 108 C', hex: '#FEDD00' },
    { name: 'Kelly Green', pantone: 'Pantone 356 C', hex: '#007A33' },
    { name: 'Royal Blue', pantone: 'Pantone 287 C', hex: '#003087' },
    { name: 'Navy', pantone: 'Pantone 281 C', hex: '#00205B' },
    { name: 'Violet', pantone: 'Pantone Violet C', hex: '#702082' },
    { name: 'Fuchsia', pantone: 'Pantone 807 C', hex: '#E4007C' },
  ],
  additional: [
    { name: 'Process Blue', pantone: 'Standard', hex: '#0085CA' },
    { name: 'Sky Blue', pantone: 'Pantone 283 C', hex: '#92C1E9' },
    { name: 'Teal', pantone: 'Pantone 320 C', hex: '#009CA6' },
    { name: 'Reflex Blue', pantone: 'Pantone 2738 C', hex: '#001489' },
    { name: 'Lavender', pantone: 'Pantone 2635 C', hex: '#B5A8DC' },
    { name: 'Light Purple', pantone: 'Pantone 265 C', hex: '#9063CD' },
    { name: 'Purple', pantone: 'Pantone 268 C', hex: '#582C83' },
    { name: 'Primrose', pantone: 'Pantone 108 C', hex: '#FEDD00' },
    { name: 'Vegas Gold', pantone: 'Pantone 458 C', hex: '#DFD1A7' },
    { name: 'Metallic Gold', pantone: 'Pantone 872 C', hex: '#85754E' },
    { name: 'Brown', pantone: 'Pantone 168 C', hex: '#6C3020' },
    { name: 'Chocolate Brown', pantone: 'Pantone 477 C', hex: '#46241E' },
    { name: 'Khaki', pantone: 'Pantone 7501 C', hex: '#DACBA3' },
    { name: 'Flesh', pantone: 'Pantone 475 C', hex: '#F5D6C6' },
    { name: 'Spring Green', pantone: 'Pantone 368 C', hex: '#78BE20' },
    { name: 'Forest Green', pantone: 'Pantone 357 C', hex: '#215732' },
    { name: 'Awareness Pink', pantone: 'Pantone 232 C', hex: '#E83E8C' },
    { name: 'Bubble Gum', pantone: 'Pantone 204 C', hex: '#E93CAC' },
    { name: 'Watermelon', pantone: 'Pantone 191 C', hex: '#EF4A81' },
    { name: 'Rubine Red', pantone: 'Pantone 1935 C', hex: '#D5006D' },
    { name: 'Scarlet Red', pantone: 'Pantone 186 C', hex: '#C8102E' },
    { name: 'Cardinal Red', pantone: 'Pantone 201 C', hex: '#9D2235' },
    { name: 'Process Magenta', pantone: 'Standard', hex: '#D62598' },
    { name: 'Maroon', pantone: 'Pantone 209 C', hex: '#6E2B44' },
    { name: 'Harvest', pantone: 'Pantone 716 C', hex: '#F0A93B' },
    { name: 'Light Gray', pantone: 'Pantone Cool Gray 4 C', hex: '#BBBCBC' },
    { name: 'Dark Gray', pantone: 'Pantone Cool Gray 9 C', hex: '#75787B' },
    { name: 'Metallic Silver', pantone: 'Pantone 877 C', hex: '#A7A8AA' },
    { name: 'Charcoal', pantone: 'Pantone 425 C', hex: '#545859' },
  ],
  fluorescent: [
    { name: 'Fluorescent Pink', pantone: 'Pantone 806 C', hex: '#FF3399' },
    { name: 'Fluorescent Yellow', pantone: 'Pantone 803 C', hex: '#E8FF00' },
    { name: 'Fluorescent Green', pantone: 'Pantone 802 C', hex: '#00FF66' },
    { name: 'Fluorescent Purple', pantone: 'Pantone 253 C', hex: '#B026FF' },
  ]
};

// Helper for local storage
const getStorage = (key: string, defaultValue: any) => {
  const data = localStorage.getItem(`ts_customs_${key}`);
  return data ? JSON.parse(data) : defaultValue;
};

const setStorage = (key: string, data: any) => {
  localStorage.setItem(`ts_customs_${key}`, JSON.stringify(data));
};

export const fetchCategories = async (): Promise<Category[]> => {
  return getStorage('categories', INITIAL_CATEGORIES);
};

export const fetchProducts = async (): Promise<Product[]> => {
  return getStorage('products', INITIAL_PRODUCTS);
};

export const updateProducts = (products: Product[]) => {
  setStorage('products', products);
};

export const fetchPricing = async () => {
  return getStorage('pricing', INITIAL_PRICING);
};

export const updatePricing = (pricing: any[]) => {
  setStorage('pricing', pricing);
};

export const fetchInks = async () => {
  // Versioned key so an updated brand palette replaces stale cached swatches.
  return getStorage('inks_v2', INITIAL_INKS);
};

export const updateInks = (inks: any) => {
  setStorage('inks_v2', inks);
};
