import React, { useState } from 'react';
import { Plus, Edit2, Save } from 'lucide-react';

const initialInventory = [
  { id: '1', name: 'Soy Milk', quantity: 12, price: 45.5 },
  { id: '2', name: 'Rice Milk', quantity: 50, price: 40.0 },
  { id: '3', name: 'Coconut Milk', quantity: 100, price: 50.0 },
  { id: '4', name: 'Hemp Milk', quantity: 9, price: 65.5 },
  { id: '5', name: 'Dairy Milk', quantity: 100, price: 55.0 },
  { id: '6', name: 'Almond Milk', quantity: 10, price: 64.99 },
];

export function AdminInventory() {
  const [inventory, setInventory] = useState(initialInventory);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newQuantity, setNewQuantity] = useState<number>(0);

  const handleEdit = (id: string, currentQuantity: number) => {
    setEditingId(id);
    setNewQuantity(currentQuantity);
  };

  const handleSave = (id: string) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
    setEditingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Add New Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventory.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === item.id ? (
                    <input
                      type="number"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(Number(e.target.value))}
                      className="w-24 px-2 py-1 border rounded-md"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">{item.quantity} liters</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Rs.{item.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingId === item.id ? (
                    <button
                      onClick={() => handleSave(item.id)}
                      className="text-green-600 hover:text-green-900 flex items-center"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(item.id, item.quantity)}
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ....With backend APIs built in springboot
// import React, { useState, useEffect } from "react";
// import { Plus, Edit2, Save, Trash } from "lucide-react";

// interface InventoryItem {
//   id: string;
//   name: string;
//   quantity: number;
//   price: number;
// }

// export function AdminInventory() {
//   const [inventory, setInventory] = useState<InventoryItem[]>([]);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [newQuantity, setNewQuantity] = useState<number>(0);
//   const [newItem, setNewItem] = useState({ name: "", quantity: 0, price: 0 });

//   useEffect(() => {
//     fetch("http://localhost:8080/api/inventory")
//       .then((response) => response.json())
//       .then((data: InventoryItem[]) => setInventory(data));
//   }, []);

//   const handleAdd = () => {
//     fetch("http://localhost:8080/api/inventory", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newItem),
//     })
//       .then((response) => response.json())
//       .then((data: InventoryItem) => {
//         setInventory([...inventory, data]);
//         setNewItem({ name: "", quantity: 0, price: 0 });
//       });
//   };

//   const handleEdit = (id: string, currentQuantity: number) => {
//     setEditingId(id);
//     setNewQuantity(currentQuantity);
//   };

//   const handleSave = (id: string) => {
//     fetch(`http://localhost:8080/api/inventory/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ quantity: newQuantity }),
//     })
//       .then((response) => response.json())
//       .then((updatedItem: InventoryItem) => {
//         setInventory(
//           inventory.map((item) =>
//             item.id === id ? { ...item, quantity: updatedItem.quantity } : item
//           )
//         );
//         setEditingId(null);
//       });
//   };

//   const handleDelete = (id: string) => {
//     fetch(`http://localhost:8080/api/inventory/${id}`, {
//       method: "DELETE",
//     }).then(() => {
//       setInventory(inventory.filter((item) => item.id !== id));
//     });
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
//         <div className="flex space-x-2 items-center">
//           <input
//             type="text"
//             placeholder="Product Name"
//             value={newItem.name}
//             onChange={(e) =>
//               setNewItem((prev) => ({ ...prev, name: e.target.value }))
//             }
//             className="px-2 py-1 border rounded-md"
//           />
//           <input
//             type="number"
//             placeholder="Quantity"
//             value={newItem.quantity}
//             onChange={(e) =>
//               setNewItem((prev) => ({ ...prev, quantity: Number(e.target.value) }))
//             }
//             className="px-2 py-1 border rounded-md"
//           />
//           <input
//             type="number"
//             placeholder="Price"
//             value={newItem.price}
//             onChange={(e) =>
//               setNewItem((prev) => ({ ...prev, price: Number(e.target.value) }))
//             }
//             className="px-2 py-1 border rounded-md"
//           />
//           <button
//             onClick={handleAdd}
//             className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
//           >
//             <Plus className="h-5 w-5 mr-2" />
//             Add Product
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Product
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Quantity
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Price
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {inventory.map((item) => (
//               <tr key={item.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm font-medium text-gray-900">
//                     {item.name}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {editingId === item.id ? (
//                     <input
//                       type="number"
//                       value={newQuantity}
//                       onChange={(e) => setNewQuantity(Number(e.target.value))}
//                       className="w-24 px-2 py-1 border rounded-md"
//                     />
//                   ) : (
//                     <div className="text-sm text-gray-900">
//                       {item.quantity} liters
//                     </div>
//                   )}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">
//                     Rs.{item.price.toFixed(2)}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   {editingId === item.id ? (
//                     <button
//                       onClick={() => handleSave(item.id)}
//                       className="text-green-600 hover:text-green-900 flex items-center"
//                     >
//                       <Save className="h-4 w-4 mr-1" />
//                       Save
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleEdit(item.id, item.quantity)}
//                       className="text-blue-600 hover:text-blue-900 flex items-center"
//                     >
//                       <Edit2 className="h-4 w-4 mr-1" />
//                       Edit
//                     </button>
//                   )}
//                   <button
//                     onClick={() => handleDelete(item.id)}
//                     className="text-red-600 hover:text-red-900 flex items-center"
//                   >
//                     <Trash className="h-4 w-4 mr-1" />
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
