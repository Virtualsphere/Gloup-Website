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
    <div className="bg-white lg:bg-gray-100 px-5 lg:px-0 pb-8">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 mb-4">Amenities</h2>
      
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {amenities.map((amenity) => {
          const Icon = amenity.icon;
          return (
            <div
              key={amenity.id}
              className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center h-[100px] lg:h-[120px]"
            >
              <Icon className="text-gray-600 md:text-lg lg:text-2xl mb-2" strokeWidth={1.5} />
              <span className="text-xs md:text-sm lg:text-base text-gray-600 font-medium leading-tight">
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
