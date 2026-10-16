export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  tag?: 'NEW ARRIVAL' | 'MOST WANTED' | 'FESTIVE DROP' | 'BESTSELLER';
  category: 'Short Kurti' | 'Kurta Set' | 'Shirt' | 'Tunic';
  collection: 'KK Core' | 'Korakagaz Classics' | 'The Mithai Box';
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
  image: string;
  secondaryImage?: string;
  description: string;
  fabric: string;
  care: string;
  fit: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  quantity: number;
}

export interface FilterState {
  category: string;
  collection: string;
  priceRange: [number, number];
  size: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  searchQuery: string;
}

export type PageView = 
  | 'home' 
  | 'categories' 
  | 'chapters' 
  | 'best-sellers' 
  | 'all-products' 
  | 'journal' 
  | 'pdp' 
  | 'design-catalog' 
  | 'order-success';

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'cod' | 'upi' | 'card';
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
  date: string;
}
