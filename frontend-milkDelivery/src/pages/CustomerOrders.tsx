import React from 'react';
import { Package, Clock, CheckCircle } from 'lucide-react';

const mockOrders = [
  {
    id: '1',
    milkType: { name: 'Dairy Milk', price: 55.0 },
    quantity: 2,
    status: 'DELIVERED',
    createdAt: '2024-03-10',
  },
  {
    id: '2',
    milkType: { name: 'Almond Milk', price: 64.99 },
    quantity: 1,
    status: 'PENDING',
    createdAt: '2024-03-11',
  },
];

export function CustomerOrders() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h2>
      
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Package className="h-8 w-8 text-blue-500" />
                <div>
                  <h3 className="text-lg font-semibold">{order.milkType.name}</h3>
                  <p className="text-gray-600">
                    Quantity: {order.quantity} liters • Total: Rs.{(order.milkType.price * order.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  {order.status === 'PENDING' ? (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  <span className={order.status === 'PENDING' ? 'text-yellow-500' : 'text-green-500'}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Ordered on {order.createdAt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
