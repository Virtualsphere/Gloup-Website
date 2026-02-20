import React from 'react';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookingDetailCard = ({ services }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-stone-100 mt-4">
      {services.map((service, index) => (
        <div 
          key={service.id || index}
          className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 text-sm">{service.name}</h3>
              {service.isPopular && (
                <span className="bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
                  Popular
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>{service.duration || '30 min'}</span>
            </div>
          </div>
          <div className="font-semibold text-gray-900 text-sm">
            ₹{service.price}
          </div>
        </div>
      ))}

      {/* Add More Service Link */}
      <div className="flex items-center justify-center gap-1 text-sm mt-2">
        <span className="text-gray-500">Forget Something?</span>
        <Link to="/" className="font-semibold text-black underline decoration-1 underline-offset-2">
          Add more service
        </Link>
      </div>
    </div>
  );
};

export default BookingDetailCard;
