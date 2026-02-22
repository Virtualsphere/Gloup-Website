import React, { useState } from 'react';
import TimeSlotCard from './TimeSlotCard';
import { isBefore, startOfToday } from 'date-fns';

const TimeSlotGrid = ({ selectedDate, selectedSlot, onSelect }) => {
  // Dummy data for demonstration/initial implementation
  const initialSlots = [
    { id: 1, time: '10:00 AM - 10:30 AM', available: true },
    { id: 2, time: '10:30 AM - 11:00 AM', available: true },
    { id: 3, time: '11:00 AM - 11:30 AM', available: true },
    { id: 4, time: '11:30 AM - 12:00 PM', available: true },
    { id: 5, time: '12:00 PM - 12:30 PM', available: true },
    { id: 6, time: '12:30 PM - 01:00 PM', available: true },
    { id: 7, time: '01:00 PM - 01:30 PM', available: true },
    { id: 8, time: '01:30 PM - 02:00 PM', available: true },
    { id: 9, time: '02:00 PM - 02:30 PM', available: false }, // Example disabled slot
    { id: 10, time: '02:30 PM - 03:00 PM', available: true },
    { id: 11, time: '03:00 PM - 03:30 PM', available: true },
    { id: 12, time: '03:30 PM - 04:00 PM', available: true },
    { id: 13, time: '04:00 PM - 04:30 PM', available: true },
    { id: 14, time: '04:30 PM - 05:00 PM', available: true },
    { id: 15, time: '05:00 PM - 05:30 PM', available: true },
    { id: 16, time: '05:30 PM - 06:00 PM', available: true },
  ];

  // Check if the selected date is strictly before today
  // startOfToday() returns 00:00:00 of today.
  // If selectedDate (even with time) is before startOfToday, it's a past date.
  // However, selectedDate usually has some time component or is just the date. 
  // Let's assume selectedDate is a Date object.
  // If we want to disable *past dates*, we check if start of selected day < start of today.
  
  const isPastDate = isBefore(selectedDate, startOfToday());

  const handleSlotClick = (slot) => {
    if (slot.available && !isPastDate) {
      onSelect(slot);
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-lg md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">Available Slots</h3>
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
        {initialSlots.map((slot) => (
          <TimeSlotCard
            key={slot.id}
            slot={slot}
            isSelected={selectedSlot?.id === slot.id}
            isDisabled={!slot.available || isPastDate}
            onClick={handleSlotClick}
          />
        ))}
      </div>
    </div>
  );
};


export default TimeSlotGrid;
