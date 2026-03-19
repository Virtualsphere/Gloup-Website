import React from 'react';
import { Clock, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookingDetailCard = ({ services, onRemove }) => {
  const isEmpty = !services || services.length === 0;

  return (
    <div>
      {/* Desktop-only section heading */}
      <h2 className="hidden lg:block text-2xl font-bold text-gray-900 mt-6 mb-3">Added Services</h2>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-stone-100 mt-4 lg:mt-0">
        {isEmpty ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
            <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">
              <svg className="w-7 h-7 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p className="font-semibold text-gray-800">No services added</p>
            <p className="text-sm text-gray-500">Add at least one service to continue with your booking</p>
            <Link
              to="/"
              className="mt-1 text-sm font-semibold text-black underline decoration-1 underline-offset-2"
            >
              Browse services
            </Link>
          </div>
        ) : (
          <>
            {services.map((service, index) => (
              <div
                key={service.id || index}
                className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4"
              >
                {/* Left: name + duration + offer badge */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm lg:text-lg">{service.name}</h3>
                    {service.isPopular && (
                      <span className="bg-blue-50 text-blue-500 text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wide">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs lg:text-base">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.duration || '30 min'}</span>
                  </div>
                </div>

                {/* Right: price + remove */}
                <div className="flex items-start gap-3 ml-3">
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1.5">
                      {service.originalPrice && (
                        <span className="text-gray-400 line-through text-xs lg:text-base">₹{service.originalPrice}</span>
                      )}
                      <span className="font-semibold text-gray-900 text-sm lg:text-lg">₹{service.price}</span>
                    </div>

                    {/* Offer badge */}
                    {(service.discountPercentage || service.discount) && (
                      <div className="flex items-center gap-1 mt-1.5 bg-green-50 text-green-600 text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit">
                        ✦ {service.discountPercentage || service.discount} off
                      </div>
                    )}
                  </div>

                  {/* Remove button */}
                  {onRemove && (
                    <button
                      onClick={() => onRemove(service.id)}
                      className="text-gray-400 hover:text-gray-700 transition-colors mt-0.5"
                      aria-label={`Remove ${service.name}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Forgot something — only when services exist */}
            <div className="flex items-center justify-start gap-1 text-sm lg:text-base mt-2">
              <span className="text-gray-500">Forgot something?</span>
              <Link to="/" className="font-semibold text-black underline decoration-1 underline-offset-2">
                Add more services
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingDetailCard;
