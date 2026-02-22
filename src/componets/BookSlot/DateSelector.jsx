import React, { useRef, useEffect } from 'react';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, isSameDay } from 'date-fns';

const DateSelector = ({ currentMonth, selectedDate, onDateSelect }) => {
  const scrollContainerRef = useRef(null);
  
  // Generate days for the current month
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

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
        return (
          <div
            key={date.toISOString()}
            onClick={() => onDateSelect(date)}
            className={`
              flex-shrink-0 w-[4.5rem] h-20 rounded-2xl flex flex-col items-center justify-center cursor-pointer snap-center border transition-all duration-200
              ${isSelected 
                ? 'bg-black text-white border-black shadow-lg transform scale-105' 
                : 'bg-stone-100 text-stone-400 lg:bg-white lg:border-gray-200 border-transparent hover:bg-stone-200'
              }
            `}
          >
            <span className={`text-xs font-medium mb-1 ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
              {format(date, 'EE')}
            </span>
            <span className={`text-xl font-bold ${isSelected ? 'text-white' : 'text-stone-800'}`}>
              {format(date, 'd')}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default DateSelector;
