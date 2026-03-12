import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, isBefore, startOfMonth } from 'date-fns';

const CalendarHeader = ({ currentMonth, onPrevMonth, onNextMonth }) => {
  const isPastMonthDisabled = isBefore(currentMonth, startOfMonth(new Date()));

  return (
    <div className="flex items-center justify-between px-4 lg:px-0 py-4 bg-white lg:bg-gray-100">
      {/* Month + Year — left on desktop, centered on mobile */}
      <div className="flex items-center gap-2 flex-1 lg:flex-none">
        {/* Mobile: prev arrow before the month */}
        <button
          onClick={isPastMonthDisabled ? undefined : onPrevMonth}
          disabled={isPastMonthDisabled}
          className={`lg:hidden p-2 rounded-full transition-colors ${
            isPastMonthDisabled 
              ? 'text-gray-200 cursor-not-allowed' 
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <span className="text-lg lg:text-3xl font-semibold lg:font-bold text-gray-900 flex-1 text-center lg:text-left">
          {format(currentMonth, 'MMMM yyyy')}
        </span>
      </div>

      {/* Mobile: next arrow on right */}
      <button
        onClick={onNextMonth}
        className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-900 hover:text-black"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Desktop: both arrows grouped on the right */}
      <div className="hidden lg:flex items-center gap-1">
        <button
          onClick={isPastMonthDisabled ? undefined : onPrevMonth}
          disabled={isPastMonthDisabled}
          className={`p-2 rounded-full transition-colors ${
             isPastMonthDisabled 
               ? 'text-gray-200 cursor-not-allowed' 
               : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-900 hover:text-black"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;

