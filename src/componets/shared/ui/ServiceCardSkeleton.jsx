import React from 'react'

const ServiceCardSkeleton = ({ className = "" }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-md animate-pulse overflow-hidden flex flex-col h-full ${className}`}>
      {/* Image area */}
      <div className="h-48 bg-gray-200 w-full relative">
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-300"></div>
        <div className="absolute bottom-3 right-3 bg-gray-300 w-16 h-6 rounded-lg"></div>
      </div>
      
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title & Logo & Rating row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="w-10 h-4 bg-gray-200 rounded flex-shrink-0"></div>
        </div>
        
        {/* Location row */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-4 h-4 bg-gray-200 rounded-full flex-shrink-0"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
        
        {/* Footer row (Languages & tags) */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceCardSkeleton
