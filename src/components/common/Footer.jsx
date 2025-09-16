import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-50 via-cyan-100 to-white bg-transparent-50 text-gray-700 py-12 px-6 border-t border-blue-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand / About */}
        <div>
          <h2 className="text-2xl font-extrabold text-blue-700 mb-4">LaundryCare</h2>
          <p className="text-gray-600 leading-relaxed">
            Convenient, reliable, and professional laundry & dry-cleaning services.
            We deliver freshness with every wash.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold text-blue-700 mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/prices"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Prices
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/booking"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Book Now
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-bold text-blue-700 mb-4">Get in Touch</h2>
          <p className="text-gray-600">📍 Guwahati, Assam, India</p>
          <p className="text-gray-600">📞 +91 98765 43210</p>
          <p className="text-gray-600">✉️ support@laundrycare.com</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 pt-6 border-t border-blue-100 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} LaundryCare. For Educational Purpose.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
