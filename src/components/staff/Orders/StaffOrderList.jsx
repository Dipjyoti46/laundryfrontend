import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import axios from '../../../axios';
import OrderCard from './OrderCard';
import { FaBoxOpen } from 'react-icons/fa';

const StaffOrderList = () => {
  const { user } = useAuth();
  const [orderDetails, setOrderDetails] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const statuses = [
    'All',
    'Order Confirmed',
    'Out for pickup',
    'Picked Up',
    'In Progress',
    'Out for Delivery',
    'Delivered',
    'Cancelled',
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/orders/');
        const orders = response.data.data || response.data;
        setOrderDetails(orders);
        setFilteredOrders(orders);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError(
          'Could not load orders. ' +
            (err.response?.data?.message || err.message)
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    const intervalId = setInterval(fetchOrders, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (statusFilter === 'All') {
      setFilteredOrders(orderDetails);
    } else {
      setFilteredOrders(
        orderDetails.filter((order) => order.order_status === statusFilter)
      );
    }
  }, [statusFilter, orderDetails]);

  if (!user || loading) {
    return (
      <div className="p-8 text-center text-gray-500 animate-pulse">
        Loading your dashboard...
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
              📦 Orders Dashboard
            </h1>

            {/* Filter dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 bg-white shadow-sm rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Orders */}
          {filteredOrders.length > 0 ? (
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.order_id}
                  order={order}
                  onOrderUpdate={(updatedOrder) => {
                    setOrderDetails((prev) =>
                      prev.map((o) =>
                        o.order_id === updatedOrder.order_id ? updatedOrder : o
                      )
                    );
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaBoxOpen className="mx-auto text-gray-400 text-6xl mb-4" />
              <p className="text-gray-500 text-lg">
                No orders found for <span className="font-semibold">"{statusFilter}"</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffOrderList;
