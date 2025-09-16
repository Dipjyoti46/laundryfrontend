// src/components/orders/OrderCard.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBoxOpen } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const OrderCard = ({ order: initialOrder, onOrderUpdate }) => {
    const [order, setOrder] = useState(initialOrder);
    const { user, getOrders } = useAuth();

    // Update order when initialOrder changes
    useEffect(() => {
        setOrder(initialOrder);
    }, [initialOrder]);

    // Effect for polling updates
    useEffect(() => {
        const fetchLatestOrderData = async () => {
            try {
                if (user?.id) {
                    const orders = await getOrders(user.id);
                    const updatedOrder = orders.find(o => o.order_id === order.order_id);
                    if (updatedOrder) {
                        setOrder(updatedOrder);
                        if (onOrderUpdate) {
                            onOrderUpdate(updatedOrder);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching latest order data:', error);
            }
        };

        const intervalId = setInterval(fetchLatestOrderData, 5000);
        return () => clearInterval(intervalId);
    }, [user, order.order_id, getOrders, onOrderUpdate]);

    const getStatusClasses = (status) => {
        switch (status?.toLowerCase()) {
            case 'order confirmed':
                return 'bg-blue-100 text-blue-800';
            case 'out for pickup':
                return 'bg-yellow-100 text-yellow-800';
            case 'picked up':
                return 'bg-blue-100 text-blue-800';
            case 'in progress':
                return 'bg-green-100 text-green-800';
            case 'out for delivery':
                return 'bg-purple-100 text-purple-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-blue-200 shadow-[4px_4px_12px_rgba(0,0,0,0.1),-4px_-4px_12px_rgba(255,255,255,0.7)] p-6 transition hover:shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center">
                    <FaBoxOpen className="text-blue-500 text-3xl mr-4" />
                    <div>
                        <p className="font-semibold text-gray-800">Order #{order.order_id}</p>
                        <p className="text-sm text-gray-500">
                            Placed on {new Date(order.order_date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-700 font-bold mt-1">
                            Total: ₹{order.total_amount}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 w-full sm:w-auto">
                    <div className="flex flex-col gap-2 w-full sm:w-auto">
                        {/* Payment Status */}
                        <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full capitalize text-center
                            ${order.payment_status?.toLowerCase() === 'paid'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'}`}
                        >
                            Payment: {order.payment_status || 'Pending'}
                        </span>

                        {/* Order Status */}
                        <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full capitalize text-center ${getStatusClasses(order.order_status)}`}
                        >
                            {order.order_status || 'Order Confirmed'}
                        </span>
                    </div>
                    <Link
                        to={`/orderdetails/${order.order_id}`}
                        state={{ order: order }}
                        className="bg-blue-600 text-white font-bold text-sm rounded-md px-4 py-2 hover:bg-blue-700 transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
                    >
                        View More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
