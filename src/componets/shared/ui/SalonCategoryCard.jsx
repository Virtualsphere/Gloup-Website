import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import HeartOutline from "../../../assets/icons/ic_heart.svg?react";
import HeartFill from "../../../assets/icons/ic_heart_fill.svg?react";
import EnglishLang from "../../../assets/icons/ic_en.svg?react";
import HindiLang from "../../../assets/icons/ic_hi.svg?react";
import TamilLang from "../../../assets/icons/ic_ta.svg?react";
import TeluguLang from "../../../assets/icons/ic_te.svg?react";
import KannadaLang from "../../../assets/icons/ic_kn.svg?react";
import MalayalamLang from "../../../assets/icons/ic_ml.svg?react";
import CrownIcon from "../../../assets/icons/ic_crown.svg?react";
import { useToggleFavourite } from "../../../hooks/services/useToggleFavourite";
import { useGetFavourites } from "../../../hooks/services/useGetFavourites";
import { useAuthStore } from "../../../store/authStore";
import { useUiStore } from "../../../store/uiStore";

const LANG_MAP = {
  en: EnglishLang,
  hi: HindiLang,
  ta: TamilLang,
  te: TeluguLang,
  kn: KannadaLang,
  ml: MalayalamLang,
};

/**
 * SalonCategoryCard — horizontal list card matching the SaloonCategoryPage design.
 * Left: square image with optional crown + price pill.
 * Right: name (bold), star rating top-right, location + distance, language icons, category tags.
 */
const SalonCategoryCard = ({ salon }) => {


 





  // — Safe defaults ——————————————————————
  const image    = salon?.image    || salon?.images?.[0] || "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80";
  const name     = salon?.name     || "Salon Name";
  const rating   = salon?.rating   ?? 0;
  const reviews  = salon?.reviews  ?? 0;
  const location = salon?.location || "Location";
  const distance = salon?.distance || "";
  const price    = salon?.price    ?? 0;
  const isPremium   = salon?.isPremium   || false;
  const services    = Array.isArray(salon?.services) ? salon.services : [];
  const languageCodes = Array.isArray(salon?.languageCodes) ? salon.languageCodes : [];

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.07)] border border-gray-100 flex overflow-hidden w-full min-h-[130px] transition-shadow hover:shadow-md">
      
      {/* ── Left Image ──────────────────────────────────── */}
      <div className="relative w-[120px] h-[120px] flex-shrink-0 self-stretch">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80";
          }}
        />

        {/* Crown badge */}
        {isPremium && (
          <div className="absolute top-2 left-2 bg-amber-400 w-7 h-7 flex items-center justify-center rounded-full shadow z-10">
            <CrownIcon width={14} height={14} fill="white" />
          </div>
        )}

        {/* Price pill */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded-lg shadow-md z-10 whitespace-nowrap">
          ₹{price}
        </div>
      </div>

      {/* ── Right Content ────────────────────────────────── */}
      <div className="flex-1 px-3 py-3 flex flex-col gap-1.5 relative min-w-0">

        {/* Row 1: Name + Rating */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 flex-1">
            {name}
          </h3>
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <span className="text-amber-400 text-sm leading-none">★</span>
            <span className="text-xs font-bold text-gray-900 leading-none">{Number(rating).toFixed(1)}</span>
            <span className="text-xs text-gray-400 leading-none">({reviews})</span>
          </div>
        </div>

        {/* Row 2: Location + Distance */}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin size={12} className="flex-shrink-0 text-gray-700" strokeWidth={2.5} />
          <span className="truncate max-w-[110px]">{location}</span>
          {distance && (
            <>
              <span className="text-gray-300 flex-shrink-0">•</span>
              <span className="flex-shrink-0 whitespace-nowrap">{distance}</span>
            </>
          )}
        </div>

        {/* Row 3: Language icons + Category tags + Heart */}
        <div className="flex items-center justify-between mt-auto pt-1">

          {/* Language icons */}
          <div className="flex items-center gap-1">
            {languageCodes.length > 0
              ? languageCodes.map((code, i, arr) => {
                  const LangIcon = LANG_MAP[code?.toLowerCase()];
                  if (!LangIcon) return null;
                  return (
                    <React.Fragment key={code}>
                      <span className="flex items-center justify-center w-4 h-4 rounded-full overflow-hidden">
                        <LangIcon width={16} height={11} />
                      </span>
                      {i < arr.length - 1 && (
                        <span className="text-gray-300 text-[10px] leading-none">•</span>
                      )}
                    </React.Fragment>
                  );
                })
              : <span className="text-xs text-gray-300">—</span>
            }
          </div>

          {/* Right side: category pill + heart */}
          <div className="flex items-center gap-2">
            {services.length > 0 && (
              <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full truncate max-w-[70px]">
                {services[0]}
              </span>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonCategoryCard;
