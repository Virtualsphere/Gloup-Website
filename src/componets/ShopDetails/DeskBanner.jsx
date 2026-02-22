import React from 'react';
import { dumBanner, galleryImage1, galleryImage2 } from '../../assets/images';

const DeskBanner = () => {
  return (
    <div className="w-full hidden lg:grid grid-cols-3 gap-2 h-[450px] xl:px-32 lg:px-10">
      {/* Large Left Image */}
      <div className="col-span-2 h-[450px] rounded-2xl overflow-hidden relative">
        <img 
          src={dumBanner} 
          alt="Salon Main Interior" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Right Side Stack */}
      <div className="col-span-1 grid grid-rows-2 gap-2 h-[450px]">
        <div className="rounded-2xl overflow-hidden relative">
          <img 
            src={galleryImage1} 
            alt="Salon Equipment" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="rounded-2xl overflow-hidden relative group cursor-pointer">
          <img 
            src={galleryImage2} 
            alt="Salon View" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/50">
            <span className="text-white text-lg font-medium tracking-wide">View Gallery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeskBanner;