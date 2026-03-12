import React from 'react';
import { Link } from 'react-router-dom';

const SlotLegend = ({ selectedSlot, selectedDate, id }) => {
  if (selectedSlot) {
    return (
      <div className="flex items-center justify-between w-full h-14">
        <div className="flex flex-col">

          <span className="text-xs text-gray-500">
            Selected Slot
          </span>

          <span className="text-sm font-semibold text-black">
            {selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>

          <span className="text-gray-900 font-semibold mb-0.5">
            {selectedSlot.time}{selectedSlot.endTime ? ` - ${selectedSlot.endTime}` : ''}
          </span>
          
        </div>
        <Link
        to={`/${id}/review-order`}
        state={{ 
          bookingDate: selectedDate.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }), 
          bookingTime: selectedSlot.time 
        }}
          className="bg-black text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors shadow-lg"
          onClick={() => console.log('Continue clicked')} // Placeholder for now
        >
          Continue
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between w-full h-14 px-2">
        {/* Not Available */}
        <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-gray-200"></div>
            <span className="text-xs text-gray-500 font-medium">Not Available</span>
        </div>

        {/* Available */}
        <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg border border-gray-300"></div>
            <span className="text-xs text-gray-500 font-medium">Available</span>
        </div>

        {/* Selected */}
        <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-black"></div>
            <span className="text-xs text-gray-500 font-medium">Selected</span>
        </div>
    </div>
  );
};

export default SlotLegend;
