import React from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'

const SearchBar = ({ isSticky }) => {
  return (
    <div className="md:hidden w-full">
      <div 
        className={`bg-white flex items-center gap-3 transition-all duration-300 ${
          isSticky 
            ? 'mx-0 rounded-none border-b border-gray-100 px-4 py-4' 
            : 'mx-4 rounded-xl shadow-lg px-4 py-4'
        }`}
      >
        {/* Search Icon */}
        <Search size={20} className="text-black flex-shrink-0" strokeWidth={2} />
        
        {/* Search Input */}
        <input 
          type="text" 
          placeholder="Search for salons, parlors, or massages..."
          className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
        />
        
        {/* Filter Icon */}
        <button 
          className="flex-shrink-0 bg-pink-50 text-pink-500"
          aria-label="Filter"
        >
          <SlidersHorizontal size={20} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}

export default SearchBar
