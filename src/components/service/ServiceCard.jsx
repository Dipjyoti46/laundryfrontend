import React from 'react'
import { useNavigate } from 'react-router-dom'

const ServiceCard = ({ imgUrl, serviceName, serviceDescription }) => {
  const navigate = useNavigate()
  return (
    <div className='w-full h-full p-6 bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 flex flex-col items-center'>
      {/* Image Container */}
      <div className='flex justify-center mb-4'>
        <img 
          className='h-20 w-20 md:h-24 md:w-24 object-contain' 
          src={imgUrl} 
          alt={serviceName} 
        />
      </div>

      {/* Service Name */}
      <div className='text-center mb-3'>
        <h1 className='text-lg md:text-xl font-bold text-blue-900'>
          {serviceName}
        </h1>
      </div>

      {/* Service Description */}
      <div className='text-center flex-grow'>
        <p className='text-sm md:text-base text-gray-600 leading-relaxed'>
          {serviceDescription}
        </p>
      </div>
      
      <div className='mt-8 text-center'>
          <h2 className='text-xl md:text-xl font-bold mb-8'>"Your clothes, our care."</h2>
          <button onClick={() => navigate('/booking')} className='bg-blue-900 text-white font-bold text-lg md:text-xl px-8 py-4 rounded-xl hover:bg-blue-800 transition duration-300'>
            Book Now
          </button>
        </div>
    </div>
  )
}

export default ServiceCard
