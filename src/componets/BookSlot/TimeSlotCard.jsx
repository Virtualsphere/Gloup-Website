import React from 'react';

const TimeSlotCard = ({ slot, isSelected, isDisabled, onClick }) => {
  return (
    <div
      onClick={() => !isDisabled && onClick(slot)}
      className={`
        relative flex items-center justify-center 
        px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200
        whitespace-nowrap h-14 w-full
        ${isDisabled 
          ? 'bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed' 
          : 'cursor-pointer hover:shadow-sm'
        }
        ${isSelected && !isDisabled
          ? 'bg-black text-white border-black shadow-md' 
          : !isDisabled && 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
        }
      `}
    >
      {/* Ripple effect or other interactions could be added here if needed */}
      <span>{slot.time}</span>
    </div>
  );
};

export default TimeSlotCard;
