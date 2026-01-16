import { useState } from 'react';
import { Plus, Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem as MenuItemType } from '../types';

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType, size?: string, addons?: string[]) => void;
}

export function MenuItem({ item, onAddToCart }: MenuItemProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    item.sizes?.[0]?.name
  );
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const handleAddToCart = () => {
    if (item.sizes || item.addons) {
      setShowModal(true);
    } else {
      onAddToCart(item);
    }
  };

  const handleConfirmAddToCart = () => {
    onAddToCart(item, selectedSize, selectedAddons);
    setShowModal(false);
    setSelectedAddons([]);
  };

  const toggleAddon = (addonName: string) => {
    setSelectedAddons(prev =>
      prev.includes(addonName)
        ? prev.filter(a => a !== addonName)
        : [...prev, addonName]
    );
  };

  const calculatePrice = () => {
    let price = item.price;
    
    if (selectedSize && item.sizes) {
      const sizeOption = item.sizes.find(s => s.name === selectedSize);
      if (sizeOption) price += sizeOption.price;
    }
    
    if (item.addons) {
      selectedAddons.forEach(addonName => {
        const addon = item.addons!.find(a => a.name === addonName);
        if (addon) price += addon.price;
      });
    }
    
    return price;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 cursor-pointer"
        onClick={handleAddToCart}
      >
        {item.popular && (
          <div className="absolute top-3 left-3 z-10 bg-[#D4AF37] text-black px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
            <Star className="w-3 h-3 fill-current" />
            Popular
          </div>
        )}
        
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
          <p className="text-white/60 text-sm mb-3 line-clamp-2">{item.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-[#D4AF37] font-bold text-lg">
              ${item.price.toFixed(2)}
            </span>
            
            <button
              className="bg-[#D4AF37] hover:bg-[#F4D03F] text-black px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-all duration-300 transform group-hover:scale-105"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 rounded-2xl max-w-lg w-full border border-[#D4AF37]/30 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                <p className="text-white/70 mb-6">{item.description}</p>

                {item.sizes && item.sizes.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Select Size</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {item.sizes.map((size) => (
                        <button
                          key={size.name}
                          onClick={() => setSelectedSize(size.name)}
                          className={`py-2 px-4 rounded-lg border transition-all ${
                            selectedSize === size.name
                              ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                              : 'bg-zinc-800 text-white border-zinc-700 hover:border-[#D4AF37]/50'
                          }`}
                        >
                          <div className="font-semibold">{size.name}</div>
                          {size.price > 0 && (
                            <div className="text-xs">+${size.price.toFixed(2)}</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {item.addons && item.addons.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Add-ons (Optional)</h4>
                    <div className="space-y-2">
                      {item.addons.map((addon) => (
                        <button
                          key={addon.name}
                          onClick={() => toggleAddon(addon.name)}
                          className={`w-full py-3 px-4 rounded-lg border transition-all flex justify-between items-center ${
                            selectedAddons.includes(addon.name)
                              ? 'bg-[#D4AF37]/20 text-white border-[#D4AF37]'
                              : 'bg-zinc-800 text-white border-zinc-700 hover:border-[#D4AF37]/50'
                          }`}
                        >
                          <span>{addon.name}</span>
                          <span className="text-[#D4AF37]">+${addon.price.toFixed(2)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                  <div>
                    <div className="text-white/60 text-sm">Total Price</div>
                    <div className="text-[#D4AF37] font-bold text-2xl">
                      ${calculatePrice().toFixed(2)}
                    </div>
                  </div>
                  
                  <button
                    onClick={handleConfirmAddToCart}
                    className="bg-[#D4AF37] hover:bg-[#F4D03F] text-black px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
