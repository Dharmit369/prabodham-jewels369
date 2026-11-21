export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  tags?: string[]; // 'all' | 'best' | 'new' | 'prem'
  featured?: boolean;
  stockStatus: 'in-stock' | 'out-of-stock';
}
