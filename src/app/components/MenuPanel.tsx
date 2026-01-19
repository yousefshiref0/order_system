import { useState } from 'react';
import { MenuItem, Size } from '@/app/types';
import { Plus } from 'lucide-react';

interface MenuPanelProps {
  menuItems: MenuItem[];
  onAddToOrder: (item: MenuItem, size: Size, price: number) => void;
}

export function MenuPanel({ menuItems, onAddToOrder }: MenuPanelProps) {
  const categories = Array.from(new Set(menuItems.map((item) => item.category)));
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, Size>>({});

  const filteredItems = menuItems.filter(
    (item) => item.category === selectedCategory && item.enabled
  );

  const handleSizeChange = (itemId: string, size: Size) => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: size }));
  };

  const getSelectedSize = (item: MenuItem): Size => {
    return selectedSizes[item.id] || item.prices[0].size;
  };

  const getSelectedPrice = (item: MenuItem): number => {
    const size = getSelectedSize(item);
    return item.prices.find((p) => p.size === size)?.price || 0;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Categories */}
      <div className="flex flex-wrap gap-2 p-6 border-b border-[#C9A24D]/20">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-[#C9A24D] text-[#0B0B0B]'
                : 'bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const selectedSize = getSelectedSize(item);
            const selectedPrice = getSelectedPrice(item);

            return (
              <div
                key={item.id}
                className="bg-[#1A1A1A] border border-[#C9A24D]/20 rounded-lg p-4 hover:border-[#C9A24D]/40 transition-all duration-300"
              >
                <h3 className="text-lg mb-3">{item.name}</h3>

                {/* Size Selector */}
                <div className="mb-3">
                  <label className="text-sm text-[#A0A0A0] block mb-2">Size</label>
                  <div className="flex gap-2">
                    {item.prices.map((priceOption) => (
                      <button
                        key={priceOption.size}
                        onClick={() => handleSizeChange(item.id, priceOption.size)}
                        className={`flex-1 px-3 py-1.5 rounded text-sm transition-all duration-300 ${
                          selectedSize === priceOption.size
                            ? 'bg-[#C9A24D] text-[#0B0B0B]'
                            : 'bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]'
                        }`}
                      >
                        {priceOption.size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price and Add Button */}
                <div className="flex items-center justify-between">
                  <span className="text-xl" style={{ color: '#C9A24D' }}>
                    {selectedPrice} EGP
                  </span>
                  <button
                    onClick={() => onAddToOrder(item, selectedSize, selectedPrice)}
                    className="bg-[#C9A24D] text-[#0B0B0B] px-4 py-2 rounded-lg hover:bg-[#D4B264] transition-all duration-300 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add to Order
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
