import React, { useEffect, useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { Link, useParams } from 'react-router-dom';
import CalendarHeader from './CalendarHeader';
import DateSelector from './DateSelector';
import TimeSlotGrid from './TimeSlotGrid';
import SlotLegend from './SlotLegend';
import OfferBanner from './OfferBanner';
import DeskBookingCard from './DeskBookingCard';
import { useBookingStore } from '../../store/bookingStore';

const SlotBookingSection = () => {
  const { id } = useParams();

  // ─── Booking Store ───────────────────────────────────────────────────────
  const setSlot     = useBookingStore((s) => s.setSlot);
  const storedSlot  = useBookingStore((s) => s.slot);

  // Re-hydrate local state from the store so the user's previous selection
  // is still shown when they navigate back to this page.
  const [currentMonth, setCurrentMonth] = useState(
    storedSlot.selectedDate ? new Date(storedSlot.selectedDate) : new Date()
  );
  const [selectedDate, setSelectedDate] = useState(
    storedSlot.selectedDate ? new Date(storedSlot.selectedDate) : new Date()
  );
  const [selectedSlot, setSelectedSlot] = useState(
    storedSlot.selectedSlot ?? null
  );

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handlePrevMonth = () => setCurrentMonth(prev => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentMonth(prev => addMonths(prev, 1));

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    if (date.getMonth() !== currentMonth.getMonth()) setCurrentMonth(date);
    // Mirror to store — clear the previously selected slot when date changes
    setSlot({ selectedDate: date, selectedSlot: null });
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    // Mirror to store
    setSlot({ selectedSlot: slot });
  };

  return (
    <div className="bg-white lg:bg-gray-100 min-h-screen pb-32 lg:pb-8">
      <div className="lg:px-10 xl:px-32 lg:pt-6">

        {/* Breadcrumb + Title (desktop only) */}
        <div className="hidden lg:block mb-6">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link to="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop-details" className="hover:text-gray-600 transition-colors">Mohan Men&apos;s Park Salon</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">Book Slot</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">Book Slot</h1>
        </div>

        {/* Single column on mobile → 2-column grid on desktop */}
        <div className="lg:grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] lg:gap-8 lg:items-start">

          {/* Main content */}
          <div className="w-full bg-white lg:bg-gray-100 lg:overflow-hidden min-h-screen lg:min-h-0">
            <OfferBanner />
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
            <div className="mt-6 px-4 lg:px-0 pb-6">
              <TimeSlotGrid
                saloonId={id}
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                onSelect={handleSlotSelect}
              />
            </div>
          </div>

          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <DeskBookingCard selectedSlot={selectedSlot} selectedDate={selectedDate} id={id} />
          </div>

        </div>
      </div>

      {/* Mobile: fixed bottom slot legend */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
        <SlotLegend selectedSlot={selectedSlot} selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default SlotBookingSection;