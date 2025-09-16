import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLaundryData } from '../../contexts/LaundryDataContext';

// Icons for a better UI
import { FaArrowLeft, FaReceipt, FaUserAlt, FaShippingFast, FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';

const PreViewBooking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { prices: ItemServicePrices } = useLaundryData();
    const { user, createOrder, createOrderItem } = useAuth();

    // Original data from the booking page
    const { formData, items: originalItems } = location.state || {};

    // --- State Management ---
    // Use local state to handle items immutably, preventing direct modification of location state
    const [items, setItems] = useState(originalItems || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getPrices = (itemId, serviceId) => {
        const price = ItemServicePrices.find(p => p.item_id === itemId && p.service_id === serviceId);
        return price ? parseFloat(price.price) : 0;
    };
    
    // --- Effects ---
    // Safely update item prices when the component loads
    useEffect(() => {
        // Check if any item is missing a price to avoid unnecessary updates
        if (items.some(item => !item.price)) {
            const updatedItems = items.map(item => {
                if (!item.price) {
                    // Return a new object with the price added
                    return { ...item, price: getPrices(item.itemId, item.serviceId) };
                }
                return item; // Otherwise, return the item as is
            });
            setItems(updatedItems);
        }
    }, [originalItems]); // Effect runs when the original items from navigation change

    // --- Price Calculations ---
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const deliveryCharge = 50;
    const gst = (subtotal + deliveryCharge) * 0.18;
    const finalTotal = subtotal + deliveryCharge + gst;

    // --- Event Handlers ---
    const handleConfirmOrder = async (paymentMethod) => {
        setLoading(true);
        setError('');

        const pickupDateTime = `${formData.pickupDate}T${formData.pickupTime}:00`;
        const deliveryDate = new Date(pickupDateTime);
        deliveryDate.setDate(deliveryDate.getDate() + 2);
        const deliveryDateTime = deliveryDate.toISOString();

        // 1. Main Order Payload
        // FIX: Send raw numbers for currency fields, not strings from .toFixed()
        const orderPayload = {
            user: user.id,
            name: formData.name,
            phone_number: formData.phoneNumber,
            pickup_date: pickupDateTime,
            delivery_date: deliveryDateTime,
            pickup_location: formData.pickupAddress,
            delivery_location: formData.sameAddress ? formData.pickupAddress : formData.deliveryAddress,
            order_status: 'Order Confirmed',
            delivery_charge: deliveryCharge,
            tax: gst,
            discount: 0,
            total_amount: finalTotal,
            payment_mode: paymentMethod,
            payment_status: 'Pending',
        };

        try {
            // Create the main order first
            const newOrder = await createOrder(orderPayload);
            const newOrderId = newOrder.order_id;

            // console.log("order id is :",newOrderId)
            // 2. Order Items Payload
            const apiItems = items.map(item => ({
                order: newOrderId,
                item: item.itemName,           // Changed from item_name to item to match model
                service_name: item.serviceName,
                quantity: item.quantity,
                price: item.price * item.quantity,
            }));
            console.log("Order items:", apiItems)
            
            // Create all order items in parallel for efficiency
            try {
                console.log('Starting to create order items...');
                const itemCreationPromises = apiItems.map(itemData => {
                    console.log('Sending order item data:', itemData);
                    return createOrderItem(itemData);
                });
                const results = await Promise.all(itemCreationPromises);
                console.log("All order items created successfully:", results);
                
                // Navigate to success page on completion
                navigate('/booking-success');
            } catch (itemError) {
                console.error('Failed to create order items:', itemError);
                console.error('Error details:', itemError.response?.data || 'No response data');
                // If order items fail, we should show a specific error
                setError('Failed to create order items. Please try again or contact support.');
                throw itemError; // Re-throw to be caught by the outer catch block
            }

        } catch (err) {
            setError('There was a problem submitting your order. Please try again.');
            console.error('Order submission failed:', err);
        } finally {
            setLoading(false);
        }
    };
    
    const handleBack = () => {
        // Pass the original state back to the booking page for editing
        navigate('/booking', { state: { formData, items: originalItems } });
    };

    // --- Render Logic ---
    if (!formData || !items.length) {
        return (
            <div className="text-center p-8">
                <h2 className="text-2xl font-bold mb-4">No Booking Data Found</h2>
                <button onClick={() => navigate('/booking')} className="bg-blue-600 ...">
                    Create a New Booking
                </button>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-slate-50 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <FaReceipt className="text-2xl text-blue-600" />
                                <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
                            </div>
                            <button onClick={handleBack} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition">
                                <FaArrowLeft /> Edit Order
                            </button>
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className="p-6 space-y-8">
                        {/* Customer & Schedule Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-slate-50 p-4 rounded-lg border">
                                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2"><FaUserAlt /> Customer & Schedule</h3>
                                <div className="space-y-2 text-sm">
                                    {/* FIX: Removed empty {formData.user} */}
                                    <p><strong className="text-gray-500">Name:</strong> {formData.name}</p>
                                    <p><strong className="text-gray-500">Phone:</strong> {formData.phoneNumber}</p>
                                    <p><strong className="text-gray-500">Pickup Date:</strong> {new Date(formData.pickupDate).toLocaleDateString()} at {formData.pickupTime}</p>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-lg border">
                                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2"><FaShippingFast /> Address Details</h3>
                                <div className="space-y-2 text-sm">
                                    <p><strong className="text-gray-500">Pickup:</strong> {formData.pickupAddress}</p>
                                    <p><strong className="text-gray-500">Delivery:</strong> {formData.sameAddress ? formData.pickupAddress : formData.deliveryAddress}</p>
                                </div>
                            </div>
                        </div>

                        {/* Items List */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">Selected Items</h3>
                            <div className="border rounded-lg overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-slate-100">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Item</th>
                                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Service</th>
                                            <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Qty</th>
                                            <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {items.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-3 font-medium text-gray-800">{item.itemName}</td>
                                                <td className="px-4 py-3 text-gray-600">{item.serviceName}</td>
                                                <td className="px-4 py-3 text-center text-gray-600">{item.quantity}</td>
                                                {/* For display purposes, format currency with .toFixed() */}
                                                <td className="px-4 py-3 text-right font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        {/* Payment Breakdown */}
                        <div className="flex justify-end">
                            <div className="w-full md:w-1/2">
                                <h3 className="text-lg font-semibold text-gray-700 mb-3">Payment Breakdown</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-gray-600"><span>Subtotal</span><span className="font-medium text-gray-800">₹{subtotal.toFixed(2)}</span></div>
                                    <div className="flex justify-between text-gray-600"><span>Delivery Charge</span><span className="font-medium text-gray-800">₹{deliveryCharge.toFixed(2)}</span></div>
                                    <div className="flex justify-between text-gray-600"><span>GST (18%)</span><span className="font-medium text-gray-800">₹{gst.toFixed(2)}</span></div>
                                    <div className="border-t pt-2 mt-2 flex justify-between text-lg font-bold text-gray-900"><span>Total Amount</span><span>₹{finalTotal.toFixed(2)}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Options */}
                    <div className="p-6 bg-slate-50 border-t">
                        <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">Confirm & Proceed to Payment</h3>
                        {error && <p className="text-red-500 text-center my-2">{error}</p>}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button onClick={() => handleConfirmOrder('Cash')} disabled={loading} className="flex items-center justify-center gap-2 bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 disabled:bg-gray-400 font-semibold transition">
                                <FaMoneyBillWave /> {loading ? 'Processing...' : 'Confirm (Pay on Delivery)'}
                            </button>
                            <button onClick={() => handleConfirmOrder('Online')} disabled={loading} className="flex items-center justify-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 disabled:bg-gray-400 font-semibold transition">
                                <FaCreditCard /> {loading ? 'Processing...' : 'Pay Online Now'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreViewBooking;