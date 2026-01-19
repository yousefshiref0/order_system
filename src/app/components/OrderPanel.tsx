import { OrderItem } from '@/app/types';
import { Plus, Minus, Trash2, Printer, DollarSign } from 'lucide-react';

interface OrderPanelProps {
  orderItems: OrderItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onConfirmOrder: (paymentMethod: 'Cash' | 'Card') => void;
  onClearOrder: () => void;
}

export function OrderPanel({
  orderItems,
  onUpdateQuantity,
  onRemoveItem,
  onConfirmOrder,
  onClearOrder,
}: OrderPanelProps) {
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

  return (
    <div className="flex flex-col h-full bg-[#1A1A1A] border-l border-[#C9A24D]/20">
      {/* Header */}
      <div className="p-6 border-b border-[#C9A24D]/20">
        <h2 className="text-xl">Current Order</h2>
      </div>

      {/* Order Items */}
      <div className="flex-1 overflow-y-auto p-6">
        {orderItems.length === 0 ? (
          <div className="text-center text-[#A0A0A0] py-12">
            <p>No items in order</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#0B0B0B] border border-[#C9A24D]/20 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-base">{item.name}</h3>
                    <p className="text-sm text-[#A0A0A0]">{item.size}</p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-[#EF4444] hover:text-[#DC2626] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 bg-[#2A2A2A] rounded-lg p-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-7 h-7 flex items-center justify-center hover:bg-[#3A3A3A] rounded transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-[#3A3A3A] rounded transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span style={{ color: '#C9A24D' }}>
                    {item.price * item.quantity} EGP
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="p-6 border-t border-[#C9A24D]/20 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-[#A0A0A0]">
            <span>Subtotal</span>
            <span>{subtotal} EGP</span>
          </div>
          <div className="flex justify-between text-xl pt-2 border-t border-[#C9A24D]/20">
            <span>Total</span>
            <span style={{ color: '#C9A24D' }}>{total} EGP</span>
          </div>
        </div>

        {/* Payment Buttons */}
        {orderItems.length > 0 && (
          <div className="space-y-2">
            <button
              onClick={() => onConfirmOrder('Cash')}
              className="w-full bg-[#C9A24D] text-[#0B0B0B] py-3 rounded-lg hover:bg-[#D4B264] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <DollarSign className="w-5 h-5" />
              Confirm Order - Cash
            </button>
            <button
              onClick={() => onConfirmOrder('Card')}
              className="w-full bg-[#2A2A2A] text-white py-3 rounded-lg hover:bg-[#3A3A3A] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Printer className="w-5 h-5" />
              Confirm Order - Card
            </button>
            <button
              onClick={onClearOrder}
              className="w-full bg-[#EF4444]/10 text-[#EF4444] py-2 rounded-lg hover:bg-[#EF4444]/20 transition-all duration-300"
            >
              Clear Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
