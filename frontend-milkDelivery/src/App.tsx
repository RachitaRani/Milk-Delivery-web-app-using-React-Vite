import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { CustomerOrders } from './pages/CustomerOrders';
import { AdminInventory } from './pages/AdminInventory';
import { AdminOrders } from './pages/AdminOrders';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  // For demo purposes, we'll hardcode the role. In a real app, this would come from authentication
  const [userRole] = useState<'ADMIN' | 'CUSTOMER'>('ADMIN');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'orders':
        return <CustomerOrders />;
      case 'inventory':
        return <AdminInventory />;
      case 'allOrders':
        return <AdminOrders />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        role={userRole}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;