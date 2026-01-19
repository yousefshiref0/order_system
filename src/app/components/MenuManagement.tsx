import { useState } from 'react';
import { MenuItem, Size } from '@/app/types';
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

interface MenuManagementProps {
  menuItems: MenuItem[];
  onAddItem: (item: MenuItem) => void;
  onUpdateItem: (item: MenuItem) => void;
  onDeleteItem: (id: string) => void;
  onToggleItem: (id: string) => void;
}

export function MenuManagement({
  menuItems,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onToggleItem,
}: MenuManagementProps) {
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const categories = Array.from(new Set(menuItems.map((item) => item.category)));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get('name') as string;
    const category = formData.get('category') as string;

    const prices = [];
    const smallPrice = formData.get('price-Small');
    const mediumPrice = formData.get('price-Medium');
    const largePrice = formData.get('price-Large');

    if (smallPrice) prices.push({ size: 'Small' as Size, price: Number(smallPrice) });
    if (mediumPrice) prices.push({ size: 'Medium' as Size, price: Number(mediumPrice) });
    if (largePrice) prices.push({ size: 'Large' as Size, price: Number(largePrice) });

    if (editingItem) {
      onUpdateItem({
        ...editingItem,
        name,
        category,
        prices,
      });
      setEditingItem(null);
    } else {
      onAddItem({
        id: `item-${Date.now()}`,
        name,
        category,
        prices,
        enabled: true,
      });
      setIsAdding(false);
    }
  };

  const currentItem = editingItem || (isAdding ? { id: '', name: '', category: '', prices: [], enabled: true } as MenuItem : null);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl" style={{ color: '#C9A24D' }}>
          Menu Management
        </h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-[#C9A24D] text-[#0B0B0B] px-6 py-2 rounded-lg hover:bg-[#D4B264] transition-all duration-300 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Item
        </button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editingItem) && currentItem && (
        <div className="bg-[#1A1A1A] border border-[#C9A24D]/40 rounded-lg p-6 mb-6">
          <h3 className="text-xl mb-4">{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[#A0A0A0] mb-2">Item Name</label>
              <input
                type="text"
                name="name"
                defaultValue={currentItem.name}
                required
                className="w-full bg-[#0B0B0B] border border-[#C9A24D]/20 rounded-lg px-4 py-2 text-white focus:border-[#C9A24D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-[#A0A0A0] mb-2">Category</label>
              <input
                type="text"
                name="category"
                defaultValue={currentItem.category}
                list="categories"
                required
                className="w-full bg-[#0B0B0B] border border-[#C9A24D]/20 rounded-lg px-4 py-2 text-white focus:border-[#C9A24D] focus:outline-none"
              />
              <datalist id="categories">
                {categories.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-sm text-[#A0A0A0] mb-2">Prices (leave empty to skip size)</label>
              <div className="grid grid-cols-3 gap-3">
                {(['Small', 'Medium', 'Large'] as Size[]).map((size) => {
                  const existingPrice = currentItem.prices.find((p) => p.size === size);
                  return (
                    <div key={size}>
                      <label className="block text-xs text-[#A0A0A0] mb-1">{size}</label>
                      <input
                        type="number"
                        name={`price-${size}`}
                        defaultValue={existingPrice?.price || ''}
                        placeholder="EGP"
                        min="0"
                        className="w-full bg-[#0B0B0B] border border-[#C9A24D]/20 rounded-lg px-3 py-2 text-white focus:border-[#C9A24D] focus:outline-none"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-[#C9A24D] text-[#0B0B0B] py-2 rounded-lg hover:bg-[#D4B264] transition-colors"
              >
                {editingItem ? 'Update Item' : 'Add Item'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setIsAdding(false);
                }}
                className="flex-1 bg-[#2A2A2A] text-white py-2 rounded-lg hover:bg-[#3A3A3A] transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Menu Items List */}
      <div className="space-y-3">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`bg-[#1A1A1A] border rounded-lg p-4 transition-all duration-300 ${
              item.enabled ? 'border-[#C9A24D]/20' : 'border-[#3A3A3A] opacity-60'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg">{item.name}</h3>
                  <span className="text-sm text-[#A0A0A0] bg-[#2A2A2A] px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
                <div className="flex gap-3 text-sm">
                  {item.prices.map((price) => (
                    <span key={price.size} className="text-[#A0A0A0]">
                      {price.size}: <span style={{ color: '#C9A24D' }}>{price.price} EGP</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleItem(item.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    item.enabled
                      ? 'text-[#C9A24D] hover:bg-[#2A2A2A]'
                      : 'text-[#A0A0A0] hover:bg-[#2A2A2A]'
                  }`}
                  title={item.enabled ? 'Disable' : 'Enable'}
                >
                  {item.enabled ? (
                    <ToggleRight className="w-6 h-6" />
                  ) : (
                    <ToggleLeft className="w-6 h-6" />
                  )}
                </button>
                <button
                  onClick={() => setEditingItem(item)}
                  className="p-2 rounded-lg text-white hover:bg-[#2A2A2A] transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
                      onDeleteItem(item.id);
                    }
                  }}
                  className="p-2 rounded-lg text-[#EF4444] hover:bg-[#2A2A2A] transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
