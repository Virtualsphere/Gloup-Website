import React from 'react';
import { MapPin, Clock, Languages, Crown, Star, Venus } from 'lucide-react';

const ShortDetails = () => {
  const shopData = {
    name: "Mohan Men's Park Salon & Spa",
    isNew: true,
    rating: 5.0,
    reviewCount: 300,
    genderType: "Male only",
    address: "Bus Stop, Mudichur Rd, Parvathi Nagar, 600063",
    isOpen: true,
    hours: "06:30 AM – 09:30 PM",
    languages: ["Hindi", "Tamil", "English", "Telugu", "Malayalam"]
  };

  return (
    <div className="md:hidden bg-white rounded-t-3xl -mt-8 relative z-10 px-5 pt-6 pb-4">
      {/* Header with Title and New Badge */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <h1 className="text-2xl font-semibold text-gray-900 flex-1 leading-tight truncate md:whitespace-normal">
          {shopData.name}
        </h1>
        {shopData.isNew && (
          <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0">
            NEW
          </span>
        )}
      </div>

      {/* Rating, Reviews, and Gender */}
      <div className="flex items-center gap-3 mb-4">
        {/* Crown Icon */}
        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Crown size={16} className="text-white" fill="white" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-lg">
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
          <span className="font-semibold text-gray-900">{shopData.rating}</span>
          <span className="text-gray-500 text-sm">({shopData.reviewCount})</span>
        </div>

        {/* Gender Type */}
        <div className="flex items-center gap-1.5 text-gray-600">
          <Venus size={16} className="text-blue-500" />
          <span className="text-sm">{shopData.genderType}</span>
        </div>
      </div>

      {/* Address */}
      <div className="flex items-start gap-2.5 mb-3">
        <MapPin size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
        <p className="text-gray-700 text-sm leading-relaxed">
          {shopData.address}
        </p>
      </div>

      {/* Opening Hours */}
      <div className="flex items-center gap-2.5 mb-4">
        <Clock size={18} className="text-gray-500 flex-shrink-0" />
        <p className="text-sm">
          <span className={shopData.isOpen ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
            {shopData.isOpen ? "Open" : "Closed"}
          </span>
          <span className="text-gray-600"> · {shopData.hours}</span>
        </p>
      </div>

      {/* Languages */}
      <div className="flex items-start gap-2.5">
        <Languages size={18} className="text-gray-500 mt-1.5 flex-shrink-0" />
        <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-nowrap pb-1">
          {shopData.languages.map((language, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0"
            >
              {language}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShortDetails;
