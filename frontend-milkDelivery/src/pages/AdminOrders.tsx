import React from 'react';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

const mockOrders = [
  {
    id: '1',
    customerName: 'John Doe',
    email: 'john@example.com',
    milkType: { name: 'Dairy Milk', price: 3.99 },
    quantity: 2,
    status: 'DELIVERED',
    createdAt: '2024-03-10',
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    email: 'jane@example.com',
    milkType: { name: 'Almond Milk', price: 4.99 },
    quantity: 1,
    status: 'PENDING',
    createdAt: '2024-03-11',
  },
];

export function AdminOrders() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">All Orders</h2>
        <div className="flex space-x-4">
          <select className="border rounded-md px-3 py-2">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="delivered">Delivered</option>
          </select>
          <input
            type="date"
            className="border rounded-md px-3 py-2"
            placeholder="Filter by date"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {order.milkType.name} x {order.quantity}
                      </div>
                      <div className="text-sm text-gray-500">
                        Total: ${(order.milkType.price * order.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                  <div className="text-sm text-gray-500">{order.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {order.status === 'PENDING' ? (
                      <Clock className="h-5 w-5 text-yellow-500 mr-1" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-1" />
                    )}
                    <span className={`text-sm ${
                      order.status === 'PENDING' ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">Update Status</button>
                    <button className="text-red-600 hover:text-red-900 flex items-center">
                      <XCircle className="h-4 w-4 mr-1" />
                      Cancel
                    </button>
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


//.....With Springboot APIs..

// import React, { useState, useEffect } from "react";
// import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

// interface Order {
//   id: string;
//   customerName: string;
//   email: string;
//   milkType: string;
//   quantity: number;
//   totalPrice: number;
//   status: string;
//   createdAt: string;
// }

// export function AdminOrders() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [filterStatus, setFilterStatus] = useState<string>("all");
//   const [filterDate, setFilterDate] = useState<string>("");

//   // Fetch orders from API
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/api/orders/viewallorders");
//         const data = await response.json();
//         setOrders(data);
//         console.log("Orders Data:",data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Apply filtering based on status and date
//   const filteredOrders = orders.filter((order) => {
//     const matchesStatus =
//       filterStatus === "all" || order.status.toLowerCase() === filterStatus.toLowerCase();
//     const matchesDate = !filterDate || order.createdAt === filterDate;
//     return matchesStatus && matchesDate;
//   });

//    // Update the status of the order
//    const handleStatusChange = (orderId: string, value: string) => {
//     setOrders((prevOrders) =>
//       prevOrders.map((order) =>
//         order.id === orderId ? { ...order, status: value } : order
//       )
//     );
//   };

//   // Toggle for showing/hiding the status update dropdown
//   const [showStatusMenu, setShowStatusMenu] = useState<{ [key: string]: boolean }>({});

//   const toggleStatusMenu = (orderId: string) => {
//     setShowStatusMenu((prev) => ({
//       ...prev,
//       [orderId]: !prev[orderId],
//     }));
//   };

//   // Delete the order
//   const handleDeleteOrder = (orderId: string) => {
//     fetch(`http://localhost:8080/api/orders/${orderId}`, {
//       method: "DELETE",
//     }).then(() => {
//       setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
//     });
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-2xl font-bold text-gray-900">All Orders</h2>
//         <div className="flex space-x-4">
//           <select className="border rounded-md px-3 py-2">
//             <option value="all">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="confirmed">Confirmed</option>
//             <option value="delivered">Delivered</option>
//           </select>
//           <input
//             type="date"
//             className="border rounded-md px-3 py-2"
//             value={filterDate}
//             onChange={(e) => setFilterDate(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Info</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
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
//                         {order.milkType} x {order.quantity}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         Total: Rs.{order.totalPrice}
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
//                   <div className="text-sm text-gray-500">{order.email}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center">
//                   {order.status === 'PENDING' && (
//                       <Clock className="h-5 w-5 text-yellow-500 mr-1" />
//                     )}
//                     {order.status === 'CONFIRMED' && (
//                       <CheckCircle className="h-5 w-5 text-blue-500 mr-1" />
//                     )}
//                     {order.status === 'DELIVERED' && (
//                       <CheckCircle className="h-5 w-5 text-green-500 mr-1" />
//                     )}
//                     <span
//                       className={`text-sm ${
//                         order.status === 'PENDING'
//                           ? 'text-yellow-500'
//                           : order.status === 'CONFIRMED'
//                           ? 'text-blue-500'
//                           : 'text-green-500'
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <div className="flex space-x-2">
//                      {/* Update status button */}
//                      <button
//                       onClick={() => toggleStatusMenu(order.id)}
//                       className="text-blue-600 hover:text-blue-900"
//                     >
//                       {showStatusMenu[order.id] ? 'Cancel Order' : 'Update Status'}
//                     </button>

//                     {/* If status menu is shown, display the select */}
//                     {showStatusMenu[order.id] && (
//                       <select
//                         value={order.status}
//                         onChange={(e) => handleStatusChange(order.id, e.target.value)}
//                         className="border rounded-md px-3 py-2"
//                       >
//                         <option value="PENDING">Mark as Pending</option>
//                         <option value="CONFIRMED">Mark as Confirmed</option>
//                         <option value="DELIVERED">Mark as Delivered</option>
//                       </select>
//                     )}
//                     {/*cancel order button  */}
//                     <button className="text-red-600 hover:text-red-900 flex items-center" onClick={()=> handleDeleteOrder(order.id)}>
//                       <XCircle className="h-4 w-4 mr-1" />
//                       Cancel Order
//                     </button>
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