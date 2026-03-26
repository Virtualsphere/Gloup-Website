import React from 'react'

const MapSkeleton = () => (
  <div className="fixed inset-0 bg-gray-300 animate-pulse flex items-center justify-center">
    <div className="flex flex-col items-center gap-3 opacity-30">
      {/* Map pin icon */}
      <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="text-gray-600">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
      </svg>
      <p className="text-gray-600 font-medium text-sm">Loading Map...</p>
    </div>
  </div>
)

export default MapSkeleton
