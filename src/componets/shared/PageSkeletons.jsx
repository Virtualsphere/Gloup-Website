import React from 'react';
import ServiceCardSkeleton from './ui/ServiceCardSkeleton';

/* ── Shimmer base ─────────────────────────────────────────────────────────── */
export const Shimmer = ({ className = '' }) => (
  <div className={`bg-gray-200 rounded-lg animate-pulse ${className}`} />
);

/* ── ─────────────────────────────────────────────────────────────────────── */
/*  HOME skeleton — composed from each component's own isLoading skeleton     */
/* ── ─────────────────────────────────────────────────────────────────────── */
export const HomeSkeleton = () => (
  <>
    {/* ── MOBILE ──────────────────────────────────────────────────────── */}
    <div className="lg:hidden">

      {/* HeroSlider skeleton (min-h-[224px] — same as component) */}
      <div className="w-full min-h-[224px] bg-gray-200 animate-pulse relative">
        {/* ShortProfile overlay: location pin + profile avatar */}
        <div className="absolute top-0 left-0 right-0 z-10 rounded-3xl mt-2 pt-2 px-3 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse" />
            <div className="w-28 h-4 bg-gray-300 rounded animate-pulse" />
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse" />
        </div>
        {/* SearchBar skeleton sitting on the hero (top: 90px) */}
        <div className="absolute left-0 right-0 z-40" style={{ top: '90px' }}>
          <div className="mx-4 rounded-xl bg-gray-300 animate-pulse h-14" />
        </div>
      </div>

      {/* ServiceSlider skeleton (bg-white, flex row of 6 squares) */}
      <div className="bg-white py-2 overflow-x-hidden">
        <div className="flex gap-4 px-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-16 h-16 bg-gray-200 animate-pulse rounded-xl flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* PopularServices skeleton */}
      <div className="bg-gray-100 py-10">
        <div className="px-4 flex items-start justify-between mb-6">
          <div>
            <div className="h-5 w-48 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-36 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="px-4 flex gap-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="min-w-[280px] w-full max-w-[320px]">
              <ServiceCardSkeleton />
            </div>
          ))}
        </div>
      </div>

      {/* TopSalons skeleton */}
      <div className="bg-gray-100 py-10">
        <div className="px-4 flex items-start justify-between mb-6">
          <div>
            <div className="h-5 w-28 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 w-44 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="px-4 flex gap-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="min-w-[280px] w-full max-w-[320px]">
              <ServiceCardSkeleton />
            </div>
          ))}
        </div>
      </div>

      {/* RecommendedSalons skeleton */}
      <section className="bg-gray-100 py-8 pb-24">
        <div className="px-4">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="h-5 w-44 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-3 w-52 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>

    {/* ── DESKTOP ─────────────────────────────────────────────────────── */}
    <div className="hidden lg:block">

      {/* DeskHero skeleton (h-[680px]) */}
      <div className="w-full h-[680px] bg-gray-200 animate-pulse" />

      {/* ServiceSlider skeleton (bg-gray-100, grid of 6 large squares) */}
      <div className="bg-gray-100 py-8 overflow-x-hidden">
        <div className="flex gap-16 px-10 xl:px-32">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3 flex-shrink-0">
              <div className="w-48 h-48 bg-gray-200 animate-pulse rounded-2xl" />
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* PopularServices skeleton */}
      <div className="bg-gray-100 py-10">
        <div className="px-10 xl:px-32 flex items-start justify-between mb-6">
          <div>
            <div className="h-7 w-56 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="px-10 xl:px-32 flex gap-4 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="min-w-[280px] w-full max-w-[320px]">
              <ServiceCardSkeleton />
            </div>
          ))}
        </div>
      </div>

      {/* TopSalons skeleton */}
      <div className="bg-gray-100 py-10">
        <div className="px-10 xl:px-32 flex items-start justify-between mb-6">
          <div>
            <div className="h-7 w-32 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-52 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="px-10 xl:px-32 flex gap-4 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="min-w-[280px] w-full max-w-[320px]">
              <ServiceCardSkeleton />
            </div>
          ))}
        </div>
      </div>

      {/* RecommendedSalons skeleton */}
      <section className="bg-gray-100 py-12">
        <div className="px-10 xl:px-32">
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="h-7 w-52 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-56 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  </>
);


