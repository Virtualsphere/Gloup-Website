import React, { useState, useEffect } from "react";
import { Heart, MapPin } from "lucide-react";
import HeartOutline from "../../../assets/icons/ic_heart.svg?react";
import HeartFill from "../../../assets/icons/ic_heart_fill.svg?react";
import { useToggleFavourite } from "../../../hooks/services/useToggleFavourite";
import { useGetFavourites } from "../../../hooks/services/useGetFavourites";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import { useUiStore } from "../../../store/uiStore";

/**
 * A reusable, mobile-only Favorite Card component.
 * Hidden on lg screens (`lg:hidden`).
 * Matches the design:
 * - Left image with crown badge and price pill.
 * - Right content with title, red heart, rating, location, languages, and service pills.
 */
const FavoriteCard = ({ salon, onRemoved }) => {
  const { data: favData } = useGetFavourites();
  const favouritesList = favData?.data ?? [];
  const isGloballyFavorited = favouritesList.some((fav) => {
    const favId = fav?.store?.id ?? fav?.store?._id ?? fav?.id;
    return String(favId) === String(salon?.id);
  });

  const exactFavoriteState = favData 
    ? isGloballyFavorited 
    : (salon?.isFavourite || salon?.isFavorite || false);
  
  const [isFavorite, setIsFavorite] = useState(exactFavoriteState);

  useEffect(() => {
    setIsFavorite(exactFavoriteState);
  }, [exactFavoriteState]);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();
  const { mutate: toggle, isPending } = useToggleFavourite();

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Optimistic toggle
    setIsFavorite((prev) => !prev);

    toggle(salon?.id, {
      onSuccess: (res) => {
        toast.success(res?.message || (isFavorite ? "Removed from favourites" : "Added to favourites"));
        onRemoved?.(); // Optional callback to refresh parent (e.g., Favourites list)
      },
      onError: () => {
        setIsFavorite((prev) => !prev); // Revert on error
        toast.error("Something went wrong. Please try again.");
      },
    });
  };

  const HeartIcon = isFavorite ? HeartFill : HeartOutline;

  // Safe defaults
  const image = salon?.image || "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80";
  const name = salon?.name || "Salon Name";
  const rating = salon?.rating || "0.0";
  const reviews = salon?.reviews || 0;
  const area = salon?.area || "Area";
  const city = salon?.city || "City";
  const distance = salon?.distance || "0.0 KM";
  const mainService = salon?.mainService || "Service";
  const price = salon?.price || "0";
  const isPremium = salon?.isPremium || false;
  // const languages = salon?.languages || ["A", "अ", "అ"];
  const services = salon?.services || ["Hair", "Beard"];

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow duration-200 border border-gray-200 flex relative cursor-pointer overflow-hidden min-h-[140px] w-full">
      
      {/* Left Image Section - Full height, no padding */}
      <div className="relative w-2/5 sm:w-[150px] flex-shrink-0 max-h-[140px] md:max-h-[160px]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        
        {/* Premium Badge (Top Left) */}
        {isPremium && (
          <div className="absolute top-2 left-2 bg-amber-400 p-1.5 flex items-center justify-center rounded-full shadow-md z-10 pointer-events-auto">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
            </svg>
          </div>
        )}

        {/* Floating Price Pill (Bottom overlay) */}
        <div className="absolute bottom-2 inset-x-2 bg-white text-[10px] md:text-xs font-semibold px-2 py-1.5 rounded-lg shadow-md flex items-center justify-center gap-1 z-10 mx-auto w-max max-w-full">
          <span className="text-gray-900 truncate max-w-[80px] sm:max-w-none">{mainService}</span>
          <span className="text-gray-400 font-normal flex-shrink-0">•</span>
          <span className="text-gray-900 font-bold flex-shrink-0">₹{price}</span>
        </div>
      </div>

      {/* Right Content Section */}
      <div className="flex-1 py-3 px-3 md:px-4 flex flex-col relative">
        
        {/* Header Row: Title */}
        <div className="pr-10">
          <h3 className="font-bold text-gray-900 leading-tight text-sm md:text-base lg:text-lg line-clamp-2">{name}</h3>
        </div>

        {/* Heart button (Absolute top right) */}
        <button
          onClick={handleHeartClick}
          disabled={isPending}
          className={`absolute top-3 right-3 rounded-full w-8 h-8 border flex items-center justify-center transition-transform disabled:opacity-50 z-10 hover:scale-110 ${
            isFavorite 
              ? "bg-white border-gray-200 text-red-500 shadow-sm" 
              : "bg-white border-gray-200 text-gray-400"
          }`}
        >
          <HeartIcon 
            width={16} 
            height={16} 
            className={isFavorite ? "text-red-500" : "text-gray-500"} 
          />
        </button>

        {/* Rating Row */}
        <div className="flex items-center gap-1 text-xs md:text-sm mt-3">
          <svg className="w-4 h-4 md:w-5 md:h-5 text-amber-500 flex-shrink-0 mb-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="font-bold text-gray-900 ml-0.5 md:text-base leading-none">{rating}</span>
          <span className="text-gray-500 ml-0.5 leading-none">({reviews} reviews)</span>
        </div>

        {/* Location Row */}
        <div className="flex items-center gap-1.5 text-xs md:text-sm text-gray-500 mt-2.5">
          <MapPin size={14} className="flex-shrink-0 text-gray-900" strokeWidth={2.5}/>
          <span className="truncate max-w-[90px] md:max-w-[180px]">{area}</span>
          <span className="text-gray-400 px-0.5 flex-shrink-0 font-medium">•</span>
          <span className="truncate max-w-[90px] md:max-w-[180px]">{city}</span>
          <span className="text-gray-400 px-0.5 flex-shrink-0 font-medium">•</span>
          <span className="whitespace-nowrap flex-shrink-0">{distance}</span>
        </div>

      </div>
    </div>
  );
};

export default FavoriteCard;
