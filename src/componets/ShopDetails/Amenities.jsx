import React from 'react';
import { Wifi, CreditCard, Music, Snowflake, Droplets } from 'lucide-react';

const Amenities = () => {
  const amenities = [
    { id: 1, name: 'Free WiFi', icon: Wifi },
    { id: 2, name: 'Online Payment', icon: CreditCard },
    { id: 3, name: 'Music', icon: Music },
    { id: 4, name: 'Air Conditioned', icon: Snowflake },
    { id: 5, name: 'Washroom', icon: Droplets },
  ];

  return (
    <div className="md:hidden bg-white px-5 pb-8">
      <h2 className="text-xl font-medium text-gray-900 mb-4">Amenities</h2>
      
      <div className="grid grid-cols-3 gap-3">
        {amenities.map((amenity) => {
          const Icon = amenity.icon;
          return (
            <div
              key={amenity.id}
              className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center h-[100px]"
            >
              <Icon size={24} className="text-gray-600 mb-2" strokeWidth={1.5} />
              <span className="text-xs text-gray-600 font-medium leading-tight">
                {amenity.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Amenities;
