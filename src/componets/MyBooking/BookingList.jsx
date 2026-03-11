import React, { useState } from 'react';
import { CalendarX } from 'lucide-react';
import BookingCard from './BookingCard';
import BookingDetailModal from './BookingDetailModal';

const EmptyState = ({ tab }) => (
  <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
      <CalendarX className="w-8 h-8 text-gray-400" />
    </div>
    <p className="text-gray-800 font-semibold text-base mb-1">No {tab} Bookings</p>
    <p className="text-gray-400 text-sm">
      {tab === 'Upcoming'
        ? 'Book a salon service to get started!'
        : `Your ${tab.toLowerCase()} bookings will appear here.`}
    </p>
  </div>
);

const BookingList = ({ bookings, activeTab }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);

  if (!bookings || bookings.length === 0) {
    return <EmptyState tab={activeTab} />;
  }

  return (
    <>
      <div className="px-4 py-4 space-y-4">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onViewDetails={setSelectedBooking}
          />
        ))}
      </div>

      {/* Detail Modal */}
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </>
  );
};

export default BookingList;
