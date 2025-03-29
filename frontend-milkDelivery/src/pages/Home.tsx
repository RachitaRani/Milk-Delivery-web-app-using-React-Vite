// import React, { useState } from 'react';
// import { Droplet, X, AlertCircle } from 'lucide-react';

// const milkTypes = [
//   { id: '1', name: 'Soy Milk', quantity: 12, price: 45.5 },
//   { id: '2', name: 'Rice Milk', quantity: 50, price: 40.0 },
//   { id: '3', name: 'Coconut Milk', quantity: 100, price: 50.0 },
//   { id: '4', name: 'Hemp Milk', quantity: 9, price: 65.5 },
//   { id: '5', name: 'Dairy Milk', quantity: 100, price: 55.0 },
//   { id: '6', name: 'Almond Milk', quantity: 10, price: 64.99 },
// ];

// type OrderFormData = {
//   customerName: string;
//   email: string;
//   address: string;
//   quantity: number;
//   paymentMode: 'CARD' | 'CASH' | 'UPI';
// };

// type ValidationErrors = {
//   customerName?: string;
//   email?: string;
//   address?: string;
//   quantity?: string;
// };

// export function Home() {
//   const [selectedMilk, setSelectedMilk] = useState<(typeof milkTypes)[0] | null>(null);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [errors, setErrors] = useState<ValidationErrors>({});
//   const [formData, setFormData] = useState<OrderFormData>({
//     customerName: '',
//     email: '',
//     address: '',
//     quantity: 1,
//     paymentMode: 'CARD',
//   });

//   const handleOrder = (milk: typeof milkTypes[0]) => {
//     setSelectedMilk(milk);
//     setFormData({
//       customerName: '',
//       email: '',
//       address: '',
//       quantity: 1,
//       paymentMode: 'CARD',
//     });
//     setErrors({});
//     setShowConfirmation(false);
//   };

//   const validateForm = (): boolean => {
//     const newErrors: ValidationErrors = {};

//     // Name validation
//     if (formData.customerName.trim().length < 3) {
//       newErrors.customerName = 'Name must be at least 3 characters long';
//     }
//     if (!/^[a-zA-Z\s]*$/.test(formData.customerName)) {
//       newErrors.customerName = 'Name should only contain letters and spaces';
//     }

//     // Email validation
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }

//     // Address validation
//     if (formData.address.trim().length < 10) {
//       newErrors.address = 'Please enter a complete delivery address';
//     }

//     // Quantity validation
//     if (selectedMilk && (formData.quantity < 1 || formData.quantity > selectedMilk.quantity)) {
//       newErrors.quantity = `Quantity must be between 1 and ${selectedMilk.quantity} liters`;
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedMilk) return;

//     if (validateForm()) {
//       setShowConfirmation(true);
//     }
//   };

//   const confirmOrder = () => {
//     if (!selectedMilk) return;

//     // Here you would typically make an API call to submit the order
//     console.log('Order submitted:', {
//       ...formData,
//       milkType: selectedMilk,
//       totalPrice: selectedMilk.price * formData.quantity,
//     });

//     // Close the form and show success message
//     alert('Order placed successfully!');
//     setSelectedMilk(null);
//     setShowConfirmation(false);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold text-gray-900 mb-4">Fresh Milk Delivery</h1>
//         <p className="text-lg text-gray-600">Choose from our wide variety of fresh and healthy milk options</p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {milkTypes.map((milk) => (
//           <div key={milk.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//             <div className="p-4">
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="text-lg font-semibold text-gray-900">{milk.name}</h3>
//                 <Droplet className="h-5 w-5 text-blue-500" />
//               </div>
//               <div className="space-y-1">
//                 <p className="text-gray-600 text-sm">Available: {milk.quantity} liters</p>
//                 <p className="text-gray-800 font-semibold">Rs.{milk.price.toFixed(2)} / liter</p>
//               </div>
//               <button
//                 className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm"
//                 onClick={() => handleOrder(milk)}
//               >
//                 Order Now
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Order Form Modal */}
//       {selectedMilk && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative">
//             <button
//               onClick={() => setSelectedMilk(null)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <X className="h-6 w-6" />
//             </button>
            
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Order {selectedMilk.name}</h2>
            
