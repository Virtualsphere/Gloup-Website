import React, { useState } from 'react'
import { MapPin, Store } from 'lucide-react'
import HeartOutline from "../../../assets/icons/ic_heart.svg?react";
import HeartFill from "../../../assets/icons/ic_heart_fill.svg?react";
import EnglishLang from "../../../assets/icons/ic_en.svg?react";
import HindiLang from "../../../assets/icons/ic_hi.svg?react";
import TamilLang from "../../../assets/icons/ic_ta.svg?react";
import TeluguLang from "../../../assets/icons/ic_te.svg?react";
import KannadaLang from "../../../assets/icons/ic_kn.svg?react";
import MalayalamLang from "../../../assets/icons/ic_ml.svg?react";
import CrownIcon from "../../../assets/icons/ic_crown.svg?react";

import { useAuthStore } from '../../../store/authStore'
import { useUiStore } from '../../../store/uiStore'
import { useToggleFavourite } from '../../../hooks/services/useToggleFavourite'
import { useGetFavourites } from '../../../hooks/services/useGetFavourites'

const ServiceCard = ({ service }) => {
  const { data: favData } = useGetFavourites();
  const favouritesList = favData?.data ?? [];
  const isGloballyFavorited = favouritesList.some((fav) => {
    const favId = fav?.store?.id ?? fav?.store?._id ?? fav?.id;
    return String(favId) === String(service?.id);
  });

  const exactFavoriteState = favData
    ? isGloballyFavorited
    : (service?.isFavourite || service?.isFavorite || false);

  const [isFavorite, setIsFavorite] = useState(exactFavoriteState);

  React.useEffect(() => {
    setIsFavorite(exactFavoriteState);
  }, [exactFavoriteState]);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const openLoginModal  = useUiStore((s)  => s.openLoginModal);
  const { mutate: toggle, isPending } = useToggleFavourite();

  const HeartIcon = isFavorite ? HeartFill : HeartOutline;

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) { openLoginModal(); return; }
    setIsFavorite((prev) => !prev);
    toggle(service.id, {
      onError: () => setIsFavorite((prev) => !prev),
    });
  };

  // Just use the first image — no nested Swiper inside the card.
  // Nested Swiper (image slider) inside an outer Swiper (home page carousel)
  // creates conflicting GPU compositing layers which cause the overlay flash.
  const coverImage = service.images?.[0];

  return (
    <div className="bg-white rounded-2xl shadow-md h-full flex flex-col" style={{ borderRadius: '1rem' }}>

      {/* ── Image area — overflow:hidden scoped ONLY here ── */}
      <div className="relative h-48 flex-shrink-0 overflow-hidden rounded-t-2xl">
        {/* Cover image */}
        <img
          src={coverImage}
          alt={service.name}
          className="w-full h-full object-cover"
        />

        {/*
         * Overlays are inside the image div BUT we lift them onto their own
         * GPU compositing layer with translateZ(0) so the browser never
         * reorders them behind the image during parent transforms.
         */}

        {/* Crown + Heart row */}
        <div
          className="absolute inset-x-3 top-3 flex justify-between items-center z-10 pointer-events-none"
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        >
          {service.isPremium ? (
            <div className="bg-yellow-400 w-9 h-9 flex items-center justify-center p-2 rounded-full shadow-md">
              <CrownIcon width={15} height={15} className="text-white" fill="white" />
            </div>
          ) : (
            <span />
          )}

          <button
            onClick={handleHeartClick}
            disabled={isPending}
            className="bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform pointer-events-auto"
            style={{ transform: 'translateZ(0)', willChange: 'transform' }}
          >
            <HeartIcon
              width={20}
              height={20}
              className={isFavorite ? 'text-red-500' : 'text-gray-500'}
            />
          </button>
        </div>

        {/* Price tag — bottom right */}
        {service.mainService && (
          <div
            className="absolute bottom-3 right-3 bg-white px-1.5 py-1.5 rounded-lg shadow-md z-10"
            style={{ transform: 'translateZ(0)', willChange: 'transform' }}
          >
            <div className="flex items-center text-xs font-normal text-gray-800 gap-1">
              <span className="truncate max-w-[180px]">{service.mainService}</span>
              <span>•</span>
              <span>₹{service.price}</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Card Content ── */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Business Name & Rating */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full border-2 border-zinc-300 bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Store size={20} className="text-zinc-500" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">{service.name}</h3>
          </div>

          {(service.rating || service.rating === 0) && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="text-yellow-400">★</span>
              <span className="text-sm font-medium text-gray-900">{service.rating}</span>
              {service.reviews > 0 && (
                <span className="text-sm text-gray-400">({service.reviews})</span>
              )}
            </div>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3 w-full overflow-hidden">
          <MapPin size={16} fill="black" stroke="white" strokeWidth={2} className="flex-shrink-0" />
          <span className="truncate">
            {service.location?.split(' ').length > 6
              ? `${service.location.split(' ').slice(0, 4).join(' ')}...`
              : service.location || 'Location not available'}
            {service.distance ? ` • ${service.distance}` : ''}
          </span>
        </div>

        {/* Footer: Language flags + service tags */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5 text-gray-500 font-medium h-5">
            {service.languageCodes &&
              service.languageCodes
                .map((code) => {
                  const map = { en: EnglishLang, hi: HindiLang, ta: TamilLang, te: TeluguLang, kn: KannadaLang, ml: MalayalamLang };
                  return map[code?.toLowerCase()];
                })
                .filter(Boolean)
                .map((LangIcon, index) => (
                  <span key={index} className="flex items-center justify-center w-3 h-3 rounded-full overflow-hidden">
                    <LangIcon width={15} height={10} />
                  </span>
                ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            {service.services && service.services.length > 0 ? (
              <>
                {service.services.slice(0, 1).map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-violet-50 text-violet-500 text-xs font-medium rounded-full truncate max-w-[90px]">
                    {tag}
                  </span>
                ))}
                {service.services.length > 1 && (
                  <span className="px-3 py-1 bg-violet-50 text-violet-500 text-xs font-medium rounded-full">
                    +{service.services.length - 1}
                  </span>
                )}
              </>
            ) : (
              <span className="text-sm font-medium text-pink-600 hover:opacity-80 transition-opacity">
                Book Now
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
