// In src/components/pages/BookingSuccess.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const BookingSuccess = () => (
    <div className="text-center p-12">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Booking Successful!</h1>
        <p className="text-gray-700 mb-6">Thank you for your order. You can track its status in your dashboard.</p>
        <Link 
            to="/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
            Go to Dashboard
        </Link>
    </div>
);

export default BookingSuccess;

//