import React from 'react';
import { Tag } from "lucide-react";

const OfferBanner = () => {
  return (
    <div className="bg-green-50 z-40 border border-green-200 px-4 py-2.5 flex items-center justify-center gap-2 mb-3 shadow-sm sticky top-[80px] w-full">
        <Tag className="text-green-500 w-4 h-4 flex-shrink-0" />
        <span className="text-green-700 text-sm font-semibold tracking-wide">
        Flat 25% offer is waiting for you!
        </span>
    </div>
  );
};

export default OfferBanner;
