import React from 'react';
import { Plus, Check } from 'lucide-react';

const recommendedServices = [
  {
    id: 'rec1',
    name: 'Hair Styling & Spa Treatment',
    duration: '45 min',
    price: 449,
    originalPrice: 599
  },
  {
    id: 'rec2',
    name: 'Beard Trim & Styling',
    duration: '20 min',
    price: 149,
    originalPrice: null
  },
  {
    id: 'rec3',
    name: 'Premium Color',
    duration: '90 min',
    price: 1124,
    originalPrice: 1499
  }
];

const YouMightLikeSection = ({ onAddService, addedServiceIds }) => {
  return (
    <div className="py-10 mb-4">
      <h2 className="text-lg lg:text-2xl font-bold text-gray-900 mb-4">You might also like</h2>
      
      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto gap-4 px-4 lg:px-0 pb-4 snap-x hide-scrollbar">
        {recommendedServices.map((service) => {
          const isAdded = addedServiceIds.includes(service.id);

          return (
            <div 
              key={service.id} 
              className="min-w-[160px] w-[160px] bg-white rounded-2xl p-4 shadow-sm border border-stone-100 flex flex-col justify-between snap-start shrink-0"
            >
              <div>
                <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 line-clamp-2 min-h-[40px]">
                  {service.name}
                </h3>
                <div className="flex items-center text-gray-400 text-xs mb-4">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  {service.duration}
                </div>
              </div>

              <div className="flex items-end justify-between mt-auto">
                <div>
                  <div className="font-bold text-gray-900 leading-none">
                    ₹{service.price}
                  </div>
                  {service.originalPrice && (
                    <div className="text-gray-400 text-xs line-through mt-0.5">
                      ₹{service.originalPrice}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onAddService(service)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                    isAdded 
                    ? 'bg-green-500 text-white' 
                    : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {isAdded ? (
                    <Check className="w-4 h-4" strokeWidth={3} />
                  ) : (
                    <Plus className="w-4 h-4" strokeWidth={3} />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YouMightLikeSection;