/* ── ─────────────────────────────────────────────────────────────────────── */
/*  SHOP DETAILS skeleton                                                      */
/* ── ─────────────────────────────────────────────────────────────────────── */
export const ShopDetailsSkeleton = () => (
  <>
    {/* Mobile */}
    <div className="lg:hidden">
      <Shimmer className="w-full h-64 rounded-none" />
      <div className="px-4 py-5 space-y-3">
        <Shimmer className="w-2/3 h-7" />
        <Shimmer className="w-1/2 h-4" />
        <Shimmer className="w-1/3 h-4" />
      </div>
      <div className="px-4 space-y-3 pb-24">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex justify-between items-center py-4 border-b border-gray-100">
            <div className="space-y-2">
              <Shimmer className="w-40 h-4" />
              <Shimmer className="w-24 h-3" />
            </div>
            <Shimmer className="w-20 h-9 rounded-full" />
          </div>
        ))}
      </div>
    </div>

    {/* Desktop */}
    <div className="hidden lg:flex max-w-7xl mx-auto px-10 py-10 gap-10">
      <div className="flex-1 space-y-6">
        <Shimmer className="w-full h-96 rounded-2xl" />
        <div className="space-y-3">
          <Shimmer className="w-2/3 h-8" />
          <Shimmer className="w-1/3 h-5" />
        </div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex justify-between items-center py-4 border-b border-gray-100">
            <div className="space-y-2">
              <Shimmer className="w-48 h-5" />
              <Shimmer className="w-28 h-4" />
            </div>
            <Shimmer className="w-24 h-10 rounded-full" />
          </div>
        ))}
      </div>
      <div className="w-80 space-y-4">
        <Shimmer className="w-full h-48 rounded-2xl" />
        <Shimmer className="w-full h-12 rounded-full" />
        <Shimmer className="w-full h-32 rounded-2xl" />
      </div>
    </div>
  </>
);

/* ── ─────────────────────────────────────────────────────────────────────── */
/*  EXPLORE skeleton                                                           */
/* ── ─────────────────────────────────────────────────────────────────────── */
export const ExploreSkeleton = () => (
  <>
    {/* Mobile */}
    <div className="lg:hidden px-4 pt-4 pb-24 space-y-4">
      <Shimmer className="w-full h-12 rounded-xl" />
      <div className="grid grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Shimmer className="w-full h-40 rounded-xl" />
            <Shimmer className="w-3/4 h-4" />
            <Shimmer className="w-1/2 h-3" />
          </div>
        ))}
      </div>
    </div>

    {/* Desktop */}
    <div className="hidden lg:block max-w-7xl mx-auto px-10 py-8">
      <Shimmer className="w-full h-12 rounded-xl mb-8" />
      <div className="grid grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Shimmer className="w-full h-52 rounded-2xl" />
            <Shimmer className="w-3/4 h-5" />
            <Shimmer className="w-1/2 h-4" />
          </div>
        ))}
      </div>
    </div>
  </>
);

/* ── ─────────────────────────────────────────────────────────────────────── */
/*  GENERIC list skeleton (Favourites, My Bookings, Category)                 */
/* ── ─────────────────────────────────────────────────────────────────────── */
export const ListPageSkeleton = () => (
  <>
    {/* Mobile */}
    <div className="lg:hidden px-4 pt-4 pb-24 space-y-4">
      <Shimmer className="w-44 h-6 mb-2" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-4 items-center p-3 bg-white rounded-xl shadow-sm">
          <Shimmer className="w-20 h-20 rounded-xl shrink-0" />
          <div className="flex-1 space-y-2">
            <Shimmer className="w-3/4 h-4" />
            <Shimmer className="w-1/2 h-3" />
            <Shimmer className="w-1/3 h-3" />
          </div>
        </div>
      ))}
    </div>

    {/* Desktop */}
    <div className="hidden lg:block max-w-7xl mx-auto px-10 py-8">
      <Shimmer className="w-48 h-7 mb-8" />
      <div className="grid grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Shimmer className="w-full h-52 rounded-2xl" />
            <Shimmer className="w-3/4 h-5" />
            <Shimmer className="w-1/2 h-4" />
          </div>
        ))}
      </div>
    </div>
  </>
);

