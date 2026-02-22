import React from 'react';
import { Tag, Zap } from "lucide-react";

const OfferBanner = () => {
  return (
    <div className="sticky top-[80px] z-40 lg:static lg:rounded-xl lg:z-0 px-4 py-2.5 flex items-center justify-center gap-2 mb-3 shadow-sm w-full bg-green-50 border border-green-200 lg:bg-blue-50 lg:border-blue-400">
      {/* Mobile icon */}
      <Tag className="text-green-500 w-4 h-4 flex-shrink-0 lg:hidden" />
      {/* Desktop icon */}
      <Zap className="hidden lg:block text-blue-500 w-4 h-4 flex-shrink-0" />

      {/* Mobile text */}
      <span className="text-green-700 text-sm font-semibold tracking-wide lg:hidden">
        Flat 25% offer is waiting for you!
      </span>
      {/* Desktop text */}
      <span className="hidden lg:block text-blue-400 text-sm font-semibold tracking-wide">
        Fast-track entry on Wednesday&apos;s
      </span>
    </div>
  );
};

export default OfferBanner;

