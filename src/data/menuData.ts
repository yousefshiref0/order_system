import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  // Beverages
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'Rich and bold double shot espresso',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1705952285570-113e76f63fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBlc3ByZXNzb3xlbnwxfHx8fDE3Njg1NTEwNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Beverages',
    popular: true,
    sizes: [
      { name: 'Single', price: 0 },
      { name: 'Double', price: 1.00 }
    ]
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Classic Italian coffee with steamed milk foam',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1621264871518-9ac2bf93a44a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwY3VwfGVufDF8fHx8MTc2ODQ4MDk3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Beverages',
    popular: true,
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 1.00 },
      { name: 'Large', price: 2.00 }
    ],
    addons: [
      { name: 'Extra Shot', price: 0.75 },
      { name: 'Vanilla Syrup', price: 0.50 },
      { name: 'Caramel Syrup', price: 0.50 }
    ]
  },
  {
    id: 'latte',
    name: 'Café Latte',
    description: 'Smooth espresso with steamed milk and latte art',
    price: 4.75,
    image: 'https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwxfHx8fDE3Njg1MTEyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Beverages',
    popular: true,
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 1.00 },
      { name: 'Large', price: 2.00 }
    ],
    addons: [
      { name: 'Extra Shot', price: 0.75 },
      { name: 'Vanilla Syrup', price: 0.50 },
      { name: 'Hazelnut Syrup', price: 0.50 },
      { name: 'Oat Milk', price: 0.75 }
    ]
  },
  {
    id: 'iced-coffee',
    name: 'Iced Coffee',
    description: 'Refreshing cold brew over ice',
    price: 4.25,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwY29mZmVlfGVufDF8fHx8MTc2ODQzOTg3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Beverages',
    sizes: [
      { name: 'Medium', price: 0 },
      { name: 'Large', price: 1.50 }
    ],
    addons: [
      { name: 'Vanilla Syrup', price: 0.50 },
      { name: 'Caramel Syrup', price: 0.50 }
    ]
  },
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    description: 'Premium Japanese matcha with steamed milk',
    price: 5.25,
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBsYXR0ZXxlbnwxfHx8fDE3Njg1MTI1MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Beverages',
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 1.00 },
      { name: 'Large', price: 2.00 }
    ],
    addons: [
      { name: 'Honey', price: 0.50 },
      { name: 'Oat Milk', price: 0.75 }
    ]
  },
  
  // Snacks
  {
    id: 'croissant',
    name: 'Butter Croissant',
    description: 'Flaky, buttery French croissant baked fresh daily',
    price: 3.75,
    image: 'https://images.unsplash.com/photo-1712723246766-3eaea22e52ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzY4NDQxMjM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Snacks',
    popular: true
  },
  {
    id: 'sandwich',
    name: 'Club Sandwich',
    description: 'Triple-decker with turkey, bacon, lettuce, and tomato',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1642335381031-8c80a25d1bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGNhZmV8ZW58MXx8fHwxNzY4NTE3NDc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Snacks',
    popular: true
  },
  {
    id: 'bagel',
    name: 'Everything Bagel',
    description: 'Toasted bagel with cream cheese',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1707144289499-8903dc4929c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWdlbCUyMGJyZWFrZmFzdHxlbnwxfHx8fDE3Njg0ODM3NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Snacks',
    addons: [
      { name: 'Smoked Salmon', price: 3.00 },
      { name: 'Avocado', price: 1.50 }
    ]
  },
  {
    id: 'muffin',
    name: 'Blueberry Muffin',
    description: 'Homemade muffin bursting with fresh blueberries',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1609983508297-272bdba8d9ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdWZmaW4lMjBiYWtlcnl8ZW58MXx8fHwxNzY4NDgzNzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Snacks'
  },
  
  // Desserts
  {
    id: 'chocolate-cake',
    name: 'Chocolate Fudge Cake',
    description: 'Decadent triple-layer chocolate cake with ganache',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlfGVufDF8fHx8MTc2ODQ0NjQ4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Desserts',
    popular: true
  },
  {
    id: 'cheesecake',
    name: 'New York Cheesecake',
    description: 'Creamy cheesecake with graham cracker crust',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1673551494394-23b13e77e58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVlc2VjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3Njg0OTk5MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Desserts',
    popular: true,
    addons: [
      { name: 'Strawberry Topping', price: 1.00 },
      { name: 'Chocolate Drizzle', price: 0.75 }
    ]
  },
  {
    id: 'tiramisu',
    name: 'Classic Tiramisu',
    description: 'Italian dessert with espresso-soaked ladyfingers and mascarpone',
    price: 6.75,
    image: 'https://images.unsplash.com/photo-1714385905983-6f8e06fffae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aXJhbWlzdSUyMGRlc3NlcnR8ZW58MXx8fHwxNzY4NDM4NzE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Desserts'
  }
];