/* ── ─────────────────────────────────────────────────────────────────────── */
/*  BOOKING FLOW skeleton (Book Slot / Review Order)                          */
/* ── ─────────────────────────────────────────────────────────────────────── */
export const BookingFlowSkeleton = () => (
  <>
    {/* Mobile */}
    <div className="lg:hidden px-4 pt-4 pb-24 space-y-4">
      <Shimmer className="w-48 h-6" />
      <Shimmer className="w-full h-32 rounded-xl" />
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
          <div className="space-y-2">
            <Shimmer className="w-32 h-4" />
            <Shimmer className="w-20 h-3" />
          </div>
          <Shimmer className="w-16 h-4" />
        </div>
      ))}
      <Shimmer className="w-full h-14 rounded-full mt-4" />
    </div>

    {/* Desktop */}
    <div className="hidden lg:flex max-w-5xl mx-auto px-10 py-10 gap-10">
      <div className="flex-1 space-y-6">
        <Shimmer className="w-56 h-7" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex justify-between items-center py-5 border-b border-gray-100">
            <div className="space-y-2">
              <Shimmer className="w-44 h-5" />
              <Shimmer className="w-28 h-4" />
            </div>
            <Shimmer className="w-20 h-4" />
          </div>
        ))}
      </div>
      <div className="w-72 space-y-4">
        <Shimmer className="w-full h-52 rounded-2xl" />
        <Shimmer className="w-full h-14 rounded-full" />
      </div>
    </div>
  </>
);

/* ── ─────────────────────────────────────────────────────────────────────── */
/*  PROFILE / ACCOUNT skeleton                                                 */
/* ── ─────────────────────────────────────────────────────────────────────── */
export const ProfileSkeleton = () => (
  <>
    {/* Mobile */}
    <div className="lg:hidden px-4 pt-6 pb-24 space-y-5">
      <div className="flex items-center gap-4">
        <Shimmer className="w-16 h-16 rounded-full" />
        <div className="space-y-2">
          <Shimmer className="w-36 h-5" />
          <Shimmer className="w-24 h-4" />
        </div>
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
          <Shimmer className="w-32 h-4" />
          <Shimmer className="w-5 h-5 rounded-full" />
        </div>
      ))}
    </div>

    {/* Desktop */}
    <div className="hidden lg:flex max-w-5xl mx-auto px-10 py-10 gap-10">
      <div className="w-64 space-y-3">
        <Shimmer className="w-20 h-20 rounded-full mx-auto" />
        <Shimmer className="w-3/4 h-5 mx-auto" />
        {[...Array(4)].map((_, i) => (
          <Shimmer key={i} className="w-full h-11 rounded-xl" />
        ))}
      </div>
      <div className="flex-1 space-y-5">
        <Shimmer className="w-48 h-7" />
        <div className="grid grid-cols-2 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Shimmer className="w-24 h-3" />
              <Shimmer className="w-full h-11 rounded-xl" />
            </div>
          ))}
        </div>
        <Shimmer className="w-36 h-12 rounded-full" />
      </div>
    </div>
  </>
);

/* ── ─────────────────────────────────────────────────────────────────────── */
/*  SIMPLE TEXT PAGE skeleton (Privacy, Terms, Refund, About, Partner)        */
/* ── ─────────────────────────────────────────────────────────────────────── */
export const TextPageSkeleton = () => (
  <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
    <Shimmer className="w-2/3 h-8" />
    <Shimmer className="w-full h-4" />
    <Shimmer className="w-5/6 h-4" />
    <Shimmer className="w-full h-4" />
    <Shimmer className="w-3/4 h-4" />
    <div className="pt-4 space-y-3">
      <Shimmer className="w-1/3 h-6" />
      {[...Array(4)].map((_, i) => (
        <Shimmer key={i} className={`h-4 ${i % 2 === 0 ? 'w-full' : 'w-5/6'}`} />
      ))}
    </div>
    <div className="pt-2 space-y-3">
      <Shimmer className="w-1/3 h-6" />
      {[...Array(3)].map((_, i) => (
        <Shimmer key={i} className={`h-4 ${i % 2 === 0 ? 'w-full' : 'w-4/5'}`} />
      ))}
    </div>
  </div>
);
