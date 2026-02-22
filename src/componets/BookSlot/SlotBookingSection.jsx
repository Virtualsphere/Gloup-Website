import React, { useEffect, useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import SalonCard from './SalonCard';
import CalendarHeader from './CalendarHeader';
import DateSelector from './DateSelector';
import TimeSlotGrid from './TimeSlotGrid';

import SlotLegend from './SlotLegend';
import OfferBanner from './OfferBanner';

const SlotBookingSection = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);

useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const handlePrevMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset slot selection on date change
    // If selecting a date from a different month (edge case if we show adjacent days), update currentMonth
    if (date.getMonth() !== currentMonth.getMonth()) {
        setCurrentMonth(date);
    }
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-32">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm">
        <OfferBanner />
        <SalonCard />
        
        <div className="mt-2">
            <CalendarHeader 
                currentMonth={currentMonth}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
            />
            <DateSelector 
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
            />
            <div className="mt-6 px-4">
              <TimeSlotGrid 
                selectedDate={selectedDate} 
                selectedSlot={selectedSlot}
                onSelect={handleSlotSelect}
              />
            </div>
            <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
                <SlotLegend 
                  selectedSlot={selectedSlot} 
                  selectedDate={selectedDate}
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default SlotBookingSection;