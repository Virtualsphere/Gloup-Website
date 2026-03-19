import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useMapFilterStore } from '../../store/mapFilterStore';

const MapFilter = () => {
  const { filters, setGender } = useMapFilterStore();
  const activeCategory = filters.gender;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['All', 'Male', 'Female', 'Unisex', 'Kids'];

  return (
    <div className="relative">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1 scrollbar-hide w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        
        {/* Filters Dropdown Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full font-medium text-sm shadow-sm hover:bg-gray-900 transition-colors whitespace-nowrap flex-shrink-0"
          aria-label="Toggle Filters"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="flex-shrink-0"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
          Filters
          <ChevronDown size={16} className="flex-shrink-0" />
        </button>

        {/* Category Tabs */}
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              if (category === 'All') {
                setGender(''); // Clear filter if "All" is clicked
              } else {
                setGender(category);
              }
            }}
            className={`px-5 py-2 rounded-full text-sm font-medium border whitespace-nowrap shadow-sm transition-colors flex-shrink-0 ${
              (activeCategory === category) || (category === 'All' && !activeCategory)
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-black'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filter Dropdown Content */}
      {isFilterOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl p-4 animate-fadeIn z-50 min-w-[200px] border border-gray-100">
          <p className="text-sm text-gray-500">More filter options coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default MapFilter;
