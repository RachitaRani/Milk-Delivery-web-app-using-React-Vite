// import React, { useState } from 'react';
// import { Package, Clock, CheckCircle, XCircle, Search, CreditCard, Wallet } from 'lucide-react';

// const mockOrders = [
//   {
//     id: '1',
//     customerName: 'Jennie',
//     email: 'jennie@demo.com',
//     milkType: { name: 'Dairy Milk', price: 55.00 },
//     quantity: 2,
//     status: 'DELIVERED',
//     createdAt: '2025-03-10',
//     paymentMode: 'UPI',
//   },
//   {
//     id: '2',
//     customerName: 'V',
//     email: 'tae@demo.com',
//     milkType: { name: 'Almond Milk', price: 64.99 },
//     quantity: 1,
//     status: 'PENDING',
//     createdAt: '2025-03-11',
//     paymentMode: 'CASH',
//   },
// ];

// type OrderStatus = 'PENDING' | 'CONFIRMED' | 'DELIVERED' | 'CANCELLED';

// export function AdminOrders() {

//   const [orders, setOrders] = useState(mockOrders);
//   const [statusFilter, setStatusFilter] = useState<OrderStatus | 'ALL'>('ALL');
//   const [dateFilter, setDateFilter] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
//     setOrders(orders.map(order => 
//       order.id === orderId ? { ...order, status: newStatus } : order
//     ));
//   };

//   const handleCancelOrder = (orderId: string) => {
//     if (confirm('Are you sure you want to cancel this order?')) {
//       handleUpdateStatus(orderId, 'CANCELLED');
//     }
//   };

//   const filteredOrders = orders.filter(order => {
//     const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
//     const matchesDate = !dateFilter || order.createdAt === dateFilter;
//     const matchesSearch = !searchTerm || 
//       order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.milkType.name.toLowerCase().includes(searchTerm.toLowerCase());
    
//     return matchesStatus && matchesDate && matchesSearch;
//   });

