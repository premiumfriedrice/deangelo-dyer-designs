export interface PortfolioDetail {
  label: string;
  value: string;
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  year: string;
  materials: string[];
  story?: string;
  details: PortfolioDetail[];
  forSale: boolean;
  price?: number;
  featured?: boolean;
}

export interface CartItem {
  product: PortfolioItem;
  quantity: number;
}
