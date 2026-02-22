import React from 'react';
import { MapPin, Clock, Languages, Crown, Star, Venus, Heart, Share2 } from 'lucide-react';

const ShortDetails = () => {
  const shopData = {
    name: "Mohan Men's Park Salon & Spa",
    isNew: true,
    rating: "5.0",
    reviewCount: 300,
    genderType: "Male only",
    address: "Bus Stop, Mudichur Rd, Parvathi Nagar, 600063",
    isOpen: true,
    hours: "06:30 AM – 09:30 PM",
    languages: ["Hindi", "Tamil", "English", "Telugu", "Malayalam"]
  };

  return (
    <div className="bg-white lg:bg-gray-100 rounded-t-3xl lg:rounded-none -mt-8 lg:mt-0 relative z-10 px-5 pt-6 pb-4 lg:py-8 lg:px-0">
      <div className="flex justify-between items-start">
        <div className="flex flex-col lg:gap-4 w-full lg:w-auto">
          {/* Header with Title and New Badge */}
          <div className="flex items-start lg:items-center justify-between gap-3 mb-4 lg:mb-0">
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <h1 className="text-2xl lg:text-4xl font-semibold lg:font-bold text-gray-900 flex-1 leading-tight truncate lg:whitespace-normal">
                {shopData.name}
              </h1>
              {/* Desktop Crown Icon (Next to Title) */}
              <div className="hidden lg:flex w-8 h-8 bg-yellow-500 rounded-full items-center justify-center flex-shrink-0">
                <Crown size={18} className="text-white" fill="currentColor" />
              </div>
              {shopData.isNew && (
                <span className="bg-blue-500 lg:bg-blue-600 text-white text-xs lg:text-[13px] tracking-wide font-semibold px-3 py-1.5 lg:px-4 rounded-full flex-shrink-0">
                  NEW
                </span>
              )}
            </div>
          </div>

          {/* Combined Ratings, Gender, and Mobile Crown */}
          <div className="flex items-center gap-3 lg:gap-6 mb-4 lg:mb-0 text-sm lg:mt-1">
            {/* Mobile Crown Icon */}
            <div className="lg:hidden w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Crown size={16} className="text-white" fill="white" />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-lg">
              <Star size={16} className="text-yellow-500 fill-yellow-500 lg:fill-current" />
              <span className="font-semibold text-gray-900">{shopData.rating}</span>
              <span className="text-gray-500 text-sm">({shopData.reviewCount})</span>
            </div>

            {/* Gender Type */}
            <div className="flex items-center gap-1.5 text-gray-600">
              <Venus size={16} className="text-blue-500 lg:w-[18px] lg:h-[18px]" />
              <span className="text-sm">{shopData.genderType}</span>
            </div>
            
            {/* Desktop Address */}
            <div className="hidden lg:flex items-center gap-2 text-gray-500">
              <MapPin size={18} />
              <span>{shopData.address}</span>
            </div>
          </div>

          {/* Mobile Address */}
          <div className="flex lg:hidden items-start gap-2.5 mb-3">
            <MapPin size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700 text-sm leading-relaxed">
              {shopData.address}
            </p>
          </div>

          {/* Opening Hours */}
          <div className="flex items-center gap-2.5 lg:gap-2 mb-4 lg:mb-0 lg:mt-1 text-sm lg:text-gray-600">
            <Clock size={18} className="text-gray-500 lg:text-gray-400 flex-shrink-0" />
            <p>
              <span className={shopData.isOpen ? "text-green-600 lg:text-green-500 font-semibold lg:font-medium" : "text-red-600 lg:text-red-500 font-semibold lg:font-medium"}>
                {shopData.isOpen ? "Open" : "Closed"}
              </span>
              <span className="text-gray-600 lg:text-gray-500"> · {shopData.hours}</span>
            </p>
          </div>

          {/* Languages */}
          <div className="flex items-start lg:items-center gap-2.5 lg:gap-4 lg:mt-2">
            <Languages size={18} className="lg:hidden text-gray-500 mt-1.5 flex-shrink-0" />
            <span className="hidden lg:block text-gray-900 font-medium text-[15px]">Languages:</span>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-nowrap pb-1 lg:pb-0">
              {shopData.languages.map((language, index) => (
                <span
                  key={index}
                  className="bg-gray-100 lg:bg-gray-100/80 text-gray-700 lg:text-gray-600 text-sm px-3 lg:px-4 py-1.5 rounded-lg lg:rounded-full whitespace-nowrap flex-shrink-0 lg:font-medium"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Buttons (Desktop only) */}
        <div className="hidden lg:flex items-center gap-3">
          <button className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Heart size={20} className="text-gray-700" />
          </button>
          <button className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Share2 size={20} className="text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShortDetails;


