import { Coffee } from 'lucide-react';

interface HeaderProps {
  currentView: 'orders' | 'menu-management';
  onViewChange: (view: 'orders' | 'menu-management') => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  return (
    <header className="bg-[#1A1A1A] border-b border-[#C9A24D]/20 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Coffee className="w-8 h-8" style={{ color: '#C9A24D' }} />
          <h1 className="text-3xl tracking-wide" style={{ color: '#C9A24D' }}>
            Hook
          </h1>
        </div>
        
        <nav className="flex gap-4">
          <button
            onClick={() => onViewChange('orders')}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              currentView === 'orders'
                ? 'bg-[#C9A24D] text-[#0B0B0B]'
                : 'bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => onViewChange('menu-management')}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              currentView === 'menu-management'
                ? 'bg-[#C9A24D] text-[#0B0B0B]'
                : 'bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]'
            }`}
          >
            Menu Management
          </button>
        </nav>
      </div>
    </header>
  );
}
