import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PriceNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === `/prices${path}`;
  };

  const navItems = [
    { label: 'Washing', path: '/washing' },
    { label: 'Dry Cleaning', path: '/drycleaning' },
    { label: 'Ironing', path: '/ironing' },
  ];

  const baseLinkStyle =
    'w-full md:w-[150px] px-4 py-3 font-bold text-sm flex justify-center items-center rounded-lg transition-all duration-300 transform';

  return (
    <nav
      className={`w-full bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300 flex flex-col md:flex-row justify-center items-center gap-3 px-4 py-3 sticky top-0 z-50 transition-shadow duration-500 ${
        isScrolled ? 'shadow-2xl' : 'shadow-md'
      }`}
      role="navigation"
      aria-label="Price categories"
    >
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex items-center justify-center gap-2 w-full py-3 px-5 
                   rounded-full font-semibold text-sm text-blue-900 
                   bg-gradient-to-r from-white to-gray-100 shadow-lg border border-blue-200
                   hover:from-blue-50 hover:to-white hover:text-blue-700
                   active:scale-95 active:shadow-inner
                   focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all"
        aria-expanded={isOpen}
        aria-controls="price-nav-links"
      >
        {isOpen ? (
          <>
            <span className="text-lg">✕</span>
            <span>Close</span>
          </>
        ) : (
          <>
            <span className="text-lg">☰</span>
            <span>Categories</span>
          </>
        )}
      </button>

      {/* Links */}
      <div
        id="price-nav-links"
        className={`flex flex-col md:flex-row w-full md:w-auto gap-4 transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen
            ? 'max-h-96 opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'
        } md:translate-y-0`}
      >
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={`/prices${item.path}`}
            className={`${baseLinkStyle} ${
              isActive(item.path)
                ? 'bg-white text-blue-600 shadow-lg scale-105 ring-2 ring-white ring-offset-2'
                : 'bg-white/90 text-blue-900 hover:bg-blue-100 hover:scale-105 hover:shadow-md focus:ring-2 focus:ring-white/80'
            }`}
            aria-current={isActive(item.path) ? 'page' : undefined}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default PriceNav;
