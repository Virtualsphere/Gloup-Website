import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const CalendarHeader = ({ currentMonth, onPrevMonth, onNextMonth }) => {
  return (
    <div className="flex items-center justify-between px-4 py-4 bg-white">
      <button 
        onClick={onPrevMonth}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </span>
        <Calendar className="w-5 h-5 text-gray-900" />
      </div>
      
      <button 
        onClick={onNextMonth}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-900 hover:text-black"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CalendarHeader;
