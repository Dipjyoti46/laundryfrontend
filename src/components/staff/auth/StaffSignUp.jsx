// In src/components/auth/StaffSignUp.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const StaffSignUp = () => {
  const [credentials, setCredentials] = useState({
    first_name: '',
    last_name: '',
    username: '',
    phone_number: '',
    user_type: 'DeliveryPerson',
    email: '',
    password: '',
    confirm_password: ''
  });

  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (credentials.password !== credentials.confirm_password) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await register(credentials);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      setError('Signup failed. An account with this email or username may already exist.');
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-white border border-blue-200 rounded-2xl shadow-[4px_4px_12px_rgba(0,0,0,0.1),-4px_-4px_12px_rgba(255,255,255,0.7)] p-6 md:p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-extrabold text-blue-900 text-3xl md:text-4xl drop-shadow-sm">
            Sign Up as Delivery Person
          </h1>
          <p className="text-gray-600 mt-2">Create your staff account</p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              required
              placeholder="Enter your first name"
              value={credentials.first_name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              required
              placeholder="Enter your last name"
              value={credentials.last_name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Choose a username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              id="phone_number"
              name="phone_number"
              type="tel"
              required
              placeholder="Enter your phone number"
              value={credentials.phone_number}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email address"
              value={credentials.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="user_type" className="block text-sm font-medium text-gray-700">User Type</label>
            <input
              id="user_type"
              name="user_type"
              type="text"
              value={credentials.user_type}
              disabled
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Create a password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              required
              placeholder="Confirm your password"
              value={credentials.confirm_password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition"
          >
            Sign Up
          </button>

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
                Log in Now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffSignUp;
