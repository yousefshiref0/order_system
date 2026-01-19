import { Order, OrderStatus } from '@/app/types';
import { Eye, Printer } from 'lucide-react';

interface OrderHistoryProps {
  orders: Order[];
  onViewReceipt: (order: Order) => void;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}

export function OrderHistory({ orders, onViewReceipt, onStatusChange }: OrderHistoryProps) {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'Preparing':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'Completed':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'Cancelled':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-6" style={{ color: '#C9A24D' }}>
        Order History
      </h2>

      <div className="space-y-4">
        {sortedOrders.length === 0 ? (
          <div className="text-center text-[#A0A0A0] py-12">
            <p>No orders yet</p>
          </div>
        ) : (
          sortedOrders.map((order) => (
            <div
              key={order.id}
              className="bg-[#1A1A1A] border border-[#C9A24D]/20 rounded-lg p-5"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg mb-1">Order #{order.id}</h3>
                  <p className="text-sm text-[#A0A0A0]">{formatDate(order.createdAt)}</p>
                  <p className="text-sm text-[#A0A0A0]">Payment: {order.paymentMethod}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg" style={{ color: '#C9A24D' }}>
                    {order.total} EGP
                  </span>
                  <button
                    onClick={() => onViewReceipt(order)}
                    className="bg-[#2A2A2A] text-white p-2 rounded-lg hover:bg-[#3A3A3A] transition-colors"
                    title="View Receipt"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Order Items Summary */}
              <div className="mb-4 text-sm text-[#A0A0A0]">
                {order.items.map((item, index) => (
                  <div key={index}>
                    {item.name} ({item.size}) × {item.quantity}
                  </div>
                ))}
              </div>

              {/* Status Selector */}
              <div className="flex gap-2">
                {(['Pending', 'Preparing', 'Completed', 'Cancelled'] as OrderStatus[]).map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => onStatusChange(order.id, status)}
                      className={`px-3 py-1.5 rounded-lg border text-sm transition-all duration-300 ${
                        order.status === status
                          ? getStatusColor(status)
                          : 'bg-[#2A2A2A] text-[#A0A0A0] border-[#3A3A3A] hover:bg-[#3A3A3A]'
                      }`}
                    >
                      {status}
                    </button>
                  )
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
