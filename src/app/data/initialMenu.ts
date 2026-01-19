import { MenuItem } from '@/app/types';

export const initialMenuData: MenuItem[] = [
  // Hot Coffee
  {
    id: 'espresso',
    name: 'Espresso',
    category: 'Hot Coffee',
    prices: [
      { size: 'Small', price: 25 },
      { size: 'Medium', price: 35 },
      { size: 'Large', price: 45 },
    ],
    enabled: true,
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'Hot Coffee',
    prices: [
      { size: 'Small', price: 35 },
      { size: 'Medium', price: 45 },
      { size: 'Large', price: 55 },
    ],
    enabled: true,
  },
  {
    id: 'latte',
    name: 'Latte',
    category: 'Hot Coffee',
    prices: [
      { size: 'Small', price: 40 },
      { size: 'Medium', price: 50 },
      { size: 'Large', price: 60 },
    ],
    enabled: true,
  },
  // Iced Coffee
  {
    id: 'iced-latte',
    name: 'Iced Latte',
    category: 'Iced Coffee',
    prices: [
      { size: 'Medium', price: 55 },
      { size: 'Large', price: 65 },
    ],
    enabled: true,
  },
  {
    id: 'iced-mocha',
    name: 'Iced Mocha',
    category: 'Iced Coffee',
    prices: [
      { size: 'Medium', price: 60 },
      { size: 'Large', price: 70 },
    ],
    enabled: true,
  },
  // Fresh Drinks
  {
    id: 'lemon-mint',
    name: 'Lemon Mint',
    category: 'Fresh Drinks',
    prices: [
      { size: 'Medium', price: 40 },
      { size: 'Large', price: 50 },
    ],
    enabled: true,
  },
  {
    id: 'orange-juice',
    name: 'Orange Juice',
    category: 'Fresh Drinks',
    prices: [
      { size: 'Medium', price: 45 },
      { size: 'Large', price: 55 },
    ],
    enabled: true,
  },
  // Desserts
  {
    id: 'chocolate-cake',
    name: 'Chocolate Cake',
    category: 'Desserts',
    prices: [{ size: 'Medium', price: 60 }],
    enabled: true,
  },
  {
    id: 'cheesecake',
    name: 'Cheesecake',
    category: 'Desserts',
    prices: [{ size: 'Medium', price: 65 }],
    enabled: true,
  },
  {
    id: 'brownies',
    name: 'Brownies',
    category: 'Desserts',
    prices: [{ size: 'Medium', price: 45 }],
    enabled: true,
  },
];
