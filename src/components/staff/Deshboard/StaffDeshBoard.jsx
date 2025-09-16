import React, { useState, useEffect } from 'react';
import { useAuth} from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaBoxOpen, FaTruck, FaCalendarCheck, FaSpinner } from 'react-icons/fa';

const StaffDashboard = () => {
    const { user } = useAuth();
    const { StaffOrderList } = useAuth();
    const [orderStats, setOrderStats] = useState({
        toPickup: 0,
        inTransit: 0,
        toDeliver: 0,
        completed: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                // ✅ use AuthContext helper
                const orders = await StaffOrderList();

                // ✅ Calculate stats
                const stats = {
                    toPickup: orders.filter(o => o.order_status === 'Order Confirmed').length,
                    inTransit: orders.filter(o => ['Out for pickup', 'Picked Up'].includes(o.order_status)).length,
                    toDeliver: orders.filter(o => o.order_status === 'Out for Delivery').length,
                    completed: orders.filter(o => o.order_status === 'Delivered').length
                };

                setOrderStats(stats);

                // ✅ Get 5 most recent orders needing attention
                const activeOrders = orders
                    .filter(o =>
                        ['Order Confirmed', 'Out for pickup', 'Picked Up', 'Out for Delivery', 'Delivered'].includes(o.order_status)
                    )
                    .slice(0, 5);

                setRecentOrders(activeOrders);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch dashboard data:", err);
                setError("Could not load dashboard information. " + (err.response?.data?.message || err.message));
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
        const intervalId = setInterval(fetchDashboardData, 120000); // refresh every 2 mins
        return () => clearInterval(intervalId);
    }, []);

    if (!user || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <FaSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
        );
    }

    if (error) {
        return <div className="p-8 text-center text-red-500">{error}</div>;
    }

    const statCards = [
        {
            title: "To Pickup",
            count: orderStats.toPickup,
            icon: FaBoxOpen,
            color: "bg-yellow-100 text-yellow-800",
            link: "/stafforderlist"
        },
        {
            title: "In Transit",
            count: orderStats.inTransit,
            icon: FaTruck,
            color: "bg-blue-100 text-blue-800",
            link: "/stafforderlist"
        },
        {
            title: "To Deliver",
            count: orderStats.toDeliver,
            icon: FaTruck,
            color: "bg-purple-100 text-purple-800",
            link: "/stafforderlist"
        },
        {
            title: "Completed",
            count: orderStats.completed,
            icon: FaCalendarCheck,
            color: "bg-green-100 text-green-800",
            link: "/stafforderlist"
        }
    ];

    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center space-x-4">
                        <FaUserCircle className="text-5xl text-gray-300" />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Welcome back, {user.first_name || user.username}!
                            </h1>
                            <p className="text-gray-600">Delivery Staff Dashboard</p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((stat, index) => (
                        <Link
                            key={index}
                            to={stat.link}
                            className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <stat.icon className={`text-3xl ${stat.color}`} />
                                    <span className="text-2xl font-bold">{stat.count}</span>
                                </div>
                                <h3 className="text-gray-600 font-medium">{stat.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                        <Link to="/stafforderlist" className="text-blue-600 hover:text-blue-800 font-medium">
                            View All Orders
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentOrders.length > 0 ? (
                            recentOrders.map(order => (
                                <div key={order.order_id} className="border rounded-lg p-4 hover:bg-gray-50">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold">Order #{order.order_id}</h3>
                                            <p className="text-sm text-gray-600">{order.name}</p>
                                            <p className="text-sm text-gray-600">{order.pickup_location}</p>
                                        </div>
                                        <div className="text-right">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    order.order_status === 'Order Confirmed'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : order.order_status === 'Out for pickup'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : order.order_status === 'Out for Delivery'
                                                        ? 'bg-purple-100 text-purple-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}
                                            >
                                                {order.order_status}
                                            </span>
                                            <p className="mt-2 text-sm font-medium">₹{order.total_amount}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-4">No active orders</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;
