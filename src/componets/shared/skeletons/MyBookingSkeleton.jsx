import React from 'react'

/**
 * Matches MyBooking.jsx + BookingCard.jsx + BookingList.jsx exactly:
 * - Sticky header: back chevron + "My Bookings" h1
 * - BookingSearchBar: search input
 * - BookingTabs: Upcoming / Completed / Cancelled pill tabs
 * - BookingList: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
 *   Each card: SalonMiniCard (image left) + booking meta (ID, date/time, services, amount, action buttons)
 */

const BookingCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
    {/* SalonMiniCard area */}
    <div className="flex items-center gap-3 p-4">
      <div className="w-16 h-16 bg-gray-200 rounded-xl flex-shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-1/3" />
      </div>
    </div>

    <div className="border-t border-gray-100 mx-4" />

    {/* Booking meta */}
    <div className="px-4 pt-3 pb-2">
      {/* Booking ID + status badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="h-3 bg-gray-200 rounded w-28" />
        <div className="h-5 w-20 bg-gray-200 rounded-full" />
      </div>
      {/* Date & Time */}
      <div className="flex items-center gap-5 mb-3">
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="h-4 bg-gray-200 rounded w-20" />
      </div>
      {/* Services label */}
      <div className="h-4 bg-gray-200 rounded w-16 mb-1.5" />
      {/* Service rows */}
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex justify-between mb-1">
          <div className="h-3 bg-gray-200 rounded w-28" />
          <div className="h-3 bg-gray-200 rounded w-12" />
        </div>
      ))}
      {/* Paid amount bar */}
      <div className="flex items-center justify-between bg-gray-100 rounded-xl px-3 py-2.5 mt-3">
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="h-4 bg-gray-200 rounded w-16" />
      </div>
    </div>

    {/* Action buttons */}
    <div className="flex items-center gap-3 px-4 pb-4 pt-2">
      <div className="flex-1 h-12 bg-gray-200 rounded-xl" />
      <div className="flex-1 h-12 bg-gray-200 rounded-xl" />
    </div>
  </div>
)

const MyBookingSkeleton = () => (
  <div className="min-h-screen bg-gray-50">

    {/* Sticky header — matches MyBooking.jsx */}
    <div className="sticky top-0 z-20 bg-white border-b border-gray-100">
      {/* Back + title (mobile only) */}
      <div className="flex items-center gap-3 px-4 lg:px-10 xl:px-32 py-4 lg:hidden animate-pulse">
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
        <div className="h-5 bg-gray-200 rounded w-28" />
      </div>
      {/* Desktop title */}
      <div className="hidden lg:block px-10 xl:px-32 py-4 animate-pulse">
        <div className="h-7 bg-gray-200 rounded w-36" />
      </div>
      {/* Search bar */}
      <div className="px-4 lg:px-10 xl:px-32 pb-3 animate-pulse">
        <div className="h-10 bg-gray-100 border border-gray-200 rounded-xl" />
      </div>
      {/* Tabs: Upcoming / Completed / Cancelled */}
      <div className="px-4 lg:px-10 xl:px-32 pb-3 flex gap-3 animate-pulse">
        {['Upcoming', 'Completed', 'Cancelled'].map((t) => (
          <div key={t} className="h-9 w-24 bg-gray-200 rounded-full" />
        ))}
      </div>
    </div>

    {/* Booking cards grid — matches BookingList.jsx */}
    <div className="px-4 lg:px-10 xl:px-32 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
      {[...Array(4)].map((_, i) => <BookingCardSkeleton key={i} />)}
    </div>
  </div>
)

export default MyBookingSkeleton
