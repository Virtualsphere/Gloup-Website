import React from 'react'
import ServiceCardSkeleton from '../ui/ServiceCardSkeleton'

// Exact same SkeletonFavCard used in RecommendedSalons/Explore
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

const HomeSkeleton = () => (
  <div className="min-h-screen bg-gray-100">

    {/* ── Hero banner ── */}
    <div className="w-full h-56 lg:h-[420px] bg-gray-300 animate-pulse" />

    {/* ── Service category row (Desktop only) ── */}
    <div className="hidden lg:flex gap-6 justify-start bg-gray-100 px-10 xl:px-32 py-6 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-2 animate-pulse">
          <div className="w-[100px] h-[100px] bg-gray-300 rounded-2xl" />
          <div className="h-3 w-16 bg-gray-300 rounded" />
        </div>
      ))}
    </div>

    {/* ── Popular Services Nearby — exact clone from PopularServices.jsx skeleton ── */}
    <div className="bg-gray-100 py-10">
      <div className="px-4 lg:px-10 xl:px-32 flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Popular Services Nearby</h2>
          <p className="text-sm text-gray-500 mt-1">Based on your location</p>
        </div>
      </div>
      <div className="px-4 lg:px-10 xl:px-32 flex gap-4 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div key={i} className="min-w-[280px] w-full max-w-[320px]">
            <ServiceCardSkeleton />
          </div>
        ))}
      </div>
    </div>

    {/* ── Top Salons — exact clone from TopSalons.jsx skeleton ── */}
    <div className="bg-gray-100 py-10">
      <div className="px-4 lg:px-10 xl:px-32 flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Top Salons</h2>
          <p className="text-sm text-gray-500 mt-1">Handpicked best salons for you</p>
        </div>
      </div>
      <div className="px-4 lg:px-10 xl:px-32 flex gap-4 overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div key={i} className="min-w-[280px] w-full max-w-[320px]">
            <ServiceCardSkeleton />
          </div>
        ))}
      </div>
    </div>

    {/* ── Recommended Salons — exact clone from RecommendedSalons.jsx skeleton ── */}
    <section className="bg-gray-100 py-8 lg:py-12">
      <div className="px-4 lg:px-10 xl:px-32">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Recommended Salons</h2>
            <p className="text-sm text-gray-500 mt-1">Discover top-rated salons near you</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>

  </div>
)

export default HomeSkeleton
