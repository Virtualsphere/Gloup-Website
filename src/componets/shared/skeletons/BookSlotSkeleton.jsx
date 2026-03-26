import React from 'react'

const P = ({ className }) => (
  <div className={`bg-gray-300 animate-pulse rounded-xl ${className}`} />
)

const BookSlotSkeleton = () => (
  <div className="min-h-screen bg-gray-100 pb-28">

    {/* Shop header */}
    <div className="bg-white px-4 lg:px-10 xl:px-32 py-4 flex items-center gap-3 shadow-sm">
      <P className="w-12 h-12 rounded-full flex-shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <P className="h-5 w-40" />
        <P className="h-3 w-24" />
      </div>
    </div>

    <div className="px-4 lg:px-10 xl:px-32 mt-5 flex flex-col gap-6">

      {/* Date picker row */}
      <div>
        <P className="h-5 w-28 mb-3" />
        <div className="flex gap-3 overflow-hidden">
          {[...Array(7)].map((_, i) => (
            <P key={i} className="flex-shrink-0 w-14 h-16 rounded-2xl" />
          ))}
        </div>
      </div>

      {/* Time slots grid */}
      <div>
        <P className="h-5 w-28 mb-3" />
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-3">
          {[...Array(12)].map((_, i) => (
            <P key={i} className="h-10 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Staff section */}
      <div>
        <P className="h-5 w-24 mb-3" />
        <div className="flex gap-4 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2">
              <P className="w-16 h-16 rounded-full" />
              <P className="h-3 w-14" />
            </div>
          ))}
        </div>
      </div>

    </div>

    {/* Bottom bar */}
    <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] flex gap-4 items-center lg:hidden">
      <P className="flex-1 h-12 rounded-2xl" />
    </div>
  </div>
)

export default BookSlotSkeleton
