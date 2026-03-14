import React, { useState } from 'react';
import { Search, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MapSearchBar({ onSearch, initialValue }) {
  const navigate = useNavigate();

  return (
    <div className="absolute top-4 left-4 right-4 z-10">
      <div className="bg-white rounded-full flex items-center px-2 py-1 shadow-[0_2px_12px_rgba(0,0,0,0.12)] border border-gray-100">
        {/* Back Button */}
        <button 
          type="button" 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 text-black transition-colors focus:outline-none"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
        </button>
        
        {/* Divider */}
        <div className="h-6 w-[1px] bg-gray-200 mx-1"></div>

        {/* Search Input */}
        <div className="flex-1 flex items-center px-3">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search for salons, parlors, or mass..."
            className="w-full bg-transparent border-none focus:outline-none text-[14px] text-gray-800 placeholder-gray-500 h-10"
            value={initialValue}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
