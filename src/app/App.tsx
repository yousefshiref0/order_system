import { useState } from 'react';
import { MenuItem, OrderItem, Order, Size, OrderStatus } from '@/app/types';
import { initialMenuData } from '@/app/data/initialMenu';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { MenuPanel } from '@/app/components/MenuPanel';
import { OrderPanel } from '@/app/components/OrderPanel';
import { OrderHistory } from '@/app/components/OrderHistory';
import { Receipt } from '@/app/components/Receipt';
import { MenuManagement } from '@/app/components/MenuManagement';

export default function App() {
  const [currentView, setCurrentView] = useState<'orders' | 'menu-management'>('orders');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuData);
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedReceipt, setSelectedReceipt] = useState<Order | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [autoPrint, setAutoPrint] = useState(false);

  // Add item to current order
  const handleAddToOrder = (item: MenuItem, size: Size, price: number) => {
    const existingItem = currentOrder.find(
      (orderItem) => orderItem.menuItemId === item.id && orderItem.size === size
    );

    if (existingItem) {
      setCurrentOrder(
        currentOrder.map((orderItem) =>
          orderItem.id === existingItem.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        )
      );
    } else {
      const newOrderItem: OrderItem = {
        id: `order-item-${Date.now()}-${Math.random()}`,
        menuItemId: item.id,
        name: item.name,
        size,
        price,
        quantity: 1,
      };
      setCurrentOrder([...currentOrder, newOrderItem]);
    }
  };

  // Update item quantity
  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCurrentOrder(
      currentOrder.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Remove item from order
  const handleRemoveItem = (id: string) => {
    setCurrentOrder(currentOrder.filter((item) => item.id !== id));
  };

  // Clear current order
  const handleClearOrder = () => {
    setCurrentOrder([]);
  };

  // Confirm order and create receipt
  const handleConfirmOrder = (paymentMethod: 'Cash' | 'Card') => {
    if (currentOrder.length === 0) return;

    const total = currentOrder.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: [...currentOrder],
      total,
      status: 'Pending',
      createdAt: new Date(),
      paymentMethod,
    };

    setOrders([newOrder, ...orders]);
    setSelectedReceipt(newOrder);
    setAutoPrint(true);
    setShowReceiptModal(true);
    setCurrentOrder([]);

    // Simulate opening cash drawer
    if (paymentMethod === 'Cash') {
      openCashDrawer();
    }
  };

  // Mock cash drawer opening
  const openCashDrawer = () => {
    console.log('🔓 Cash drawer opened!');
    // In a real implementation, this would send a signal to the cash drawer hardware
    // For now, we'll just show a browser alert
    setTimeout(() => {
      alert('Cash drawer opened! 💵');
    }, 500);
  };

  // View receipt
  const handleViewReceipt = (order: Order) => {
    setSelectedReceipt(order);
    setAutoPrint(false);
    setShowReceiptModal(true);
  };

  // Close receipt modal
  const handleCloseReceipt = () => {
    setShowReceiptModal(false);
    setSelectedReceipt(null);
    setAutoPrint(false);
  };

  // Update order status
  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    setOrders(
      orders.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  // Menu Management Functions
  const handleAddMenuItem = (item: MenuItem) => {
    setMenuItems([...menuItems, item]);
  };

  const handleUpdateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems(
      menuItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const handleToggleMenuItem = (id: string) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentView={currentView} onViewChange={setCurrentView} />

      <main className="flex-1 flex overflow-hidden">
        {currentView === 'orders' ? (
          <>
            {/* Left Panel - Menu */}
            <div className="flex-1 overflow-hidden">
              <MenuPanel menuItems={menuItems} onAddToOrder={handleAddToOrder} />
            </div>

            {/* Right Panel - Current Order */}
            <div className="w-96 overflow-hidden">
              <OrderPanel
                orderItems={currentOrder}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onConfirmOrder={handleConfirmOrder}
                onClearOrder={handleClearOrder}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <MenuManagement
              menuItems={menuItems}
              onAddItem={handleAddMenuItem}
              onUpdateItem={handleUpdateMenuItem}
              onDeleteItem={handleDeleteMenuItem}
              onToggleItem={handleToggleMenuItem}
            />
          </div>
        )}
      </main>

      {/* Order History Section (only show in orders view) */}
      {currentView === 'orders' && orders.length > 0 && (
        <div className="border-t border-[#C9A24D]/20 max-h-96 overflow-y-auto">
          <OrderHistory
            orders={orders}
            onViewReceipt={handleViewReceipt}
            onStatusChange={handleStatusChange}
          />
        </div>
      )}

      <Footer />

      {/* Receipt Modal */}
      {showReceiptModal && selectedReceipt && (
        <Receipt
          order={selectedReceipt}
          onClose={handleCloseReceipt}
          autoPrint={autoPrint}
        />
      )}
    </div>
  );
}
