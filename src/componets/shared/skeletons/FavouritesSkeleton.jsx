import React from 'react'

// Exact SkeletonFavCard from Favourites.jsx
const SkeletonFavCard = () => (
  <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex gap-3 animate-pulse">
    <div className="w-[110px] h-[110px] bg-gray-200 rounded-xl flex-shrink-0" />
    <div className="flex-1 flex flex-col gap-2 py-1">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-3 bg-gray-200 rounded w-1/3" />
    </div>
  </div>
)

const FavouritesSkeleton = () => (
  <div className="page-favourites min-h-screen bg-gray-50 pb-20">

    {/* Mobile Top App Bar — exact match to Favourites.jsx */}
    <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="flex items-center gap-2 bg-gray-50 flex-1 rounded-lg px-3 py-2 mr-3 border border-gray-100 shadow-sm animate-pulse">
        <div className="w-4 h-4 bg-gray-200 rounded-full" />
        <div className="h-3 bg-gray-200 rounded flex-1" />
      </div>
      <div className="bg-gray-200 animate-pulse p-2 rounded-lg border border-gray-100 shadow-sm w-9 h-9" />
    </div>

    <div className="px-4 py-4 lg:py-8 lg:px-32 xl:px-32 mx-auto">
      {/* Header & Desktop Search — exact match to Favourites.jsx */}
      <div className="mb-4 lg:mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-36 mb-1" />
          <div className="h-4 bg-gray-200 rounded w-28 mt-1" />
        </div>
        {/* Desktop Search */}
        <div className="hidden lg:flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2.5 w-[400px] animate-pulse">
          <div className="w-4 h-4 bg-gray-200 rounded-full flex-shrink-0" />
          <div className="flex-1 h-3 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Skeleton cards — exact layout from Favourites.jsx: 1-col mobile, 2-col lg, 3-col xl */}
      <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-6">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonFavCard key={i} />)}
      </div>
    </div>
  </div>
)

export default FavouritesSkeleton
