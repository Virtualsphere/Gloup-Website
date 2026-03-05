import React from 'react'
import { Link } from 'react-router-dom';
import DiscountBanner from './DiscountBanner';

const PriceSection = ({ services, addedServices, id }) => {
  if (addedServices.size === 0) return null;

  let totalPrice = 0;
  let maxDiscount = 0;

  services.forEach(service => {
    if (addedServices.has(service.id)) {
      totalPrice += service.price;
      if (service.discountPercentage) {
        const discountVal = parseInt(service.discountPercentage);
        if (!isNaN(discountVal) && discountVal > maxDiscount) {
          maxDiscount = discountVal;
        }
      }
    }
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:sticky lg:top-28 lg:bottom-auto lg:left-auto lg:right-auto lg:z-40 lg:w-full">
      {/* Mobile: discount bar sits above the black bar */}
      <div className="lg:hidden">
        <DiscountBanner maxDiscount={maxDiscount} />
      </div>

      {/* White booking card (desktop) / black bar (mobile) */}
      <div className="bg-black lg:bg-white p-4 lg:p-5 lg:rounded-2xl lg:border lg:border-gray-200 lg:shadow-sm flex lg:flex-col items-center lg:items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <h2 className="hidden lg:block text-lg font-bold text-gray-900 mb-0.5">Mohan Men&apos;s Park Salon &amp; Spa</h2>
          <span className="text-gray-400 text-sm">
            {addedServices.size} service{addedServices.size > 1 ? 's' : ''} added
          </span>
          <span className="text-white lg:text-gray-900 text-xl lg:text-3xl font-bold lg:mt-1">
            ₹{totalPrice}
          </span>
        </div>
        <Link
          to={`/${id}/book-slot`}
          className="bg-white lg:bg-black text-black lg:text-white px-8 lg:px-0 py-3 lg:py-3.5 w-auto lg:w-full lg:text-center rounded-xl font-bold lg:font-semibold text-base hover:bg-gray-100 lg:hover:bg-gray-900 transition-colors lg:mt-4"
        >
          Book Now
        </Link>
      </div>

      {/* Desktop: green discount card sits below the white card */}
      <div className="hidden lg:block">
        <DiscountBanner maxDiscount={maxDiscount} />
      </div>
    </div>
  )
}

export default PriceSection