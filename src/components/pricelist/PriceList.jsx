import React from 'react'
import tshirt from '../../assets/tshirt.png'
import { useNavigate } from 'react-router-dom'

const PriceList = ({ priceList, priceType, title }) => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen w-full p-6 md:p-10 bg-gradient-to-br from-gray-50 via-slate-100 to-blue-50">
      <div className="w-full md:max-w-[80vw] max-w-[95vw] mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-blue-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 py-10 px-6 md:px-12 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg tracking-wide">
            {title}
          </h1>
          <p className="text-blue-100 text-lg font-light">
            Check out our competitive prices below
          </p>
        </div>
        
        {/* Price Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-200 via-indigo-100 to-blue-100 text-blue-900">
                <th className="p-4 text-center font-semibold text-lg">Item</th>
                <th className="p-4 text-center font-semibold text-lg">Image</th>
                <th className="p-4 text-center font-semibold text-lg">Price</th>
              </tr>
            </thead>
            <tbody>
              {priceList.map((item, index) => (
                <tr
                  key={index}
                  className={`transition duration-200 ${
                    index % 2 === 0 ? 'bg-slate-50/70' : 'bg-gray-100/70'
                  } hover:bg-blue-100/70`}
                >
                  <td className="p-4 text-gray-700 text-center font-medium">
                    {item.item}
                  </td>
                  <td className="p-4 flex justify-center items-center">
                    <div className="h-14 w-14 flex items-center justify-center bg-white rounded-xl shadow-inner">
                      <img
                        src={item.image || tshirt}
                        alt={item.item}
                        className="h-10 w-10 object-contain"
                      />
                    </div>
                  </td>
                  <td className="p-4 text-blue-700 text-center font-bold text-lg">
                    ₹{item[priceType]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="py-10 px-6 text-center bg-gradient-to-r from-gray-50 to-slate-100">
          <p className="text-gray-500 mb-6 italic">
            * Prices may vary based on fabric and condition
          </p>
          <button
            onClick={() => navigate('/booking')}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-10 py-3 rounded-full font-bold shadow-lg hover:scale-105 hover:shadow-xl hover:from-cyan-500 hover:to-blue-600 transition-all duration-300"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default PriceList
