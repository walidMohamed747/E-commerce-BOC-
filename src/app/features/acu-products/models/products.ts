export interface Products {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: string;
  rating: string;
  stock: string;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<{}>;
}
export interface Quantity {
  id: number;
  quantity: number;
}

export interface MarketPlace {
  id: number;
  Products: Array<{}>;
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}
