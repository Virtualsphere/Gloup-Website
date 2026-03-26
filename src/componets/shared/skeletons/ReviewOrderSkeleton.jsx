import React from 'react'

const P = ({ className }) => (
  <div className={`bg-gray-300 animate-pulse rounded-xl ${className}`} />
)

const ReviewOrderSkeleton = () => (
  <div className="min-h-screen bg-gray-100 pb-28">

    <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-8 px-4 lg:px-10 xl:px-32 pt-4">

      {/* Left: order items */}
      <div className="flex flex-col gap-5">
        {/* Shop info */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-3">
          <P className="w-12 h-12 rounded-full flex-shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <P className="h-5 w-40" />
            <P className="h-3 w-28" />
          </div>
        </div>

        {/* Service items */}
        <P className="h-5 w-32" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <P className="h-4 w-40" />
              <P className="h-3 w-24" />
            </div>
            <P className="h-5 w-16" />
          </div>
        ))}

        {/* Date/time */}
        <div className="bg-white rounded-2xl p-4 flex flex-col gap-3">
          <P className="h-4 w-28" />
          <P className="h-4 w-48" />
        </div>
      </div>

      {/* Right: payment summary (desktop) */}
      <div className="hidden lg:flex flex-col gap-4 mt-0">
        <div className="bg-white rounded-2xl p-5 flex flex-col gap-4 sticky top-24">
          <P className="h-5 w-36" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <P className="h-4 w-32" />
              <P className="h-4 w-16" />
            </div>
          ))}
          <P className="h-12 w-full rounded-2xl mt-2" />
        </div>
      </div>
    </div>

    {/* Mobile fixed pay bar */}
    <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] lg:hidden">
      <P className="h-12 w-full rounded-2xl" />
    </div>
  </div>
)

export default ReviewOrderSkeleton
