import { useState } from 'react';
import { Toaster, toast } from 'sonner@2.0.3';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MenuScreen } from './components/MenuScreen';
import { OrderConfirmation } from './components/OrderConfirmation';
import { CartItem, MenuItem } from './types';
import { menuItems } from './data/menuData';
import { Check } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartView, setIsCartView] = useState(false);
  const [showAddedIndicator, setShowAddedIndicator] = useState(false);

  const handleAddToCart = (
    item: MenuItem,
    selectedSize?: string,
    selectedAddons?: string[]
  ) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (cartItem) =>
          cartItem.item.id === item.id &&
          cartItem.selectedSize === selectedSize &&
          JSON.stringify(cartItem.selectedAddons?.sort()) ===
            JSON.stringify(selectedAddons?.sort())
      );

      if (existingItemIndex > -1) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      } else {
        return [
          ...prev,
          {
            item,
            quantity: 1,
            selectedSize,
            selectedAddons,
          },
        ];
      }
    });

    // Show animated indicator
    setShowAddedIndicator(true);
    setTimeout(() => setShowAddedIndicator(false), 800);

    toast.success(
      <div className="flex items-center gap-2">
        <Check className="w-4 h-4" />
        <span>Added to cart!</span>
      </div>
    );
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.item.id === itemId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.item.id !== itemId));
    toast.success('Item removed from cart');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalItemsInCart = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleCartClick = () => {
    setIsCartView(true);
  };

  const handleBackToMenu = () => {
    setIsCartView(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#18181b',
            color: '#ffffff',
            border: '1px solid rgba(212, 175, 55, 0.3)',
          },
          className: 'font-semibold',
        }}
      />

      <Header
        cartCount={totalItemsInCart}
        onCartClick={handleCartClick}
        isCartView={isCartView}
      />

      {/* Added to Cart Indicator */}
      <AnimatePresence>
        {showAddedIndicator && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            className="fixed top-24 right-4 z-50 bg-[#D4AF37] text-black px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-bold"
          >
            <Check className="w-5 h-5" />
            Added to Cart!
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {isCartView ? (
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <OrderConfirmation
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onBackToMenu={handleBackToMenu}
                onClearCart={handleClearCart}
              />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <MenuScreen items={menuItems} onAddToCart={handleAddToCart} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
