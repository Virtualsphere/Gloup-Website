import React from "react";
import { MapPin } from "lucide-react";
import EnglishLang from "../../assets/icons/ic_en.svg?react";
import HindiLang from "../../assets/icons/ic_hi.svg?react";
import TamilLang from "../../assets/icons/ic_ta.svg?react";
import TeluguLang from "../../assets/icons/ic_te.svg?react";
import KannadaLang from "../../assets/icons/ic_kn.svg?react";
import MalayalamLang from "../../assets/icons/ic_ml.svg?react";

const LANG_MAP = {
  en: EnglishLang,
  hi: HindiLang,
  ta: TamilLang,
  te: TeluguLang,
  kn: KannadaLang,
  ml: MalayalamLang,
};

const MapSalonCard = ({ salon }) => {
  const image = salon?.image || "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80";
  const name = salon?.name || "Salon Name";
  const rating = salon?.rating ?? 0;
  const reviews = salon?.reviews ?? 0;
  const location = salon?.location || "Nearby";
  const distance = salon?.distance || "";
  const price = salon?.price ?? 0;
  const services = Array.isArray(salon?.services) ? salon.services : [];
  const languageCodes = Array.isArray(salon?.languageCodes) ? salon.languageCodes : [];

  return (
    <div className="bg-white rounded-[14px] shadow-sm border border-gray-100 flex overflow-hidden w-full h-[105px] transition-shadow hover:shadow-md">
      
      {/* ── Left Image ──────────────────────────────────── */}
      <div className="relative w-[105px] h-[105px] flex-shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80";
          }}
        />

        {/* Price pill inside image (bottom right) */}
        <div className="absolute bottom-1 right-1 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded-[6px] shadow-sm z-10 flex items-center justify-center">
          <span className="text-[11px] font-bold leading-none translate-y-[0.5px]">₹{price}</span>
        </div>
      </div>

      {/* ── Right Content ────────────────────────────────── */}
      <div className="flex-1 px-3 py-2 flex flex-col min-w-0">
        
        {/* Row 1: Name + Rating */}
        <div className="flex items-start justify-between gap-1">
          <h3 className="text-[14px] font-bold text-gray-900 leading-snug line-clamp-2 flex-1 pt-[1px]">
            {name}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="text-amber-500 text-[13px] leading-none">★</span>
            <div className="flex items-center gap-0.5">
              <span className="text-[13px] font-bold text-gray-900 leading-none">{Number(rating).toFixed(1)}</span>
              <span className="text-[12px] text-gray-400 leading-none">({reviews})</span>
            </div>
          </div>
        </div>

        {/* Row 2: Location + Distance */}
        <div className="flex items-center gap-1.5 text-[12px] text-gray-500 mt-1.5">
          <MapPin size={13} className="flex-shrink-0 text-gray-500" strokeWidth={2.5} />
          <span className="truncate max-w-[120px]">{location}</span>
          {distance && (
            <>
              <span className="text-gray-400 flex-shrink-0 font-bold scale-150 leading-none translate-y-[-1px]">•</span>
              <span className="flex-shrink-0">{distance}</span>
            </>
          )}
        </div>

        {/* Row 3: Language + Category */}
        <div className="flex items-center justify-between mt-auto">
          
          {/* Language icons */}
          <div className="flex items-center gap-[4px]">
            {languageCodes.length > 0 ? (
              languageCodes.map((code, i, arr) => {
                const LangIcon = LANG_MAP[code?.toLowerCase()];
                if (!LangIcon) return null;
                return (
                  <React.Fragment key={code}>
                    <span className="flex items-center justify-center w-[16px] h-[16px] rounded-full overflow-hidden text-gray-600">
                      <LangIcon width={16} height={16} />
                    </span>
                    {i < arr.length - 1 && (
                      <span className="text-gray-400 text-[10px] leading-none font-bold scale-150 translate-y-[-1px]">•</span>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <span className="text-[10px] text-gray-400 opacity-0">-</span>
            )}
          </div>

          {/* Right side: category pill */}
          {services.length > 0 && (
            <span className="text-[11px] font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full truncate max-w-[80px]">
              {services[0]}
            </span>
          )}
        </div>

      </div>
    </div>
  );
};

export default MapSalonCard;
