import { ShoppingCart, Coffee } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  isCartView: boolean;
}

export function Header({ cartCount, onCartClick, isCartView }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-black border-b border-[#D4AF37]/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Coffee className="w-8 h-8 text-[#D4AF37]" strokeWidth={2} />
          <h1 className="text-3xl font-bold tracking-wider" style={{ color: '#D4AF37' }}>
            HOOK
          </h1>
        </div>
        
        <button
          onClick={onCartClick}
          className="relative p-3 rounded-lg bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 transition-all duration-300 group"
          aria-label="View cart"
        >
          <ShoppingCart className="w-6 h-6 text-[#D4AF37] group-hover:scale-110 transition-transform" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
