// In src/components/pages/Booking.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLaundryData } from '../../contexts/LaundryDataContext';
import { useAuth } from '../../contexts/AuthContext';

const Booking = () => {
  const { items: availableItems, services: availableServices, loading } = useLaundryData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [items, setItems] = useState([{ item: '', quantity: 1, service: '' }]);
  const [formData, setFormData] = useState({
    user: '',
    name: '',
    pickupAddress: '',
    phoneNumber: '',
    pickupDate: '',
    pickupTime: '',
    deliveryAddress: '',
    sameAddress: false,
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: `${user.first_name} ${user.last_name}`,
        phoneNumber: user.phone_number || '',
      }));
    }
  }, [user]);

  useEffect(() => {
    if (formData.sameAddress) {
      setFormData((prev) => ({ ...prev, deliveryAddress: prev.pickupAddress }));
    }
  }, [formData.sameAddress, formData.pickupAddress]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { item: '', quantity: 1, service: '' }]);

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const itemsForPreview = items
      .map((item) => {
        const selectedItem = availableItems.find((i) => i.item_id === parseInt(item.item));
        const selectedService = availableServices.find((s) => s.service_id === parseInt(item.service));

        if (!selectedItem || !selectedService) return null;

        return {
          itemId: selectedItem.item_id,
          itemName: selectedItem.item_name,
          serviceId: selectedService.service_id,
          serviceName: selectedService.service_name,
          quantity: item.quantity,
          price: parseFloat(selectedItem.price),
        };
      })
      .filter(Boolean);

    if (itemsForPreview.length !== items.length) {
      alert('There was an issue processing the items. Please re-check your selections.');
      return;
    }

    navigate('/preview-booking', { state: { formData, items: itemsForPreview } });
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading booking options...</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white border border-blue-200 rounded-2xl shadow-[4px_4px_12px_rgba(0,0,0,0.1),-4px_-4px_12px_rgba(255,255,255,0.7)] p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 text-center mb-10 drop-shadow-sm">
          Book Your Laundry Service
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Customer Information */}
          <fieldset className="border border-blue-200 bg-blue-50 p-6 rounded-xl shadow-sm">
            <legend className="text-lg font-bold text-blue-900 px-2">Your Details</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter Your Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter Phone Number"
                  required
                />
              </div>
            </div>
          </fieldset>

          {/* Address Information */}
          <fieldset className="border border-blue-200 bg-blue-50 p-6 rounded-xl shadow-sm">
            <legend className="text-lg font-bold text-blue-900 px-2">Address & Schedule</legend>
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address *</label>
                <input
                  type="text"
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter Pickup Address"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="sameAddress"
                  checked={formData.sameAddress}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label className="text-sm text-gray-700">Use same address for delivery</label>
              </div>
              {!formData.sameAddress && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
                  <input
                    type="text"
                    name="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter Delivery Address"
                    required
                  />
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date *</label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Time *</label>
                  <input
                    type="time"
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>
              </div>
            </div>
          </fieldset>

          {/* Items Section */}
          <fieldset className="border border-blue-200 bg-blue-50 p-6 rounded-xl shadow-sm">
            <legend className="text-lg font-bold text-blue-900 px-2">Your Items</legend>
            <div className="space-y-6 mt-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-white border border-gray-200 rounded-xl shadow p-4"
                >
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Item *</label>
                    <select
                      value={item.item}
                      onChange={(e) => handleItemChange(index, 'item', e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      required
                    >
                      <option value="">Select Item</option>
                      {availableItems.map((apiItem) => (
                        <option key={apiItem.item_id} value={apiItem.item_id}>
                          {apiItem.item_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service *</label>
                    <select
                      value={item.service}
                      onChange={(e) => handleItemChange(index, 'service', e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      required
                    >
                      <option value="">Select Service</option>
                      {availableServices.map((apiService) => (
                        <option key={apiService.service_id} value={apiService.service_id}>
                          {apiService.service_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-grow">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                        className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        required
                      />
                    </div>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
                      >
                        -
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addItem}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition"
              >
                + Add Another Item
              </button>
            </div>
          </fieldset>

          {/* Submit */}
          <div className="text-center pt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-3 rounded-xl shadow-lg text-lg font-semibold hover:scale-105 transition"
            >
              Preview Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
