import React from 'react'

/**
 * Full-page skeleton shown while a lazy-loaded page chunk is being fetched.
 * Mimics a generic content layout: top bar, hero block, a few card rows.
 */
const PageSkeleton = () => (
  <div className="min-h-screen bg-gray-100 animate-pulse">
    {/* Hero block */}
    <div className="w-full h-[600px] bg-gray-300" />

    <div className="px-4 lg:px-10 xl:px-32 py-6 flex flex-col gap-6">
      {/* Title row */}
      <div className="h-6 w-48 bg-gray-300 rounded-full" />

      {/* Card row */}
      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3,4,5,6,7].map((i) => (
          <div key={i} className="flex-shrink-0 w-64 h-48 bg-gray-300 rounded-2xl" />
        ))}
      </div>

      {/* Second title row */}
      <div className="h-6 w-40 bg-gray-300 rounded-full" />

      {/* Second card row */}
      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-shrink-0 w-64 h-48 bg-gray-300 rounded-2xl" />
        ))}
      </div>
    </div>
  </div>
)

export default PageSkeleton
