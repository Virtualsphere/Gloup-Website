import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

const Location = () => {
  return (
    <div className="md:hidden bg-white py-6 px-5">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
      
      {/* Map Placeholder */}
      <div className="w-full h-48 bg-gray-100 rounded-2xl flex flex-col items-center justify-center mb-4 relative overflow-hidden">
        <div className="flex flex-col items-center gap-2 z-5">
           <MapPin size={32} className="text-orange-500 fill-orange-500" />
           <span className="text-xs text-gray-500 font-medium bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
             Mudichur Rd, Parvathi Nagar
           </span>
        </div>
        {/* Simple grid pattern background to simulate map */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ 
               backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
               backgroundSize: '16px 16px' 
             }} 
        />
      </div>

      {/* Address Row */}
      <div className="flex items-start gap-3 mb-6">
        <MapPin size={20} className="text-gray-500 mt-0.5 flex-shrink-0" />
        <p className="text-gray-600 text-sm leading-relaxed">
          Bus Stop, Mudichur Rd, Parvathi Nagar, 600063
        </p>
      </div>

      {/* Get Directions Button */}
      <button className="w-full py-3 border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-gray-900 active:bg-gray-50 transition-colors">
        <Navigation size={16} className="text-gray-900 fill-gray-900" style={{ transform: 'rotate(45deg)' }}/>
        Get Directions
      </button>
    </div>
  );
};

export default Location;
