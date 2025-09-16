// src/components/pages/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext'; 
import axios from '../../axios';
import { FaUserCircle, FaEdit, FaPlus, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import OrderCard from '../orders/OrderCard';

const Dashboard = () => {
  const { user } = useAuth();
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders/');
        setOrderDetails(response.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Could not load your order history.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading your dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 drop-shadow-sm">
            My Dashboard
          </h1>
          <p className="text-blue-700 mt-2 text-lg">
            Welcome back, <span className="font-semibold">{user.first_name || user.username}</span> 👋
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Profile + Address */}
          <div className="lg:col-span-1 flex flex-col gap-8">

            {/* Profile */}
            <div className="bg-white rounded-2xl border border-blue-200 shadow-[4px_4px_12px_rgba(0,0,0,0.1),-4px_-4px_12px_rgba(255,255,255,0.7)] p-6 transition hover:shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-blue-900">My Profile</h2>
                <button className="text-blue-600 hover:text-blue-800 transition">
                  <FaEdit />
                </button>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <FaUserCircle className="text-6xl text-blue-400" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">
                    {user.first_name} {user.last_name}
                  </h3>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                </div>
              </div>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-center"><FaEnvelope className="mr-3 text-blue-500" /> {user.email}</p>
                <p className="flex items-center"><FaPhone className="mr-3 text-blue-500" /> {user.phone_number || 'Not provided'}</p>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl border border-blue-200 shadow-[4px_4px_12px_rgba(0,0,0,0.1),-4px_-4px_12px_rgba(255,255,255,0.7)] p-6 transition hover:shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-blue-900">My Addresses</h2>
                <button className="flex items-center px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm rounded-full shadow hover:scale-105 transition">
                  <FaPlus className="mr-2" /> Add
                </button>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start p-4 bg-blue-50 border border-blue-100 rounded-xl shadow-sm hover:shadow-md transition">
                  <FaMapMarkerAlt className="text-blue-500 mt-1 mr-4" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Home</h4>
                    <p className="text-gray-600 text-sm">123 Main St, Guwahati, Assam</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Orders */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-blue-200 shadow-[4px_4px_12px_rgba(0,0,0,0.1),-4px_-4px_12px_rgba(255,255,255,0.7)] p-6 transition hover:shadow-xl">
            <h1 className="text-2xl font-bold text-blue-900 mb-6">My Recent Orders</h1>
            <div className="space-y-4">
              {orderDetails.length > 0 ? (
                orderDetails.map(order => (
                  <OrderCard key={order.order_id} order={order} />
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">You have no orders yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
