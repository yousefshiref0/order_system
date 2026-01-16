export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Beverages' | 'Snacks' | 'Desserts';
  popular?: boolean;
  sizes?: { name: string; price: number }[];
  addons?: { name: string; price: number }[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedSize?: string;
  selectedAddons?: string[];
}

export type OrderType = 'dine-in' | 'takeaway';
