import React, { useEffect } from 'react';
import { X, Calendar, Clock, Info, MapPin, Star, Scissors, CreditCard, Phone, Store, XCircle } from 'lucide-react';

const STATUS_STYLES = {
  Upcoming:  'text-blue-500',
  Completed: 'text-green-600',
  Cancelled: 'text-red-500',
};

const BookingDetailModal = ({ booking, onClose }) => {
  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!booking) return null;

  const statusColor = STATUS_STYLES[booking.status] || 'text-gray-600';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 animate-fadeIn"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[93vh] flex flex-col rounded-t-3xl animate-slideUp overflow-hidden bg-gray-100">

        {/* ── Header (on gray bg) ── */}
        <div className="flex items-start justify-between px-5 pt-6 pb-4 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
            <p className="text-sm text-gray-400 mt-0.5">ID: {booking.bookingId}</p>
          </div>
          <button
            onClick={onClose}
            className="mt-0.5 p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
          </button>
        </div>

        {/* ── Scrollable body (gray bg) ── */}
        <div className="overflow-y-auto flex-1 px-4 pb-6 space-y-6">

          {/* Salon Card — white card on gray */}
          <div className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
              <img
                src={booking.salonImage || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200&q=80'}
                alt={booking.salonName}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg leading-tight">{booking.salonName}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold text-gray-800">{booking.salonRating}</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{booking.salonLocation}</span>
              </div>
            </div>
          </div>

          {/* Appointment Details — on gray, no wrapper card */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <Calendar className="w-5 h-5 text-gray-900" />
              <h3 className="font-bold text-gray-900 text-base">Appointment Details</h3>
            </div>
            <div className="space-y-2.5 pl-1">
              <div className="flex items-center gap-2.5 text-gray-600 text-[15px]">
                <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span>Date: <span className="font-semibold text-gray-900">{booking.date}</span></span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-600 text-[15px]">
                <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span>Time: <span className="font-semibold text-gray-900">{booking.time}</span></span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-600 text-[15px]">
                <Info className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span>Status: <span className={`font-semibold ${statusColor}`}>{booking.status}</span></span>
              </div>
            </div>
          </div>

          {/* Services Booked — each service is its own white card */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <Scissors className="w-5 h-5 text-gray-900" />
              <h3 className="font-bold text-gray-900 text-base">Services Booked</h3>
            </div>
            <div className="space-y-2.5">
              {booking.services.map((service, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white rounded-xl px-4 py-3.5 shadow-sm"
                >
                  <span className="text-[15px] text-gray-800">{service.name}</span>
                  <span className="text-[15px] font-semibold text-gray-900">₹{service.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary — white card with divider */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <CreditCard className="w-5 h-5 text-gray-900" />
              <h3 className="font-bold text-gray-900 text-base">Payment Summary</h3>
            </div>
            <div className="bg-white rounded-2xl px-4 shadow-sm">
              <div className="flex items-center justify-between py-4">
                <span className="text-[15px] text-gray-500">Total Amount</span>
                <span className="text-[15px] font-semibold text-gray-900">₹{booking.paidAmount}</span>
              </div>
              {/* Divider — hints more rows could follow */}
              <div className="border-t border-gray-200" />
            </div>
          </div>

        </div>

        {/* ── Fixed Bottom Actions (white bg) ── */}
        <div className="flex-shrink-0 bg-white px-4 pt-4 pb-8 space-y-3">
          {/* Contact + View Salon */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full border-2 border-black text-black text-sm font-bold hover:bg-gray-50 transition-colors">
              <Phone className="w-4 h-4" />
              Contact
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-black text-white text-sm font-bold hover:bg-gray-800 transition-colors">
              <Store className="w-4 h-4" />
              View Salon
            </button>
          </div>

          {/* Cancel Booking — only for Upcoming */}
          {booking.status === 'Upcoming' && (
            <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full border-2 border-red-400 text-red-500 text-sm font-bold hover:bg-red-50 transition-colors">
              <XCircle className="w-4 h-4" />
              Cancel Booking
            </button>
          )}
        </div>

      </div>
    </>
  );
};

export default BookingDetailModal;
