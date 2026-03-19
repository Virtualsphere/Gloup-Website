import React from 'react';
import { MapPin, Star, Crown } from 'lucide-react';

const SalonMiniCard = ({ name, location, rating, imageUrl, isPremium }) => {
  return (
    <div className="flex items-center gap-3 p-4 pb-3">
      {/* Salon Image */}
      <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-gray-200">
        <img
          src={imageUrl || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&q=80'}
          alt={name}
          className="w-full h-full object-cover"
        />
        {isPremium && (
          <div className="absolute top-1 left-1 bg-yellow-400 rounded-full w-4 h-4 flex items-center justify-center">
            <Crown className="w-2.5 h-2.5 text-white fill-yellow-400" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-gray-900 text-base leading-tight truncate">{name}</h3>
          {isPremium && (
            <span className="flex-shrink-0 flex items-center gap-1 bg-yellow-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              <Crown className="w-2.5 h-2.5 fill-white" /> Premium
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-0.5 text-gray-500 text-xs">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-semibold text-gray-800">{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default SalonMiniCard;
