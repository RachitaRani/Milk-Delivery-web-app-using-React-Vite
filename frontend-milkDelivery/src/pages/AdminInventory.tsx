// import React, { useState } from 'react';
// import { Plus, Edit2, Save, Trash2, X } from 'lucide-react';

// const initialInventory = [
//   { id: '1', name: 'Soy Milk', quantity: 12, price: 45.5 },
//   { id: '2', name: 'Rice Milk', quantity: 50, price: 40.0 },
//   { id: '3', name: 'Coconut Milk', quantity: 100, price: 50.0 },
//   { id: '4', name: 'Hemp Milk', quantity: 9, price: 65.5 },
//   { id: '5', name: 'Dairy Milk', quantity: 100, price: 55.0 },
//   { id: '6', name: 'Almond Milk', quantity: 10, price: 64.99 },
// ];

// type Product = {
//   id: string;
//   name: string;
//   quantity: number;
//   price: number;
// };

// export function AdminInventory() {
//   const [inventory, setInventory] = useState(initialInventory);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [newQuantity, setNewQuantity] = useState<number>(0);
//   const [newPrice, setNewPrice] = useState<number>(0);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
//     name: '',
//     quantity: 0,
//     price: 0,
//   });

//   const handleEdit = (id: string, currentQuantity: number, currentPrice: number) => {
//     setEditingId(id);
//     setNewQuantity(currentQuantity);
//     setNewPrice(currentPrice);
//   };

//   const handleSave = (id: string) => {
//     setInventory(inventory.map(item => 
//       item.id === id ? { ...item, quantity: newQuantity, price: newPrice } : item
//     ));
//     setEditingId(null);
//   };

//   const handleDelete = (id: string) => {
//     if (confirm('Are you sure you want to delete this product?')) {
//       setInventory(inventory.filter(item => item.id !== id));
//     }
//   };

//   const handleAddProduct = () => {
//     if (newProduct.name && newProduct.quantity > 0 && newProduct.price > 0) {
//       const newId = (inventory.length + 1).toString();
//       setInventory([...inventory, { ...newProduct, id: newId }]);
//       setNewProduct({ name: '', quantity: 0, price: 0 });
//       setShowAddForm(false);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
//         <button 
//           onClick={() => setShowAddForm(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
//         >
//           <Plus className="h-5 w-5 mr-2" />
//           Add New Product
//         </button>
//       </div>
//       {showAddForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">Add New Product</h3>
//               <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700">
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
//                 <input
//                   type="text"
//                   value={newProduct.name}
//                   onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//                   className="w-full border rounded-md px-3 py-2"
//                   placeholder="Enter product name"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (liters)</label>
//                 <input
//                   type="number"
//                   value={newProduct.quantity}
//                   onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
//                   className="w-full border rounded-md px-3 py-2"
//                   min="0"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Price per liter (Rs.)</label>
//                 <input
//                   type="number"
//                   value={newProduct.price}
//                   onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
//                   className="w-full border rounded-md px-3 py-2"
//                   min="0"
//                   step="0.01"
//                 />
//               </div>
//               <button
//                 onClick={handleAddProduct}
//                 className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mt-4"
//               >
//                 Add Product
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

// <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {inventory.map((item) => (
//               <tr key={item.id}>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm font-medium text-gray-900">{item.name}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {editingId === item.id ? (
//                     <input
//                       type="number"
//                       value={newQuantity}
//                       onChange={(e) => setNewQuantity(Number(e.target.value))}
//                       className="w-24 px-2 py-1 border rounded-md"
//                       min="0"
//                     />
//                   ) : (
//                     <div className="text-sm text-gray-900">{item.quantity} liters</div>
//                   )}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {editingId === item.id ? (
//                     <input
//                       type="number"
//                       value={newPrice}
//                       onChange={(e) => setNewPrice(Number(e.target.value))}
//                       className="w-24 px-2 py-1 border rounded-md"
//                       min="0"
//                       step="0.01"
//                     />
//                   ) : (
//                     <div className="text-sm text-gray-900">Rs.{item.price.toFixed(2)}</div>
//                   )}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <div className="flex space-x-3">
//                     {editingId === item.id ? (
//                       <button
//                         onClick={() => handleSave(item.id)}
//                         className="text-green-600 hover:text-green-900 flex items-center"
//                       >
//                         <Save className="h-4 w-4 mr-1" />
//                         Save
//                       </button>
//                     ) : (
//                       <>
//                         <button
//                           onClick={() => handleEdit(item.id, item.quantity, item.price)}
//                           className="text-blue-600 hover:text-blue-900 flex items-center"
//                         >
//                           <Edit2 className="h-4 w-4 mr-1" />
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item.id)}
//                           className="text-red-600 hover:text-red-900 flex items-center"
//                         >
//                           <Trash2 className="h-4 w-4 mr-1" />
//                           Delete
//                         </button>
//                       </>
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

