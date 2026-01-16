import { useState } from 'react';
import { MenuItem as MenuItemComponent } from './MenuItem';
import { MenuItem as MenuItemType } from '../types';
import { motion } from 'motion/react';

interface MenuScreenProps {
  items: MenuItemType[];
  onAddToCart: (item: MenuItemType, size?: string, addons?: string[]) => void;
}

const categories = ['All', 'Beverages', 'Snacks', 'Desserts'] as const;

export function MenuScreen({ items, onAddToCart }: MenuScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold text-white mb-2">Our Menu</h2>
        <p className="text-white/60">Discover our carefully crafted selection</p>
      </motion.div>

      {/* Category Filter */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/30'
                : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredItems.map((item) => (
          <MenuItemComponent
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
          />
        ))}
      </motion.div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/60 text-lg">No items found in this category.</p>
        </div>
      )}
    </div>
  );
}
