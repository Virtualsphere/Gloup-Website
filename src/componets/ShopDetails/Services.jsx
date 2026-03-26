import React, { useState } from 'react';
import { Clock, Plus, Check } from 'lucide-react';

const Services = ({ services = [], addedServices, toggleService }) => {
  const [activeFilter, setActiveFilter] = useState('Featured');
  
  const filters = ['Featured', 'Combo Offers', "Men's Packages"];

  return (
    <div className="bg-white lg:bg-gray-100 px-5 lg:px-0 py-6">
      {/* Services Heading */}
      <h2 className="text-base lg:text-2xl font-normal text-gray-900 mb-5">Services</h2>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide pb-1">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === filter
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Services List */}
      <div className="space-y-3">
        {services && services.length > 0 ? (
          services.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-gray-200 rounded-2xl p-4"
            >
              {/* Top Row: Name and Add/Added Button */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm lg:text-lg font-semibold text-gray-900 pr-4">
                  {service.name}
                </h3>
                
                <button
                  onClick={() => toggleService(service.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center justify-center gap-1.5 transition-all flex-shrink-0 min-w-[90px] ${
                    addedServices.has(service.id)
                      ? 'bg-white border-2 border-gray-900 text-gray-900'
                      : 'bg-black text-white border-2 border-transparent'
                  }`}
                >
                  {addedServices.has(service.id) ? (
                    <>
                      Added <Check size={16} strokeWidth={3} />
                    </>
                  ) : (
                    <>
                      <Plus size={16} strokeWidth={3} /> Add
                    </>
                  )}
                </button>
              </div>

              {/* Middle Row: Duration */}
              <div className="flex items-center gap-1.5 text-gray-500 mb-3">
                <Clock size={16} />
                <span className="text-sm">
                  {service.duration && service.duration.includes(':') 
                    ? `${parseInt(service.duration.split(':')[0]) * 60 + parseInt(service.duration.split(':')[1])} mins` 
                    : `${service.duration} mins`}
                </span>
              </div>

              {/* Bottom Row: Price, Discount, Badge */}
              <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap overflow-x-auto scrollbar-hide pb-1">
                <span className="text-xl font-bold text-gray-900 flex-shrink-0">
                  ₹{service.price}
                </span>
                {service.originalPrice && (
                  <>
                    <span className="text-sm text-gray-400 line-through flex-shrink-0">
                      ₹{service.originalPrice}
                    </span>
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded flex items-center gap-1 flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 0L7.854 4.146L12 6L7.854 7.854L6 12L4.146 7.854L0 6L4.146 4.146L6 0Z" fill="currentColor"/>
                      </svg>
                      {service.discountPercentage} off
                    </span>
                  </>
                )}
                {service.isPopular && (
                  <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-2 py-1 rounded flex-shrink-0">
                    POPULAR
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="py-4 text-gray-500 text-sm md:text-base">
            No services available for this category yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
