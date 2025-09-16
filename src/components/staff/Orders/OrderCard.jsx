import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import axios from '../../../axios';
import { useAuth } from '../../../contexts/AuthContext';

const OrderCard = ({ order: initialOrder, onOrderUpdate }) => {
  const [order, setOrder] = useState(initialOrder);
  const [updating, setUpdating] = useState(false);

  const { SendDeliveryOtp, VerifyDeliveryOtp } = useAuth();

  const updateOrderStatus = async (newStatus) => {
    setUpdating(true);
    try {
      if (newStatus === 'Delivered') {
        await SendDeliveryOtp(order.order_id);
        alert('OTP has been sent to the customer.');

        const enteredOtp = window.prompt('Enter OTP to confirm delivery:');
        if (!enteredOtp) {
          setUpdating(false);
          return;
        }

        const verifyResponse = await VerifyDeliveryOtp(order.order_id, enteredOtp);

        if (verifyResponse.message === 'Order marked as Delivered') {
          const updatedOrder = { ...order, order_status: 'Delivered' };
          setOrder(updatedOrder);
          if (onOrderUpdate) onOrderUpdate(updatedOrder);
          alert('Delivery confirmed ✅');
        } else {
          alert('❌ Invalid OTP. Please try again.');
        }
      } else {
        const response = await axios.patch(`/api/orders/${order.order_id}/`, {
          order_status: newStatus,
        });
        const updatedOrder = response.data;
        setOrder(updatedOrder);
        if (onOrderUpdate) onOrderUpdate(updatedOrder);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status.');
    } finally {
      setUpdating(false);
    }
  };

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
      case 'delivered':
        return 'bg-green-200 text-green-900';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      'Order Confirmed': 'Out for pickup',
      'Out for pickup': 'Picked Up',
      'Picked Up': 'In Progress',
      'In Progress': 'Out for Delivery',
      'Out for Delivery': 'Delivered',
      'Delivered': 'Done',
    };
    return statusFlow[currentStatus] || null;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-[4px_4px_12px_rgba(0,0,0,0.08),-4px_-4px_12px_rgba(255,255,255,0.8)] p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col gap-4">
        {/* Order Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <FaBoxOpen className="text-blue-500 text-3xl" />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                Order #{order.order_id}
              </h3>
              <p className="text-sm text-gray-500">
                Placed on {new Date(order.order_date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg text-gray-900">
              ₹{order.total_amount}
            </p>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full capitalize inline-block
                            ${
                              order.payment_status?.toLowerCase() === 'paid'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
            >
              {order.payment_status || 'Pending'}
            </span>
          </div>
        </div>

        {/* Customer Details */}
        <div className="flex flex-col gap-2 bg-gray-50 border border-gray-200 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700">Customer Details</h4>
          <p className="text-gray-600 flex items-center gap-2">
            <span className="font-medium">{order.name}</span>
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <FaPhone className="text-gray-400" />
            {order.phone_number}
          </p>
          <div className="flex items-start gap-2">
            <FaMapMarkerAlt className="text-gray-400 mt-1" />
            <div>
              <p className="text-gray-600">{order.pickup_location}</p>
              <p className="text-sm text-gray-500">
                Delivery: {order.delivery_location}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row  justify-between items-center pt-4 border-t">
          <span
            className={`px-4 py-2 text-sm font-semibold rounded-lg ${getStatusClasses(
              order.order_status
            )}`}
          >
            {order.order_status}
          </span>
          <div className="flex flex-col gap-3">
            <Link
              to={`/orderdetails/${order.order_id}`}
              state={{ order: order }}
              className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
            >
              View Details
            </Link>
            {getNextStatus(order.order_status) && (
              <button
                onClick={() => updateOrderStatus(getNextStatus(order.order_status))}
                disabled={updating}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-700 transition-all duration-200 disabled:bg-gray-400"
              >
                {updating
                  ? 'Updating...'
                  : `Mark as ${getNextStatus(order.order_status)}`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
