import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import businessLogo from '../../assets/businessLogo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  // Check roles
  const isDeliveryStaff = user?.user_type === 'DeliveryPerson';
  const isCustomer = user && !isDeliveryStaff;

  // Common link style
  const linkStyle =
    "relative hover:text-sky-100 transition after:absolute after:left-0 after:bottom-[-3px] after:h-[2px] after:w-0 after:bg-sky-100 after:transition-all after:duration-300 hover:after:w-full focus:after:w-full";

  return (
    <nav className="h-20 w-full bg-gradient-to-r from-blue-300 to-blue-400 flex items-center justify-between px-5 sticky top-0 z-50 shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img
          className="h-12 w-12 object-contain rounded-full shadow-md"
          src={businessLogo}
          alt="Saikia Laundry Logo"
        />
        <h1 className="text-black font-bold text-2xl md:text-3xl tracking-wide">
          Sumi Fabcare
        </h1>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center space-x-6 text-white font-medium text-lg">
        {/* Not logged in */}
        {!user && (
          <>
            <Link to="/" className={linkStyle}>Home</Link>
            <Link to="/service" className={linkStyle}>Service</Link>
            <Link to="/prices" className={linkStyle}>Prices</Link>
            <Link to="/login" className={linkStyle}>Login</Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500 transition"
            >
              Sign Up
            </Link>
          </>
        )}

        {/* Staff + DeliveryPerson */}
        {isDeliveryStaff && (
          <>
            <Link to="/stafforderlist" className={linkStyle}>Order List</Link>
            <Link to="/staffdashboard" className={linkStyle}>Dashboard</Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}

        {/* Customer */}
        {isCustomer && (
          <>
            <Link to="/" className={linkStyle}>Home</Link>
            {/* <Link to="/service" className={linkStyle}>Service</Link> */}
            <Link to="/prices" className={linkStyle}>Prices</Link>
            <Link to="/dashboard" className={linkStyle}>Dashboard</Link>
            <Link to="/booking" className={linkStyle}>Book Now</Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-20 left-0 right-0 bg-gradient-to-r from-blue-400 to-blue-500 p-5 shadow-xl rounded-b-2xl transform transition-transform duration-300 ${
          isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
        } origin-top`}
      >
        <div className="flex flex-col space-y-4 text-white text-lg font-medium">
          {/* Not logged in */}
          {!user && (
            <>
              <Link to="/" onClick={() => setIsMenuOpen(false)} className={linkStyle}>Home</Link>
              {/* <Link to="/service" onClick={() => setIsMenuOpen(false)} className={linkStyle}>Service</Link> */}
              <Link to="/prices" onClick={() => setIsMenuOpen(false)} className={linkStyle}>Prices</Link>
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className={linkStyle}>Login</Link>
              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 rounded-lg bg-yellow-400 text-gray-900 font-semibold text-center hover:bg-yellow-500 transition"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* Staff + DeliveryPerson */}
          {isDeliveryStaff && (
            <>
              <Link to="/stafforderlist" onClick={() => setIsMenuOpen(false)} className={linkStyle}>Order List</Link>
              <Link to="/staffdashboard" onClick={() => setIsMenuOpen(false)} className={linkStyle}>Dashboard</Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}

          {/* Customer */}
          {isCustomer && (
            <>
              <Link to="/" onClick={() => setIsMenuOpen(false)} className={linkStyle}>Home</Link>
              {/* <Link to="/service" onClick={() => setIsMenuOpen(false)} className={linkStyle}>Service</Link> */}
              <Link to="/prices" onClick={() => setIsMenuOpen(false)} className={linkStyle}>Prices</Link>
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className={linkStyle}>Dashboard</Link>
              <Link to="/booking" onClick={() => setIsMenuOpen(false)} className={linkStyle}>Book Now</Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