// ....With backend APIs built in springboot
import React, { useState, useEffect } from "react";
import { Plus, Edit2, Save, Trash, Trash2, X } from "lucide-react";
import axios from "axios";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export function AdminInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newQuantity, setNewQuantity] = useState<number>(0);
  const [newPrice, setNewPrice] = useState<number>(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({ name: "", quantity: 0, price: 0 });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:8080/api/inventory")
      if (Array.isArray(response.data)) {
        setInventory(response.data);
      } else {
        setInventory([]);
        setError('Invalid data received from server');
      }
    } catch (error) {
      console.error('Failed to fetch inventory:', error);
      setError('Failed to fetch inventory. Please try again.');
      setInventory([]);
    } finally {
      setLoading(false);
    }
  };
 

  const handleAdd = async () => {
    if (newProduct.name && newProduct.quantity > 0 && newProduct.price > 0) {
      try {
        const response = await axios.post('http://localhost:8080/api/inventory', newProduct);
        if (response.data && response.data.id) {
          setInventory([...inventory, response.data]);
          setNewProduct({ name: '', quantity: 0, price: 0 });
          setShowAddForm(false);
        } else {
          throw new Error('Invalid response data');
        }
      } catch (error) {
        console.error('Failed to add product:', error);
        alert('Failed to add product. Please try again.');
      }
    }
  };

  // const handleAdd = () => {
  //   if (newProduct.name && newProduct.quantity > 0 && newProduct.price > 0) {
  //     try {
  //   fetch("http://localhost:8080/api/inventory", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(newProduct),
  //   })
  //     .then((response) => response.json())
  //     .then((data: InventoryItem) => {
  //       setInventory([...inventory, data]);
  //       setNewProduct({ name: "", quantity: 0, price: 0 });
  //     });
  //     setShowAddForm(false);
  //   }catch(error){
  //     console.error('Failed to add product:', error);
  //     alert('Failed to add product. Please try again.');
  //   }
  // };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Loading inventory...</div>
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

  const handleEdit = (id: string, currentQuantity: number, currentPrice: number) => {
    setEditingId(id);
    setNewQuantity(currentQuantity);
    setNewPrice(currentPrice);
  };

  const handleSave = async (id: string) => {
    try{
      await axios.put('http://localhost:8080/api/inventory/${id}',{
        id,
        quantity: newQuantity,
        price: newPrice
      });
        setInventory(
          inventory.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity, price: newPrice } : item
          ));
        setEditingId(null);
      }catch (error) {
        console.error('Failed to update inventory:', error);
        alert('Failed to update inventory. Please try again.');
      }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:8080/api/inventory/${id}`);
        setInventory(inventory.filter(item => item.id !== id));
      } catch (error) {
        console.error('Failed to delete product:', error);
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Product
        </button>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Product</h3>
              <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (liters)</label>
                <input
                  type="number"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
                  className="w-full border rounded-md px-3 py-2"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price per liter (Rs.)</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                  className="w-full border rounded-md px-3 py-2"
                  min="0"
                  step="0.01"
                />
              </div>
              <button
                onClick={handleAdd}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mt-4"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {inventory.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
          No products in inventory
        </div>
      ) : (
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
                        min="0"
                      />
                    ) : (
                      <div className="text-sm text-gray-900">{item.quantity} liters</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === item.id ? (
                      <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(Number(e.target.value))}
                        className="w-24 px-2 py-1 border rounded-md"
                        min="0"
                        step="0.01"
                      />
                    ) : (
                      <div className="text-sm text-gray-900">Rs.{item.price.toFixed(2)}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      {editingId === item.id ? (
                        <button
                          onClick={() => handleSave(item.id)}
                          className="text-green-600 hover:text-green-900 flex items-center"
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(item.id, item.quantity, item.price)}
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                          >
                            <Edit2 className="h-4 w-4 mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-900 flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
