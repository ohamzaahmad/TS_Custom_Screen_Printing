
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
  colors: string[];
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

export interface QuoteRequest {
  fullName: string;
  email: string;
  productType: string;
  quantity: number;
  description: string;
  designUrl?: string;
}
