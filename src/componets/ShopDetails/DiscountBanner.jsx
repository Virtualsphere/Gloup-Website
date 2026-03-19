import React from 'react';

const DiscountBanner = ({ maxDiscount }) => {
  if (!maxDiscount || maxDiscount <= 0) return null;

  return (
    <>
      {/* Mobile: thin top bar */}
      <div className="lg:hidden bg-green-100 py-1.5 px-4 flex items-center justify-center">
        <div className="w-5 h-5 mr-2 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-[10px] font-bold">%</span>
        </div>
        <p className="text-green-600 text-sm font-medium">
          Flat {maxDiscount}% offer is waiting for you...
        </p>
      </div>

      {/* Desktop: green card below the booking card */}
      <div className="hidden lg:block rounded-2xl overflow-hidden mt-3" style={{ background: 'linear-gradient(135deg, #34d399, #10b981)' }}>
        <div className="p-4 flex items-start gap-3">
          <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-sm font-bold">%</span>
          </div>
          <div>
            <p className="text-white font-bold text-[15px] leading-snug">
              Flat {maxDiscount}% offers waiting for you!
            </p>
            <p className="text-white/80 text-xs mt-1 leading-relaxed">
              Use code <span className="font-semibold text-white">&quot;GLOUP{maxDiscount}&quot;</span> at checkout for exclusive discounts on all services.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscountBanner;

