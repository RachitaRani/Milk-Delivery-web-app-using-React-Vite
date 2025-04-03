import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Plus, Package, Edit2, Save, Trash2 } from 'lucide-react';
// import { AdminInventory } from '../pages/AdminInventory';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

interface InventoryItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}  

export function AdminDashboard() {
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

      const handleAddProduct = async () => {
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
          await axios.patch(`http://localhost:8080/api/inventory/update/${id}`,{
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
            await axios.delete(`http://localhost:8080/api/inventory/delete/${id}`);
            setInventory(inventory.filter(item => item.id !== id));
          } catch (error) {
            console.error('Failed to delete product:', error);
            alert('Failed to delete product. Please try again.');
          }
        }
      };
    

  const chartData = {
    labels: inventory.map(item => item.name),
    datasets: [
      {
        data: inventory.map(item => item.quantity),
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#EC4899',
          "#007D9C",
          "#244D70",
          "#D123B3",
          "#F7E018",
          "#FE452A",
        ],
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Inventory Distribution</h3>
        <div className="w-full max-w-md mx-auto">
          <Pie data={chartData} />
        </div>
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
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-blue-500 mr-2" />
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.quantity} liters</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Rs.{item.price.toFixed(2)}</div>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td> */}
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

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
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
              <div className="flex space-x-3">
                <button
                  onClick={handleAddProduct}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Product
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}