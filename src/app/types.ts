export type Size = 'Small' | 'Medium' | 'Large';

export interface MenuItemPrice {
  size: Size;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  prices: MenuItemPrice[];
  enabled: boolean;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  size: Size;
  price: number;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Preparing' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  paymentMethod?: 'Cash' | 'Card';
}