//             {!showConfirmation ? (
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     id="customerName"
//                     required
//                     className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm
//                       ${errors.customerName ? 'border-red-300' : 'border-gray-300'}`}
//                     value={formData.customerName}
//                     onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
//                   />
//                   {errors.customerName && (
//                     <p className="mt-1 text-sm text-red-600 flex items-center">
//                       <AlertCircle className="h-4 w-4 mr-1" />
//                       {errors.customerName}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     required
//                     className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm
//                       ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   />
//                   {errors.email && (
//                     <p className="mt-1 text-sm text-red-600 flex items-center">
//                       <AlertCircle className="h-4 w-4 mr-1" />
//                       {errors.email}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                     Delivery Address
//                   </label>
//                   <textarea
//                     id="address"
//                     required
//                     rows={2}
//                     className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm
//                       ${errors.address ? 'border-red-300' : 'border-gray-300'}`}
//                     value={formData.address}
//                     onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                   />
//                   {errors.address && (
//                     <p className="mt-1 text-sm text-red-600 flex items-center">
//                       <AlertCircle className="h-4 w-4 mr-1" />
//                       {errors.address}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
//                     Quantity (liters)
//                   </label>
//                   <input
//                     type="number"
//                     id="quantity"
//                     required
//                     min="1"
//                     max={selectedMilk.quantity}
//                     className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm
//                       ${errors.quantity ? 'border-red-300' : 'border-gray-300'}`}
//                     value={formData.quantity}
//                     onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
//                   />
//                   {errors.quantity && (
//                     <p className="mt-1 text-sm text-red-600 flex items-center">
//                       <AlertCircle className="h-4 w-4 mr-1" />
//                       {errors.quantity}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label htmlFor="paymentMode" className="block text-sm font-medium text-gray-700">
//                     Payment Mode
//                   </label>
//                   <select
//                     id="paymentMode"
//                     required
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     value={formData.paymentMode}
//                     onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value as 'CARD' | 'CASH' | 'UPI' })}
//                   >
//                     <option value="CARD">Card</option>
//                     <option value="CASH">Cash on Delivery</option>
//                     <option value="UPI">UPI</option>
//                   </select>
//                 </div>

//                 <div className="mt-6 bg-gray-50 p-4 rounded-md">
//                   <div className="flex justify-between text-sm text-gray-600 mb-2">
//                     <span>Price per liter:</span>
//                     <span>Rs.{selectedMilk.price.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-sm text-gray-600 mb-2">
//                     <span>Quantity:</span>
//                     <span>{formData.quantity} liters</span>
//                   </div>
//                   <div className="flex justify-between font-semibold text-gray-900 text-lg border-t pt-2">
//                     <span>Total:</span>
//                     <span>Rs.{(selectedMilk.price * formData.quantity).toFixed(2)}</span>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
//                 >
//                   Review Order
//                 </button>
//               </form>
//             ) : (
//               <div className="space-y-6">
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                   <h3 className="text-lg font-semibold text-blue-900 mb-4">Order Summary</h3>
//                   <div className="space-y-2">
//                     <p className="text-sm"><span className="font-medium">Name:</span> {formData.customerName}</p>
//                     <p className="text-sm"><span className="font-medium">Email:</span> {formData.email}</p>
//                     <p className="text-sm"><span className="font-medium">Address:</span> {formData.address}</p>
//                     <p className="text-sm"><span className="font-medium">Product:</span> {selectedMilk.name}</p>
//                     <p className="text-sm"><span className="font-medium">Quantity:</span> {formData.quantity} liters</p>
//                     <p className="text-sm"><span className="font-medium">Payment:</span> {formData.paymentMode}</p>
//                     <p className="text-lg font-semibold mt-4">
//                       Total Amount: Rs.{(selectedMilk.price * formData.quantity).toFixed(2)}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex space-x-4">
//                   <button
//                     onClick={() => setShowConfirmation(false)}
//                     className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
//                   >
//                     Edit Order
//                   </button>
//                   <button
//                     onClick={confirmOrder}
//                     className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
//                   >
//                     Confirm Order
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



//...With SpringBoot APIs...
import React, { useState, useEffect } from 'react';
import { AlertCircle, Droplet, X } from 'lucide-react';
import axios from 'axios';

type MilkType = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type OrderFormData = {
  customerName: string;
  email: string;
  address: string;
  quantity: number;
  paymentMode: 'CASH'; //add more payment modes
};

type ValidationErrors = {
  customerName?: string;
  email?: string;
  address?: string;
  quantity?: string;
};

