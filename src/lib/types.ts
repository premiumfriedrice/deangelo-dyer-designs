export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  images?: string[];
  materials?: string[];
  dimensions?: string;
  inStock: boolean;
  featured?: boolean;
}

export interface PortfolioDetail {
  label: string;
  value: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  year: string;
  materials: string[];
  story?: string;
  details: PortfolioDetail[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
