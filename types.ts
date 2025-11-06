export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  specs: Record<string, string>;
}

export interface CartItem extends Product {
  quantity: number;
}

export type View = 'list' | 'detail' | 'cart';

export interface CurrentView {
  view: View;
  productId?: number;
}
