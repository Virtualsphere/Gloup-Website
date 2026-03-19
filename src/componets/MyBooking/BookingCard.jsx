import React from 'react';
import { Calendar, Clock, Navigation, Info } from 'lucide-react';
import SalonMiniCard from './SalonMiniCard';

const STATUS_STYLES = {
  Upcoming:  'bg-blue-50 text-blue-600',
  Completed: 'bg-green-50 text-green-600',
  Cancelled: 'bg-red-50 text-red-500',
};

const BookingCard = ({ booking, onViewDetails }) => {
  const {
    id,
    bookingId,
    status,
    salonName,
    salonLocation,
    salonRating,
    salonImage,
    isPremium,
    date,
    time,
    services = [],
    paidAmount,
  } = booking;

  const statusStyle = STATUS_STYLES[status] || 'bg-gray-100 text-gray-500';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      {/* Salon Info */}
      <SalonMiniCard
        name={salonName}
        location={salonLocation}
        rating={salonRating}
        imageUrl={salonImage}
        isPremium={isPremium}
      />

      <div className="border-t border-gray-100 mx-4" />

      {/* Booking Meta */}
      <div className="px-4 pt-3 pb-2">
        {/* Booking ID + Status badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-500 font-medium">Booking ID: {bookingId}</span>
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${statusStyle}`}>
            {status}
          </span>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-5 mb-3">
          <div className="flex items-center gap-1.5 text-gray-700 text-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{date}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-700 text-sm">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{time}</span>
          </div>
        </div>

        {/* Services */}
        <p className="text-sm font-semibold text-gray-800 mb-1.5">Services:</p>
        <div className="space-y-1 mb-3">
          {services.map((service, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm text-gray-500 before:content-['•'] before:mr-1.5 before:text-gray-400">
                {service.name}
              </span>
              <span className="text-sm text-gray-700 font-medium">₹{service.price}</span>
            </div>
          ))}
        </div>

        {/* Paid Amount */}
        <div className="flex items-center justify-between bg-gray-100 rounded-xl px-3 py-2.5">
          <span className="text-sm font-bold text-gray-800">Paid Amount</span>
          <span className="text-sm font-bold text-gray-900">₹{paidAmount}</span>
        </div>
      </div>

      {/* Action Buttons — hidden for Cancelled bookings */}
      {status !== 'Cancelled' && (
        <div className="flex items-center gap-3 px-4 pb-4 pt-2">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-900 text-gray-900 text-sm font-semibold hover:bg-gray-50 transition-colors">
            <Navigation className="w-4 h-4" />
            Directions
          </button>
          <button
            onClick={() => onViewDetails?.(booking)}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            <Info className="w-4 h-4" />
            Details
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingCard;
