import React from 'react';
import homebg from '../../img/bg.jpg';
import { useNavigate } from 'react-router-dom';
import Service from './Service';
import Footer from '../common/Footer';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full h-auto flex flex-col items-center justify-center relative text-white"
      style={{
        backgroundImage: `url(${homebg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

      {/* Hero Section */}
      <div className="relative z-10 text-center px-6 py-20 md:py-32 max-w-4xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight animate-fadeInUp">
          Laundry & Dry Cleaning Service
        </h1>
        <p className="text-xl md:text-2xl font-semibold mb-4 animate-fadeInUp delay-200">
          The warmth of a mother in every wash
        </p>
        <p className="text-lg md:text-xl mb-10 text-gray-200 animate-fadeInUp delay-400">
          Convenient, Reliable and Professional Laundry care
        </p>
        <button
          onClick={() => navigate('/booking')}
          className="bg-gradient-to-r from-cyan-500 to-blue-400 hover:from-blue-500 hover:to-cyan-500 
                     text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg 
                     transition-all duration-300 transform hover:scale-105"
        >
          Schedule a Pickup
        </button>
      </div>

      {/* Section Divider */}
      <div className="relative z-10 w-full mt-16">
        <div className="py-12 px-6">
          <Service />
        </div>
      </div>
      <div className="relative z-10 w-full mt-16">
        <div className="py-12 px-6">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
