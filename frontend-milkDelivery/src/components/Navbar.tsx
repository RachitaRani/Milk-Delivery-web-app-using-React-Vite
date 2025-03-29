import React from 'react';
import { Milk, ShoppingCart, Package } from 'lucide-react';

type NavbarProps = {
  role: 'ADMIN' | 'CUSTOMER';
  onNavigate: (page: string) => void;
  currentPage: string;
};

export function Navbar({ role, onNavigate, currentPage }: NavbarProps) {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Milk className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">MilkMart</span>
          </div>
          
          <div className="flex space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                currentPage === 'home'
                  ? 'border-blue-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Home
            </button>
            
            {role === 'CUSTOMER' && (
              <button
                onClick={() => onNavigate('orders')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  currentPage === 'orders'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                My Orders
              </button>
            )}
            
            {role === 'ADMIN' && (
              <>
                <button
                  onClick={() => onNavigate('inventory')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    currentPage === 'inventory'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Package className="w-4 h-4 mr-1" />
                  Inventory
                </button>
                <button
                  onClick={() => onNavigate('allOrders')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    currentPage === 'allOrders'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  All Orders
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}