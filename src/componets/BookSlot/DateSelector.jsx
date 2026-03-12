import React, { useRef, useEffect } from 'react';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, isSameDay, isBefore, startOfDay } from 'date-fns';

const DateSelector = ({ currentMonth, selectedDate, onDateSelect }) => {
  const scrollContainerRef = useRef(null);
  
  // Generate days for the current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const today = startOfDay(new Date());

  // Scroll to selected date when changed (optional, could be nice UX)
  useEffect(() => {
    if (selectedDate && scrollContainerRef.current) {
        // Find the selected element index
        const index = daysInMonth.findIndex(day => isSameDay(day, selectedDate));
        if (index !== -1) {
            const element = scrollContainerRef.current.children[index];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }
  }, [selectedDate, currentMonth]); // Depend on currentMonth to re-scroll if needed when changing months

  return (
    <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-4 px-4 py-2 gap-3 scrollbar-hide snap-x"
    >
      {daysInMonth.map((date) => {
        const isSelected = isSameDay(date, selectedDate);
        const isPast = isBefore(startOfDay(date), today);

        return (
          <button
            key={date.toISOString()}
            onClick={() => !isPast && onDateSelect(date)}
            disabled={isPast}
            className={`
              flex-shrink-0 w-[4.5rem] h-20 rounded-2xl flex flex-col items-center justify-center snap-center border transition-all duration-200 outline-none
              ${
                isPast
                  ? 'bg-gray-200 border-gray-200 cursor-not-allowed'
                  : isSelected 
                    ? 'bg-black text-white border-black shadow-lg transform scale-105 cursor-pointer' 
                    : 'bg-stone-100 text-stone-400 lg:bg-white lg:border-gray-200 border-transparent hover:bg-stone-200 cursor-pointer'
              }
            `}
          >
            <span className={`text-xs font-medium mb-1 ${
              isPast ? 'text-gray-400' : isSelected ? 'text-stone-300' : 'text-stone-400'
            }`}>
              {format(date, 'EE')}
            </span>
            <span className={`text-xl font-bold ${
              isPast ? 'text-gray-400' : isSelected ? 'text-white' : 'text-stone-800'
            }`}>
              {format(date, 'd')}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default DateSelector;