//   const getPaymentIcon = (paymentMode: string) => {
//     switch (paymentMode) {
//       case 'CARD':
//         return <CreditCard className="h-4 w-4 text-blue-500" />;
//       case 'CASH':
//         return <Wallet className="h-4 w-4 text-green-500" />;
//       case 'UPI':
//         return <Package className="h-4 w-4 text-purple-500" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-2xl font-bold text-gray-900">All Orders</h2>
//         <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
//           <div className="relative">
//             <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search orders..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-64"
//             />
//           </div>
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'ALL')}
//             className="border rounded-md px-3 py-2"
//           >
//             <option value="ALL">All Status</option>
//             <option value="PENDING">Pending</option>
//             <option value="CONFIRMED">Confirmed</option>
//             <option value="DELIVERED">Delivered</option>
//             <option value="CANCELLED">Cancelled</option>
//           </select>
//           <input
//             type="date"
//             value={dateFilter}
//             onChange={(e) => setDateFilter(e.target.value)}
//             className="border rounded-md px-3 py-2"
//           />
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Info</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredOrders.map((order) => (
//               <tr key={order.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center">
//                     <Package className="h-5 w-5 text-blue-500 mr-2" />
//                     <div>
//                       <div className="text-sm font-medium text-gray-900">
//                         {order.milkType.name} x {order.quantity}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         Total: Rs. {(order.milkType.price * order.quantity).toFixed(2)}
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
//                   <div className="text-sm text-gray-500">{order.email}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center space-x-2">
//                     {getPaymentIcon(order.paymentMode)}
//                     <span className="text-sm text-gray-900">{order.paymentMode}</span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center">
//                   {order.status === 'PENDING' && <Clock className="h-5 w-5 text-yellow-500 mr-1" />}
//                     {order.status === 'CONFIRMED' && <CheckCircle className="h-5 w-5 text-blue-500 mr-1" />}
//                     {order.status === 'DELIVERED' && <CheckCircle className="h-5 w-5 text-green-500 mr-1" />}
//                     {order.status === 'CANCELLED' && <XCircle className="h-5 w-5 text-red-500 mr-1" />}
//                     <span className={`text-sm ${
//                       order.status === 'PENDING' ? 'text-yellow-500' :
//                       order.status === 'CONFIRMED' ? 'text-blue-500' :
//                       order.status === 'DELIVERED' ? 'text-green-500' :
//                       'text-red-500'
//                     }`}>
//                       {order.status}
//                     </span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     {new Date(order.createdAt).toLocaleTimeString()}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <div className="flex space-x-2">
//                   {order.status !== 'CANCELLED' && order.status !== 'DELIVERED' && (
//                       <div className="relative group">
//                         <button className="text-blue-600 hover:text-blue-900">
//                           <Clock className="h-5 w-5" />
//                         </button>
//                         <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
//                           <button
//                             onClick={() => handleUpdateStatus(order.id, 'PENDING')}
//                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                           >
//                             Mark as Pending
//                           </button>
//                           <button
//                             onClick={() => handleUpdateStatus(order.id, 'CONFIRMED')}
//                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                           >
//                             Mark as Confirmed
//                           </button>
//                           <button
//                             onClick={() => handleUpdateStatus(order.id, 'DELIVERED')}
//                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                           >
//                             Mark as Delivered
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                     {order.status !== 'CANCELLED' && (
//                       <button
//                         onClick={() => handleCancelOrder(order.id)}
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         <XCircle className="h-5 w-5" />
//                       </button>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


//.....With Springboot APIs..

import React, { useState, useEffect } from "react";
import { Package, Clock, CheckCircle, XCircle, CreditCard, Wallet, Search } from 'lucide-react';
import axios from "axios";

interface Order {
  id: string;
  customerName: string;
  email: string;
  milkType: string;
  quantity: number;
  totalPrice: number;
  orderStatus: string;
  createdAt: string;
paymentMode: 'CARD' | 'CASH' | 'UPI';
}

type OrderStatus = 'ALL' |'PENDING' | 'CONFIRMED' | 'DELIVERED' | 'CANCELLED';

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<string>("");
 const [searchTerm, setSearchTerm] = useState('');
 const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
  // Fetch orders from API
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8080/api/orders/viewallorders");
  //       const data = await response.json();
  //       setOrders(data);
  //       console.log("Orders Data:",data);
  //     } catch (error) {
  //       console.error("Error fetching orders:", error);
  //     }
  //   };

  //   fetchOrders();
  // }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:8080/api/orders/viewallorders")
      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        setOrders([]);
        setError('Invalid data received from server');
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setError('Failed to fetch orders. Please try again.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Loading Orders...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-700">{error}</div>
          <button
            onClick={window.location.reload}
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Apply filtering based on status and date
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'ALL' || order.orderStatus === filterStatus;
    const matchesDate = !filterDate || order.createdAt.split('T')[0] === filterDate;
    const matchesSearch = !searchTerm || 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.milkType.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesDate && matchesSearch;
  });

  const getPaymentIcon = (paymentMode: string) => {
    switch (paymentMode) {
      case 'CARD':
        return <CreditCard className="h-4 w-4 text-blue-500" />;
      case 'CASH':
        return <Wallet className="h-4 w-4 text-green-500" />;
      case 'UPI':
        return <Package className="h-4 w-4 text-purple-500" />;
      default:
        return null;
    }
  };

  //update status
  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await axios.put('http://localhost:8080/api/orders/viewallorders', {
        orderId,
        orderStatus: newStatus
      });
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, orderStatus: newStatus } : order
      ));
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('Failed to update order status. Please try again.');
    }
  };

  // Delete the order
  const handleDeleteOrder = async (orderId: string) => {
    if (confirm('Are you sure you want to cancel this order?')) {
      await handleUpdateStatus(orderId, 'CANCELLED');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">All Orders</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-64"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as OrderStatus | 'ALL')}
            className="border rounded-md px-3 py-2"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border rounded-md px-3 py-2"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {order.milkType} x {order.quantity}
                      </div>
                      <div className="text-sm text-gray-500">
                        Total: Rs.{order.totalPrice}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                  <div className="text-sm text-gray-500">{order.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {getPaymentIcon(order.paymentMode)}
                    <span className="text-sm text-gray-900">{order.paymentMode}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {order.orderStatus === 'PENDING' && <Clock className="h-5 w-5 text-yellow-500 mr-1" />}
                    {order.orderStatus === 'CONFIRMED' && <CheckCircle className="h-5 w-5 text-blue-500 mr-1" />}
                    {order.orderStatus === 'DELIVERED' && <CheckCircle className="h-5 w-5 text-green-500 mr-1" />}
                    {order.orderStatus === 'CANCELLED' && <XCircle className="h-5 w-5 text-red-500 mr-1" />}
                    <span className={`text-sm ${
                      order.orderStatus === 'PENDING' ? 'text-yellow-500' :
                      order.orderStatus === 'CONFIRMED' ? 'text-blue-500' :
                      order.orderStatus === 'DELIVERED' ? 'text-green-500' :
                      'text-red-500'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(order.createdAt).toDateString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {order.orderStatus !== 'CANCELLED' && order.orderStatus !== 'DELIVERED' && (
                      <div className="relative group">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Clock className="h-5 w-5" />
                        </button>
                        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'PENDING')}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            Mark as Pending
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'CONFIRMED')}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            Mark as Confirmed
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'DELIVERED')}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            Mark as Delivered
                          </button>
                          <button onClick={() => handleUpdateStatus(order.id, 'CANCELLED')}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                              Mark as Cancelled
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}