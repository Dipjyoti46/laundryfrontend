// src/components/orders/OrderDetails.jsx

import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import businessLogo from '../../assets/businessLogo.png';
import axiosInstance from '../../axios';

const OrderDetails = () => {
    const location = useLocation();
    const { orderId } = useParams();
    const { user, getOrders } = useAuth();
    const [order, setOrder] = useState(location.state?.order || null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handlePayment = async () => {
        if (order.payment_status === 'paid') {
            alert('Payment has already been made for this order.');
            return;
        }
        try {
            const amount = order?.total_amount || 0;
            if (!amount) {
                alert('Invalid order amount');
                return;
            }

            console.log('Creating order with amount:', amount);
            
            const orderPayload = {
                amount: Math.round(amount * 100), // Convert to paise/cents
                order_id: order.order_id.toString(), // Add order reference
                currency: 'INR'
            };
            
            console.log('Sending order creation payload:', orderPayload);
            
            const orderResponse = await axiosInstance.post('/api/payment/create-order/', orderPayload);
            
            console.log('Order creation response:', orderResponse);
            
            if (!orderResponse.data || !orderResponse.data.id) {
                throw new Error('Invalid order creation response');
            }

            const orderData = orderResponse.data;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: "INR",
                name: "Sumi Fabcare",
                description: `Payment for Order #${orderId}`,
                image: window.location.origin + '/images/businessLogo.png',
                order_id: orderData.id,
                handler: async function (response) {
                    try {
                        // Log the response from Razorpay for debugging
                        console.log('Razorpay response:', response);
                        console.log('Order data:', orderData);
                        console.log('Order:', order);
                        
                        // Use the correct Razorpay order ID from the response
                        const verificationData = {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            order_id: order.order_id.toString()
                        };
                        
                        console.log('Sending verification data:', verificationData);
                        
                        const verificationResponse = await axiosInstance.post('/api/payment/verify-payment/', verificationData);

                        console.log('Verification response:', verificationResponse);

                        if (verificationResponse.data.status === 'success') {
                            alert('Payment successful! Your order has been confirmed.');
                            // Redirect to order details page
                            window.location.href = `/orderdetails/${order.order_id}`;
                        } else {
                            throw new Error(verificationResponse.data.error || 'Payment verification failed');
                        }
                    } catch (error) {
                        console.error('Payment verification failed:', error);
                        if (error.response?.data?.error) {
                            alert(`Payment verification failed: ${error.response.data.error}`);
                        } else {
                            alert('Payment verification failed. If amount was deducted, please contact support with your order ID.');
                        }
                    }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                    contact: user?.phone,
                },
                notes: {
                    address: user?.address,
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                console.error('Payment failed:', response.error);
                alert(`Payment failed: ${response.error.description}`);
            });
            rzp.open();
        } catch (error) {
            console.error('Payment initialization failed:', error);
            alert('Unable to initialize payment. Please try again later.');
        }
    };

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                if (!order && user) {
                    const ordersData = await getOrders(user.id);
                    const foundOrder = ordersData.find(o => o.order_id === parseInt(orderId));
                    if (foundOrder) {
                        setOrder(foundOrder);
                    } else {
                        setError('Order not found');
                    }
                }
            } catch (err) {
                console.error('Error fetching order details:', err);
                setError('Failed to load order details');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [user, orderId, getOrders, order]);

    if (loading) {
        return (
            <div className="p-8 text-center text-gray-600">
                Loading order details...
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="p-8 text-center text-red-500">
                {error || 'Order data not found. Please navigate from your dashboard.'}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="w-full bg-[#A9D4DA] py-5 shadow-xl border-b border-[#85BFCD]">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Order Details
                    </h1>
                </div>
            </div>
            <div className='w-full flex flex-col mt-4'>

                {/* --- Items Table (Static as requested) --- */}
                <div className='w-full flex justify-center'>
                    <div className='w-[95%] md:w-[75%] border-2 border-black shadow-2xl rounded-2xl overflow-hidden'>
                        <table className='w-full table-auto'>
                            <thead>
                                <tr className='bg-white text-black font-bold text-sm md:text-lg'>
                                    <th colSpan={5} className='p-2 md:p-4 text-center'>🛍️ ITEMS</th>
                                </tr>
                                <tr className='bg-gray-400 text-black font-bold'>
                                    <th className='p-2 md:p-3 text-center text-xs md:text-base'>Item Name</th>
                                    <th className='p-2 md:p-3 text-center text-xs md:text-base'>Service</th>
                                    <th className='p-2 md:p-3 text-center text-xs md:text-base'>Quantity</th>
                                    <th className='p-2 md:p-3 text-center text-xs md:text-base'>Per Piece</th>
                                    <th className='p-2 md:p-3 text-center text-xs md:text-base'>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.order_items?.map((itemData, index) => (
                                    <tr key={index} className={`${index % 2 === 0 ? 'bg-blue-50' : 'bg-gray-50'} hover:bg-blue-100`}>
                                        <td className='p-2 md:p-3 text-center font-medium text-xs md:text-base'>{itemData.item}</td>
                                        <td className='p-2 md:p-3 text-center text-xs md:text-base'>{itemData.service_name}</td>
                                        <td className='p-2 md:p-3 text-center font-bold text-xs md:text-base'>{itemData.quantity}</td>
                                        <td className='p-2 md:p-3 text-center text-xs md:text-base'>₹{(itemData.price / itemData.quantity).toFixed(2)}</td>
                                        <td className='p-2 md:p-3 text-center font-bold text-green-600 text-xs md:text-base'>₹{itemData.price}</td>
                                    </tr>
                                ))}
                                <tr className='bg-gray-200 text-blue-900 font-bold'>
                                    <td colSpan="4" className='p-2 md:p-3 text-right text-xs md:text-base'>Delivery Charge:</td>
                                    <td className='p-2 md:p-3 text-center text-xs md:text-base'>₹{order.delivery_charge}</td>
                                </tr>
                                <tr className='bg-gray-200 text-blue-900 font-bold'>
                                    <td colSpan="4" className='p-2 md:p-3 text-right text-xs md:text-base'>Tax:</td>
                                    <td className='p-2 md:p-3 text-center text-xs md:text-base'>₹{order.tax}</td>
                                </tr>
                                <tr className='bg-gray-500 text-white font-bold'>
                                    <td colSpan="4" className='p-2 md:p-3 text-right text-xs md:text-base'>Total Bill:</td>
                                    <td className='p-2 md:p-3 text-center text-xs md:text-base'>₹{order.total_amount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- Order Progress (Static as requested) --- */}
                <div className='w-full flex justify-center mt-4 mb-4'>
                    {/* The static progress bar JSX from your component */}
                </div>
                
                {/* --- Customer & Order Details (Now using passed data) --- */}
                <div className='w-full flex justify-center mt-4 mb-20'>
                    <div className='w-[95%] md:w-[75%] bg-white border-2 border-gray-200 rounded-xl shadow-lg p-4 md:p-6'>
                        <h2 className='text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center'>Customer & Order Details</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                            <div className='space-y-3'>
                                <h3 className='text-lg font-semibold text-blue-600 border-b-2 border-blue-200 pb-2'>👤 Person Details</h3>
                                <div className='space-y-2'>
                                    <p><span className='font-medium'>Name:</span> {user.first_name} {user.last_name}</p>
                                    <p><span className='font-medium'>Phone:</span> {user.phone_number}</p>
                                    <p><span className='font-medium'>Email:</span> {user.email}</p>
                                </div>
                            </div>
                            <div className='space-y-3'>
                                <h3 className='text-lg font-semibold text-orange-600 border-b-2 border-orange-200 pb-2'>📋 Order Summary</h3>
                                <div className='space-y-2'>
                                    <p><span className='font-medium'>Order ID:</span> #{order.order_id}</p>
                                    {order.payment_status === 'paid' ? (
                                    <p>
                                        <span className='font-medium'>Payment Status:</span>{' '}
                                        <span className='font-semibold text-green-600'>{order.payment_status}</span>
                                    </p>
                                    ) : (
                                    <p>
                                        <span className='font-medium'>Status:</span>{' '}
                                        <span className='font-semibold text-red-600'>{order.payment_status}</span>
                                    </p>
                                    )
                                    }
                                    <p>
                                        <span className='font-medium'>Delivery Status:</span>{' '}
                                        <span className='font-semibold text-green-600'>{order.order_status}</span>
                                    </p>

                                </div>
                            </div>
                            <div className='space-y-3'>
                                <h3 className='text-lg font-semibold text-green-600 border-b-2 border-green-200 pb-2'>📦 Pickup Details</h3>
                                <div className='space-y-2'>
                                    <p><span className='font-medium'>Address:</span> {order.pickup_location}</p>
                                    <p><span className='font-medium'>Date:</span> {new Date(order.pickup_date).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className='space-y-3'>
                                <h3 className='text-lg font-semibold text-purple-600 border-b-2 border-purple-200 pb-2'>🚚 Delivery Details</h3>
                                <div className='space-y-2'>
                                    <p><span className='font-medium'>Address:</span> {order.delivery_location}</p>
                                    <p><span className='font-medium'>Date:</span> {new Date(order.delivery_date).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pay Now Button */}
                <div className='fixed bottom-4 left-0 right-0 z-50 flex justify-center'>
                    <div className='w-[95%] md:w-[400px] flex justify-center'>
                        {order.payment_status === 'paid' ? (
                        <button onClick={handlePayment} className='bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105'>
                            Payment Done - ₹{order.total_amount}
                        </button>
                        ) : (
                        <button onClick={handlePayment} className='bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105'>
                            Pay Now - ₹{order.total_amount}
                        </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;