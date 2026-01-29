
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
  { qty: '12-23', c1: '4.72', c2: '5.78', c3: '6.83', c4: '-', c5: '-', c6: '-' },
  { qty: '24-47', c1: '4.46', c2: '5.51', c3: '6.30', c4: '7.35', c5: '8.66', c6: '11.55' },
  { qty: '48-71', c1: '4.20', c2: '4.72', c3: '5.25', c4: '6.56', c5: '7.35', c6: '10.50' },
  { qty: '72-99', c1: '3.94', c2: '4.99', c3: '5.51', c4: '6.83', c5: '7.35', c6: '8.93' },
  { qty: '100-199', c1: '3.67', c2: '4.72', c3: '5.25', c4: '6.30', c5: '6.83', c6: '8.93' },
  { qty: '200-399', c1: '3.15', c2: '4.20', c3: '4.46', c4: '5.25', c5: '5.78', c6: '6.56' },
  { qty: '400-599', c1: '2.36', c2: '2.89', c3: '3.41', c4: '3.94', c5: '4.46', c6: '5.25' },
  { qty: '600+', c1: '1.84', c2: '2.63', c3: '3.15', c4: '3.41', c5: '4.20', c6: '4.46' },
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
    { name: 'Reflex Blue', pantone: 'Pantone 2738 C', hex: '#00009C' },
    { name: 'Lavender', pantone: 'Pantone 2635 C', hex: '#8D90B7' },
    { name: 'Light Purple', pantone: 'Pantone 265 C', hex: '#9063CD' },
    { name: 'Purple', pantone: 'Pantone 268 C', hex: '#582C83' },
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
  return getStorage('inks', INITIAL_INKS);
};

export const updateInks = (inks: any) => {
  setStorage('inks', inks);
};
