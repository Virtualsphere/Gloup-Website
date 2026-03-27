import React from 'react'

// Service row skeleton — matches exact structure in Services.jsx
const ServiceRowSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-2xl p-4 animate-pulse">
    <div className="flex items-start justify-between mb-2">
      {/* Service name */}
      <div className="h-5 bg-gray-200 rounded w-48" />
      {/* + Add button */}
      <div className="h-9 w-24 bg-gray-200 rounded-full flex-shrink-0 ml-4" />
    </div>
    {/* Duration row */}
    <div className="flex items-center gap-1.5 mb-3">
      <div className="w-4 h-4 bg-gray-200 rounded-full" />
      <div className="h-3 bg-gray-200 rounded w-20" />
    </div>
    {/* Price row: price + strikethrough + discount badge */}
    <div className="flex items-center gap-2">
      <div className="h-6 w-16 bg-gray-200 rounded" />
      <div className="h-4 w-12 bg-gray-200 rounded" />
      <div className="h-5 w-16 bg-gray-200 rounded" />
    </div>
  </div>
)

const ShopDetailsSkeleton = () => (
  <div className="min-h-screen bg-white">

    {/* ── Mobile layout ── */}
    <div className="lg:hidden">
      {/* Banner skeleton — exact match to Banner.jsx isLoading state */}
      <div className="relative w-full h-[400px] bg-gray-200 animate-pulse">
        <div className="absolute top-4 right-4 z-10 flex gap-3">
          <div className="w-12 h-12 bg-gray-300 rounded-full" />
          <div className="w-12 h-12 bg-gray-300 rounded-full" />
        </div>
      </div>

      {/* ShortDetails skeleton — rounded-t-3xl overlay, -mt-8 */}
      <div className="bg-white rounded-t-3xl -mt-8 relative z-10 px-5 pt-6 pb-2 animate-pulse">
        {/* Name + NEW badge */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="h-7 bg-gray-200 rounded flex-1" />
          <div className="h-6 w-12 bg-gray-200 rounded-full" />
        </div>
        {/* Crown + rating + gender */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
          <div className="h-7 w-20 bg-gray-200 rounded-lg" />
          <div className="h-5 w-20 bg-gray-200 rounded" />
        </div>
        {/* Address */}
        <div className="flex items-start gap-2.5 mb-3">
          <div className="w-4 h-4 bg-gray-200 rounded-full mt-0.5" />
          <div className="h-3 bg-gray-200 rounded flex-1" />
        </div>
        {/* Hours */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-4 h-4 bg-gray-200 rounded-full" />
          <div className="h-3 bg-gray-200 rounded w-40" />
        </div>
        {/* Language tags */}
        <div className="flex gap-2">
          <div className="h-7 w-16 bg-gray-200 rounded-lg" />
          <div className="h-7 w-12 bg-gray-200 rounded-lg" />
        </div>
      </div>

      {/* Tab bar */}
      <div className="px-5 py-3 flex gap-6 border-b border-gray-100 animate-pulse overflow-hidden">
        {['Home', 'Explore', 'Favourites', 'Bookings'].map((_, i) => (
          <div key={i} className="h-4 w-16 bg-gray-200 rounded" />
        ))}
      </div>

      {/* Services area */}
      <div className="bg-white px-5 py-6">
        {/* "Services" heading */}
        <div className="h-7 w-24 bg-gray-200 rounded animate-pulse mb-5" />
        {/* Filter chips: Featured / Combo Offers / Men's Packages */}
        <div className="flex gap-2 mb-5">
          <div className="h-9 w-20 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-9 w-28 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-9 w-32 bg-gray-200 rounded-full animate-pulse" />
        </div>
        {/* Service cards */}
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => <ServiceRowSkeleton key={i} />)}
        </div>
      </div>
    </div>

    {/* ── Desktop layout ── */}
    <div className="hidden lg:block">
      {/* DeskBanner: full-width top image area */}
      <div className="relative w-full h-[500px] bg-gray-200 animate-pulse">
        <div className="absolute top-4 right-4 z-10 flex gap-3">
          <div className="w-14 h-14 bg-gray-300 rounded-full" />
          <div className="w-14 h-14 bg-gray-300 rounded-full" />
        </div>
      </div>

      {/* ShortDetails desktop */}
      <div className="bg-gray-100 px-10 xl:px-32 py-8 animate-pulse">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-4 w-full">
            {/* Name + crown + NEW */}
            <div className="flex items-center gap-3">
              <div className="h-10 bg-gray-200 rounded w-64" />
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="h-7 w-12 bg-gray-200 rounded-full" />
            </div>
            {/* Rating + gender + address */}
            <div className="flex items-center gap-6">
              <div className="h-8 w-20 bg-gray-200 rounded-lg" />
              <div className="h-5 w-20 bg-gray-200 rounded" />
              <div className="h-4 w-40 bg-gray-200 rounded" />
            </div>
            {/* Hours */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded-full" />
              <div className="h-4 bg-gray-200 rounded w-48" />
            </div>
            {/* Languages */}
            <div className="flex items-center gap-4">
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-7 w-16 bg-gray-200 rounded-full" />
              <div className="h-7 w-14 bg-gray-200 rounded-full" />
            </div>
          </div>
          {/* Heart + Share */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-xl" />
            <div className="w-12 h-12 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Services section */}
      <div className="px-10 xl:px-32 bg-gray-100 py-6 animate-pulse">
        {/* Filter chips */}
        <div className="flex gap-2 mb-5">
          <div className="h-9 w-20 bg-gray-200 rounded-full" />
          <div className="h-9 w-28 bg-gray-200 rounded-full" />
          <div className="h-9 w-32 bg-gray-200 rounded-full" />
        </div>
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => <ServiceRowSkeleton key={i} />)}
        </div>
      </div>
    </div>
  </div>
)

export default ShopDetailsSkeleton
