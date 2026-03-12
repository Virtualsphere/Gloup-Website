import React from 'react';
import { Plus, Check } from 'lucide-react';
import { useBookingStore } from '../../store/bookingStore';
import { useGetSalonDetails } from '../../hooks/services/useSalonDetails';

// Simple helper to format "HH:MM:SS" into a readable string like "1 hr 30 min" or "45 min"
const formatDuration = (timeStr) => {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  if (parts.length >= 2) {
    const hrs = parseInt(parts[0], 10);
    const mins = parseInt(parts[1], 10);
    if (hrs > 0 && mins > 0) return `${hrs} hr ${mins} min`;
    if (hrs > 0) return `${hrs} hr`;
    return `${mins} min`;
  }
  return timeStr;
};

const YouMightLikeSection = () => {
  // Read directly from store
  const salon = useBookingStore((s) => s.salon);
  const toggleAddOn  = useBookingStore((s) => s.toggleAddOn);
  const selectedServices = useBookingStore((s) => s.selectedServices);
  const addOnServices = useBookingStore((s) => s.addOnServices);
  
  // Only filter out services that were added from the main shop details page
  // This allows add-on services toggled here to remain in the list
  const addedIds = new Set(selectedServices.map(s => s.id));

  // Fetch full salon details to get the services array
  const { data: salonDetailsResponse, isLoading } = useGetSalonDetails(salon?.id);
  const allServices = salonDetailsResponse?.data?.services || [];

  // Filter out services that are already selected from the main page
  const recommendedServices = allServices.filter(service => !addedIds.has(service.id));

  if (isLoading) {
    return (
      <div className="py-10 mb-4 animate-pulse">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 mb-4 bg-gray-200 h-8 w-48 rounded"></h2>
        <div className="flex gap-4 px-4 overflow-hidden">
          <div className="min-w-[160px] h-[160px] bg-gray-200 rounded-2xl"></div>
          <div className="min-w-[160px] h-[160px] bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  // Hide section completely if there are no more services to recommend
  if (recommendedServices.length === 0) {
    return (
      <div className="py-10 mb-4 text-center">
        <p className="text-gray-500 font-medium">No more services available.</p>
      </div>
    );
  }

  return (
    <div className="py-10 mb-4">
      <h2 className="text-lg lg:text-2xl font-bold text-gray-900 mb-4">You might also like</h2>
      
      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto gap-4 px-4 lg:px-0 pb-4 snap-x hide-scrollbar">
        {recommendedServices.map((service) => {
          // Check if this service is in our add-on cart
          const isAdded = addOnServices.some(s => s.id === service.id);

          return (
            <div 
              key={service.id} 
              className="min-w-[160px] w-[160px] bg-white rounded-2xl p-4 shadow-sm border border-stone-100 flex flex-col justify-between snap-start shrink-0"
            >
              <div>
                <h3 className="font-semibold text-gray-900 text-xs leading-tight mb-2 line-clamp-2 uppercase">
                  {service.name}
                </h3>
                <div className="flex items-center text-gray-400 text-xs mb-4">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  {formatDuration(service.duration)}
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
                  onClick={() => toggleAddOn(service)}
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
