import React from 'react'

const P = ({ className }) => (
  <div className={`bg-gray-300 animate-pulse rounded-xl ${className}`} />
)

const CategorySkeleton = () => (
  <div className="min-h-screen bg-gray-100">
    {/* Hero */}
    <P className="w-full h-40 lg:h-56 rounded-none" />

    <div className="px-4 lg:px-10 xl:px-32 py-6 flex flex-col gap-5">
      {/* Title */}
      <P className="h-7 w-44" />

      {/* Filter chips */}
      <div className="flex gap-3 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <P key={i} className="h-8 w-20 rounded-full flex-shrink-0" />
        ))}
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <P className="h-44 w-full" />
            <P className="h-4 w-3/4" />
            <P className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default CategorySkeleton
