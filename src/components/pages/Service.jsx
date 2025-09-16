import React from 'react';
import ServiceCard from '../service/ServiceCard';
import washingMachine from '../../assets/washing-machine.png';
import tshirt from '../../assets/tshirt.png';
import iron from '../../assets/iron.png';
import bg from '../../img/bg.jpg';

const Service = () => {
  return (
    <div
      className="relative min-h-screen w-full text-blue-900 flex items-center justify-center py-16 px-4 md:px-10"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark Overlay for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide mb-4 animate-fadeInUp">
            Our Services
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full animate-fadeInUp delay-200"></div>
          <p className="text-lg md:text-xl text-gray-200 mt-6 max-w-2xl mx-auto animate-fadeInUp delay-300">
            We provide high-quality laundry care services with convenience, reliability, and professional touch.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="animate-fadeInUp delay-200">
            <ServiceCard
              imgUrl={washingMachine}
              serviceName="WASHING"
              serviceDescription="We wash, dry, and neatly fold your everyday laundry with utmost care."
              className="rounded-none hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            />
          </div>
          <div className="animate-fadeInUp delay-400">
            <ServiceCard
              imgUrl={tshirt}
              serviceName="DRY CLEANING"
              serviceDescription="Expert cleaning for delicate and special garments to preserve their quality."
              className="rounded-none hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            />
          </div>
          <div className="animate-fadeInUp delay-600">
            <ServiceCard
              imgUrl={iron}
              serviceName="IRONING"
              serviceDescription="Our ironing service ensures your clothes are crisp, fresh, and ready to wear."
              className="rounded-none hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
