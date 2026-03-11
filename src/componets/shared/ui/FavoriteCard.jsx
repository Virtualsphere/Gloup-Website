import React from "react";
import { Heart, MapPin } from "lucide-react";
import { useToggleFavourite } from "../../../hooks/services/useToggleFavourite";
import toast from "react-hot-toast";

/**
 * A reusable, mobile-only Favorite Card component.
 * Hidden on lg screens (`lg:hidden`).
 * Matches the design:
 * - Left image with crown badge and price pill.
 * - Right content with title, red heart, rating, location, languages, and service pills.
 */
const FavoriteCard = ({ salon, onRemoved }) => {
  const { mutate: toggle, isPending } = useToggleFavourite();

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(salon?.id, {
      onSuccess: (res) => {
        toast.success(res?.message || "Removed from favourites");
        onRemoved?.(); // optional callback to refresh parent
      },
      onError: () => toast.error("Failed to remove. Please try again."),
    });
  };

  // Safe defaults
  const image = salon?.image || "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80";
  const name = salon?.name || "Salon Name";
  const rating = salon?.rating || "0.0";
  const reviews = salon?.reviews || 0;
  const location = salon?.location || "Location";
  const distance = salon?.distance || "0.0 KM";
  const mainService = salon?.mainService || "Service";
  const price = salon?.price || "0";
  const isPremium = salon?.isPremium || false;
  const languages = salon?.languages || ["A", "अ", "అ"];
  const services = salon?.services || ["Hair", "Beard"];

  return (
    <div className="bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 flex gap-3 md:gap-4 relative cursor-pointer">
      {/* Left Image Section */}
      <div className="relative w-[110px] h-[110px] md:w-[150px] md:h-[150px] lg:w-[170px] lg:h-[170px] flex-shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-xl"
        />
        
        {/* Premium Badge (Top Left) */}
        {isPremium && (
          <div className="absolute top-1 left-1 bg-amber-400 rounded-lg p-1">
            <svg 
              className="w-4 h-4 text-white" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
            </svg>
          </div>
        )}

        {/* Floating Price Pill (Bottom Center) */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white text-xs md:text-sm font-bold px-2.5 py-1 rounded-full shadow-md whitespace-nowrap border border-gray-100 flex items-center gap-1 z-10 w-max">
          <span className="text-gray-900">{mainService}</span>
          <span className="text-gray-300">·</span>
          <span className="text-gray-900">₹{price}</span>
        </div>
      </div>

      {/* Right Content Section */}
      <div className="flex-1 flex flex-col justify-between py-1">
        
        {/* Header Row: Title & Heart */}
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-gray-900 leading-tight text-sm md:text-base lg:text-lg line-clamp-1">{name}</h3>
          <button
            onClick={handleRemove}
            disabled={isPending}
            className="bg-red-50 text-red-500 rounded-full p-1.5 flex-shrink-0 flex items-center justify-center hover:bg-red-100 transition-colors disabled:opacity-50"
          >
            <Heart size={14} className="md:hidden text-red-500" fill="currentColor" />
            <Heart size={18} className="hidden md:block text-red-500" fill="currentColor" />
          </button>
        </div>

        {/* Rating Row */}
        <div className="flex items-center gap-1 text-xs md:text-sm mt-1">
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="font-bold text-gray-900">{rating}</span>
          <span className="text-gray-400">({reviews} reviews)</span>
        </div>

        {/* Location Row */}
        <div className="flex items-center gap-1 text-[11px] md:text-sm text-gray-500 mt-1 line-clamp-1">
          <MapPin size={12} className="flex-shrink-0 text-gray-600" />
          <span className="truncate max-w-[100px] md:max-w-[180px] lg:max-w-[220px]">{location}</span>
          <span>·</span>
          <span className="whitespace-nowrap flex-shrink-0">{distance}</span>
        </div>

        {/* Tags Row: Languages & Services */}
        <div className="flex items-center gap-2 mt-2">
          {/* Language Icons */}
          {languages?.length > 0 && (
            <div className="flex items-center gap-1 text-xs font-medium text-gray-700">
              {languages.map((lang, idx) => (
                <span key={idx}>{lang}</span>
              ))}
            </div>
          )}
          
          {/* Service Pills */}
          <div className="flex items-center gap-1 flex-wrap">
            {services.slice(0, 2).map((srv, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-600 text-[10px] md:text-xs px-2 py-0.5 rounded-full font-medium">
                {srv}
              </span>
            ))}
            {services.length > 2 && (
              <span className="bg-gray-100 text-gray-600 text-[10px] md:text-xs px-1.5 py-0.5 rounded-full font-medium text-center">
                +{services.length - 2}
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FavoriteCard;
