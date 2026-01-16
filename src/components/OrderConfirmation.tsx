import { useState } from 'react';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, OrderType } from '../types';
import { toast } from 'sonner@2.0.3';

interface OrderConfirmationProps {
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onBackToMenu: () => void;
  onClearCart: () => void;
}

export function OrderConfirmation({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onBackToMenu,
  onClearCart
}: OrderConfirmationProps) {
  const [orderType, setOrderType] = useState<OrderType>('dine-in');
  const [tableNumber, setTableNumber] = useState('');

  const calculateItemPrice = (cartItem: CartItem) => {
    let price = cartItem.item.price;

    if (cartItem.selectedSize && cartItem.item.sizes) {
      const sizeOption = cartItem.item.sizes.find(s => s.name === cartItem.selectedSize);
      if (sizeOption) price += sizeOption.price;
    }

    if (cartItem.selectedAddons && cartItem.item.addons) {
      cartItem.selectedAddons.forEach(addonName => {
        const addon = cartItem.item.addons!.find(a => a.name === addonName);
        if (addon) price += addon.price;
      });
    }

    return price * cartItem.quantity;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + calculateItemPrice(item), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleConfirmOrder = () => {
    if (orderType === 'dine-in' && !tableNumber) {
      toast.error('Please enter a table number');
      return;
    }

    toast.success(
      `Order confirmed! ${
        orderType === 'dine-in' ? `Table ${tableNumber}` : 'Takeaway'
      } - Total: $${total.toFixed(2)}`
    );

    // Clear cart after confirmation
    setTimeout(() => {
      onClearCart();
      onBackToMenu();
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="bg-zinc-900 rounded-2xl p-12 border border-[#D4AF37]/20">
            <ShoppingBag className="w-20 h-20 text-[#D4AF37]/40 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
            <p className="text-white/60 mb-6">Add some items from our menu to get started</p>
            <button
              onClick={onBackToMenu}
              className="bg-[#D4AF37] hover:bg-[#F4D03F] text-black px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
            >
              Browse Menu
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBackToMenu}
          className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#D4AF37]" />
        </button>
        <h2 className="text-3xl font-bold text-white">Your Order</h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {cartItems.map((cartItem) => (
              <motion.div
                key={cartItem.item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-zinc-900 rounded-xl border border-[#D4AF37]/20 overflow-hidden"
              >
                <div className="flex gap-4 p-4">
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {cartItem.item.name}
                    </h3>
                    
                    {cartItem.selectedSize && (
                      <p className="text-sm text-white/60 mb-1">
                        Size: {cartItem.selectedSize}
                      </p>
                    )}
                    
                    {cartItem.selectedAddons && cartItem.selectedAddons.length > 0 && (
                      <p className="text-sm text-white/60 mb-2">
                        Add-ons: {cartItem.selectedAddons.join(', ')}
                      </p>
                    )}
                    
                    <p className="text-[#D4AF37] font-bold">
                      ${calculateItemPrice(cartItem).toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => onRemoveItem(cartItem.item.id)}
                      className="text-red-500 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    
                    <div className="flex items-center gap-2 bg-zinc-800 rounded-lg">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                        className="p-2 hover:bg-zinc-700 rounded-l-lg transition-colors"
                      >
                        <Minus className="w-4 h-4 text-white" />
                      </button>
                      <span className="text-white font-semibold w-8 text-center">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                        className="p-2 hover:bg-zinc-700 rounded-r-lg transition-colors"
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900 rounded-xl border border-[#D4AF37]/20 p-6 sticky top-24">
            <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
            
            {/* Order Type Selection */}
            <div className="mb-6">
              <label className="text-white/80 text-sm mb-3 block">Order Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setOrderType('dine-in')}
                  className={`py-3 px-4 rounded-lg border transition-all flex items-center justify-center gap-2 ${
                    orderType === 'dine-in'
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                      : 'bg-zinc-800 text-white border-zinc-700 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <Utensils className="w-4 h-4" />
                  Dine-in
                </button>
                <button
                  onClick={() => setOrderType('takeaway')}
                  className={`py-3 px-4 rounded-lg border transition-all flex items-center justify-center gap-2 ${
                    orderType === 'takeaway'
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                      : 'bg-zinc-800 text-white border-zinc-700 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Takeaway
                </button>
              </div>
            </div>

            {/* Table Number Input */}
            {orderType === 'dine-in' && (
              <div className="mb-6">
                <label className="text-white/80 text-sm mb-2 block">Table Number</label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="Enter table number"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                />
              </div>
            )}

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6 pb-6 border-b border-zinc-800">
              <div className="flex justify-between text-white/80">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between text-xl font-bold text-white mb-6">
              <span>Total</span>
              <span className="text-[#D4AF37]">${total.toFixed(2)}</span>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmOrder}
              className="w-full bg-[#D4AF37] hover:bg-[#F4D03F] text-black py-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#D4AF37]/30"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
