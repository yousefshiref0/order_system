import { Order } from '@/app/types';
import { useEffect, useRef } from 'react';

interface ReceiptProps {
  order: Order;
  onClose: () => void;
  autoPrint?: boolean;
}

export function Receipt({ order, onClose, autoPrint = false }: ReceiptProps) {
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoPrint) {
      handlePrint();
    }
  }, [autoPrint]);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '', 'width=300,height=600');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt - ${order.id}</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              width: 80mm;
              margin: 0;
              padding: 10px;
              font-size: 12px;
            }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            .divider {
              border-top: 1px dashed #000;
              margin: 10px 0;
            }
            .item-row {
              display: flex;
              justify-content: space-between;
              margin: 5px 0;
            }
            .total-row {
              font-weight: bold;
              font-size: 14px;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Receipt Preview */}
        <div className="p-8">
          <div ref={printRef} className="font-mono text-black">
            <div className="center">
              <div className="text-2xl bold mb-2">Hook</div>
              <div className="text-sm">Premium Café</div>
            </div>

            <div className="divider"></div>

            <div className="text-sm">
              <div>Order #: {order.id}</div>
              <div>Date: {formatDate(order.createdAt)}</div>
              <div>Payment: {order.paymentMethod}</div>
            </div>

            <div className="divider"></div>

            <div>
              {order.items.map((item, index) => (
                <div key={index}>
                  <div className="bold">{item.name}</div>
                  <div className="item-row text-sm">
                    <span>
                      {item.size} × {item.quantity}
                    </span>
                    <span>{item.price * item.quantity} EGP</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="divider"></div>

            <div className="item-row total-row">
              <span>TOTAL</span>
              <span>{order.total} EGP</span>
            </div>

            <div className="divider"></div>

            <div className="center text-sm">
              <div>Thank you for choosing Hook</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 p-4 flex gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 bg-[#C9A24D] text-white py-2 rounded-lg hover:bg-[#D4B264] transition-colors"
          >
            Print Receipt
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