export function Home() {
  const [milkTypes, setMilkTypes] = useState<MilkType[]>([]);
  const [selectedMilk, setSelectedMilk] = useState<MilkType | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    email: '',
    address: '',
    quantity: 1,
    paymentMode: 'CASH',
  });

  useEffect(() => {
    const fetchMilkTypes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/inventory");
        if (Array.isArray(response.data)) {
          setMilkTypes(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching milk types:", error);
        setMilkTypes([]); // Reset milkTypes to an empty array on error
      }
    };
  
    fetchMilkTypes();
  }, []);

  const handleOrder = (milk: MilkType) => {
    if (!milk) return; // Ensure a valid milk object is passed
    setSelectedMilk(milk); // Set the selected milk type for the modal
    setFormData({
      customerName: '',
      email: '',
      address: '',
      quantity: 1,
      paymentMode: 'CASH',
    });
    setErrors({});
    setShowConfirmation(false);
  };
  

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (formData.customerName.trim().length < 3) {
      newErrors.customerName = 'Name must be at least 3 characters long';
    }
    if (!/^[a-zA-Z\s]*$/.test(formData.customerName)) {
      newErrors.customerName = 'Name should only contain letters and spaces';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.address.trim().length < 10) {
      newErrors.address = 'Please enter a complete delivery address';
    }
    if (selectedMilk && (formData.quantity < 1 || formData.quantity > selectedMilk.quantity)) {
      newErrors.quantity = `Quantity must be between 1 and ${selectedMilk.quantity} liters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMilk) return;

    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  const confirmOrder = () => {
    if (!selectedMilk) return;

    const orderData = {
      ...formData,
      milkType: selectedMilk.name,
      totalPrice: selectedMilk.price * formData.quantity,
    };

    // Submit order to the backend
    axios
      .post('http://localhost:8080/api/orders', orderData) // Replace with your order submission endpoint
      .then((response) => {
        console.log("Response:",response)
        alert('Order placed successfully!');
        setSelectedMilk(null);
        setShowConfirmation(false);
      })
      .catch((error) => {
        console.error('Error placing order:', error);
        alert('Failed to place the order. Please try again.');
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Fresh Milk Delivery</h1>
        <p className="text-lg text-gray-600">Choose from our wide variety of fresh and healthy milk options</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {milkTypes.length > 0 ? (
        milkTypes.map((milk) => (
          <div key={milk.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{milk.name}</h3>
                <Droplet className="h-5 w-5 text-blue-500" />
              </div>
              <div className="space-y-1">
                <p className="text-gray-600 text-sm">Available: {milk.quantity} liters</p>
                <p className="text-gray-800 font-semibold">Rs. {milk.price?.toFixed(2) ?? "N/A"} / liter</p>
              </div>
              <button
                className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm"
                onClick={() => handleOrder(milk)}
              >
                Order Now
              </button>
            </div>
          </div>
           ))
      ): (
        <p className='text-center text-gray-500 col-span-full'>No Milk available at the moment.</p>
      )}
      </div>

  {/* Order Form Modal */}
{selectedMilk && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
      <button
        onClick={() => setSelectedMilk(null)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <X className="h-6 w-6" />
      </button>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Order {selectedMilk.name || 'Milk'}
      </h2>
      {!showConfirmation ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.customerName && (
              <p className="text-sm text-red-500 mt-1">{errors.customerName}</p>
            )}
          </div>

          <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                      ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Delivery Address
                  </label>
                  <textarea
                    id="address"
                    required
                    rows={2}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                      ${errors.address ? 'border-red-300' : 'border-gray-300'}`}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantity (liters)
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    required
                    min="1"
                    max={selectedMilk.quantity}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                      ${errors.quantity ? 'border-red-300' : 'border-gray-300'}`}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  />
                  {errors.quantity && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.quantity}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="paymentMode" className="block text-sm font-medium text-gray-700">
                    Payment Mode
                  </label>
                  <select
                    id="paymentMode"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.paymentMode}
                    onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value as 'CASH' })}
                  >
                    {/* <option value="CARD">Card</option> */}
                    <option value="CASH">Pay on Delivery</option>
                    {/* <option value="UPI">UPI</option> */}
                  </select>
                </div>

                <div className="mt-6 bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Price per liter:</span>
                    <span>Rs.{selectedMilk.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Quantity:</span>
                    <span>{formData.quantity} liters</span>
                  </div>
                  <div className="flex justify-between font-semibold text-gray-900 text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>Rs.{(selectedMilk.price * formData.quantity).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Review Order
                </button>
          {/* Other form fields */}
        </form>
      ) : (
        <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Order Summary</h3>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-medium">Name:</span> {formData.customerName}</p>
                    <p className="text-sm"><span className="font-medium">Email:</span> {formData.email}</p>
                    <p className="text-sm"><span className="font-medium">Address:</span> {formData.address}</p>
                    <p className="text-sm"><span className="font-medium">Product:</span> {selectedMilk.name}</p>
                    <p className="text-sm"><span className="font-medium">Quantity:</span> {formData.quantity} liters</p>
                    <p className="text-sm"><span className="font-medium">Payment:</span> {formData.paymentMode}</p>
                    <p className="text-lg font-semibold mt-4">
                      Total Amount: Rs.{(selectedMilk.price * formData.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Edit Order
                  </button>
                  <button
                    onClick={confirmOrder}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
      )}
    </div>
  </div>
)}

    </div>
  );
}
