import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useHomeFilterStore } from '../../store/homeFilterStore'

const Filter = () => {
  const { filters, setGender } = useHomeFilterStore()
  const activeCategory = filters.gender
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const categories = ['Men', 'Female', 'Unisex', 'Baby']

  return (
    <div className="md:hidden bg-white px-3 py-3">
      <div className="flex items-center gap-3">
        {/* Filters Dropdown Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-3xl font-medium text-sm shadow-sm  hover:bg-gray-900 transition-colors"
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
        <div className="flex items-center gap-2 flex-1 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setGender(category)}
              className={`px-4 py-2 rounded-3xl text-sm font-medium border border-gray-200 whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Dropdown Content (Optional - can be expanded later) */}
      {isFilterOpen && (
        <div className="mt-3 bg-white rounded-lg shadow-lg p-4 animate-fadeIn">
          <p className="text-sm text-gray-600">Filter options coming soon...</p>
        </div>
      )}
    </div>
  )
}

export default Filter
