import React from 'react';
import { Wifi, CreditCard, Music, Snowflake, Droplets, CheckCircle } from 'lucide-react';

const Amenities = ({ amenities = [] }) => {

  return (
    <div className="bg-white lg:bg-gray-100 px-5 lg:px-0 pb-8">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 mb-4">Amenities</h2>
      
      {amenities && amenities.length > 0 ? (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {amenities.map((amenity, index) => {
            // You might map string names to icons if needed. Using a generic icon for now:
            const Icon = CheckCircle; 
            
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center h-[100px] lg:h-[120px]"
              >
                <Icon className="text-gray-600 md:text-lg lg:text-2xl mb-2" strokeWidth={1.5} />
                <span className="text-xs md:text-sm lg:text-base text-gray-600 font-medium leading-tight">
                  {amenity?.label || amenity}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-gray-500 text-sm md:text-base">
          No amenities listed.
        </div>
      )}
    </div>
  );
};

export default Amenities;
