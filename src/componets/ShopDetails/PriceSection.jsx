import React from 'react'
import { Link } from 'react-router-dom';

const PriceSection = ({ services, addedServices }) => {
  if (addedServices.size === 0) return null;

  // Calculate total price and find max discount
  let totalPrice = 0;
  let maxDiscount = 0;

  services.forEach(service => {
    if (addedServices.has(service.id)) {
      totalPrice += service.price;
      if (service.discount && service.discount > maxDiscount) {
        maxDiscount = service.discount;
      }
    }
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Discount Banner */}
      {maxDiscount > 0 && (
        <div className="bg-green-100 py-1.5 px-4 flex items-center justify-center">
            <div className="relative w-5 h-5 mr-2 flex items-center justify-center">
                 {/* Simple percentage icon representation */}
                <div className="w-full h-full bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">%</span>
                </div>
            </div>
          <p className="text-green-600 text-sm font-medium">
            Flat {maxDiscount}% offer is waiting for you...
          </p>
        </div>
      )}

      {/* Main Price Bar */}
      <div className="bg-black p-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm">
            {addedServices.size} service{addedServices.size > 1 ? 's' : ''} added
          </span>
          <span className="text-white text-xl font-bold">
            ₹{totalPrice}
          </span>
        </div>
        
        <Link to='/book-slot' className="bg-white text-black px-8 py-3 rounded-xl font-bold text-base hover:bg-gray-100 transition-colors">
          Book Now
        </Link>
      </div>
    </div>
  )
}

export default PriceSection