import React from 'react';
import TimeSlotCard from './TimeSlotCard';
import { isBefore, startOfToday, format, parse, isToday } from 'date-fns';
import { useGetSlots } from '../../hooks/services/useGetSlots';

const TimeSlotGrid = ({ selectedDate, selectedSlot, onSelect, saloonId }) => {
  // Format selected date as YYYY-MM-DD for the API
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');
  
  // Fetch available slots from API
  const { data, isLoading, isError } = useGetSlots(saloonId, formattedDate);

  // Check if the selected date is strictly before today
  const isPastDate = isBefore(selectedDate, startOfToday());
  const isCurrentDay = isToday(selectedDate);
  const now = new Date();

  // Helper to determine if a slot's time has already passed today
  const isSlotPastTime = (timeString) => {
    if (!isCurrentDay) return false; // Future days don't have past times
    
    try {
      // Parse the slot time into a Date object on the current day
      const slotTime = parse(timeString, 'HH:mm:ss', new Date());
      return isBefore(slotTime, now);
    } catch {
      return false; // Safely fall back if parsing fails
    }
  };

  const handleSlotClick = (slot) => {
    if (slot.available && !isPastDate && !slot.isPastTime) {
      onSelect(slot);
    }
  };

  // Convert "09:30:00" to "09:30 AM" format
  const formatTimeSlot = (timeString) => {
    try {
      const parsedTime = parse(timeString, 'HH:mm:ss', new Date());
      return format(parsedTime, 'hh:mm a');
    } catch {
      return timeString; // Fallback to raw string if parsing fails
    }
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <h3 className="text-lg md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">Available Slots</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-14 bg-gray-200 animate-pulse rounded-full w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full text-center py-6 text-red-500">
        Failed to load slots for this date.
      </div>
    );
  }

  const slots = data?.data || [];

  return (
    <div className="w-full">
      <h3 className="text-lg md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">Available Slots</h3>
      
      {slots.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No slots available for this date.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
          {slots.map((apiSlot, index) => {
            const isPastTime = isSlotPastTime(apiSlot.time);
            
            // Map the API structure to the structure expected by TimeSlotCard
            const slot = {
              id: index,
              // Formatted presentation: e.g. "09:30 AM"
              time: formatTimeSlot(apiSlot.time), 
              // Convert "available" status string to boolean
              available: apiSlot.status?.toLowerCase() === 'available', 
              isPastTime: isPastTime,
              raw: apiSlot // Store raw for booking request later
            };

            return (
              <TimeSlotCard
                key={index}
                slot={slot}
                isSelected={selectedSlot?.id === slot.id}
                isDisabled={!slot.available || isPastDate || isPastTime}
                onClick={handleSlotClick}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TimeSlotGrid;
