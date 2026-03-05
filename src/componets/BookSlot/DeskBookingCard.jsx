import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const DeskBookingCard = ({ selectedSlot, selectedDate, id }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden sticky top-28">
      {/* Slot Time */}
      <div className="p-5 flex items-start justify-between gap-4">
        <div className="flex-1">
          {selectedSlot ? (
            <>
              <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                {selectedSlot.time}
              </h2>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Slot Selected</span>
                <span className="flex items-center gap-1 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M6 0L7.854 4.146L12 6L7.854 7.854L6 12L4.146 7.854L0 6L4.146 4.146L6 0Z" fill="currentColor"/>
                  </svg>
                  20% off
                </span>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-400 mb-2 leading-tight">
                No Slot Selected
              </h2>
              <p className="text-sm text-gray-400">
                Pick a time from the grid
              </p>
            </>
          )}
        </div>

        {/* Salon chair icon */}
        <div className="text-4xl select-none flex-shrink-0">💺</div>
      </div>

      {/* Continue Button */}
      <div className="px-5 pb-5">
        {selectedSlot ? (
          <Link
            to={`/${id}/review-order`}
            state={{
              bookingDate: selectedDate.toLocaleDateString('en-US', {
                weekday: 'short', day: '2-digit', month: 'short', year: 'numeric',
              }),
              bookingTime: selectedSlot.time,
            }}
            className="block w-full text-center bg-black text-white py-3.5 rounded-xl font-semibold text-base hover:bg-gray-900 transition-colors"
          >
            Continue
          </Link>
        ) : (
          <button
            disabled
            className="block w-full text-center bg-gray-100 text-gray-400 py-3.5 rounded-xl font-semibold text-base cursor-not-allowed"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default DeskBookingCard;
