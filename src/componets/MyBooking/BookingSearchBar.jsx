import React from 'react';
import { Search } from 'lucide-react';

const BookingSearchBar = ({ value, onChange }) => {
  return (
    <div className="px-4 lg:px-10 lg:hidden xl:px-32 py-3 bg-white border-b border-gray-100">
      <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-2.5">
        <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search bookings..."
          className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
        />
      </div>
    </div>
  );
};

export default BookingSearchBar;
