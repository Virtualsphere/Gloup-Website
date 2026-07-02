import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useGetAllSalons } from "../../hooks/services/useGetAllSalons";
import ServiceCard from "../shared/ui/ServiceCard";
import ServiceCardSkeleton from "../shared/ui/ServiceCardSkeleton";
import { useHomeFilterStore } from "../../store/homeFilterStore";
import { useLocationStore } from "../../store/locationStore";
import ErrorState from "../shared/ui/ErrorState";

const SALON_IMAGE_URL = import.meta.env.VITE_SALON_IMAGE_URL;

// How many cards to reveal per scroll trigger
const DISPLAY_CHUNK = 8;
// How many salons to fetch from API per page (server likely caps at ~10)
const API_FETCH_LIMIT = 10;
// How many API pages to fetch per "Load More" click (3 × 10 = ~30 salons)
const PAGES_PER_BATCH = 3;

// Normalize API response to ServiceCard shape
const normalizeSalon = (salon) => {
  let images = [];
  const storeId = salon.id ?? salon._id;

  const validImages = Array.isArray(salon.images)
    ? salon.images.filter(
        (img) => img && typeof img === "string" && img.trim() !== ""
      )
    : [];

  if (validImages.length > 0) {
    images = validImages.map((img) => `${SALON_IMAGE_URL}${img}`);
  } else if (
    salon.salonImage &&
    typeof salon.salonImage === "string" &&
    salon.salonImage.trim() !== ""
  ) {
    images = [`${SALON_IMAGE_URL}${salon.salonImage}`];
  } else {
    images = [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    ];
  }

  return {
    id: storeId,
    name: salon.salonName,
    logo: salon.salonName?.charAt(0)?.toUpperCase() || "S",
    mainService: salon.serviceName,
    price: salon.servicePrice,
    rating: salon.rating,
    isPremium: salon.isPremium,
    isFavourite: salon.isFavourite ?? salon.isFavorite ?? false,
    reviews: salon.reviewCount,
    location: salon.address,
    distance: salon.distance ? `${salon.distance.toFixed(1)} km` : "",
    services: salon.categories?.length > 0 ? salon.categories : ["Haircut", "Facial"],
    images,
    languageCodes: salon.languageCodes,
    rawGender: salon.gender || salon.salonGender || salon.salonType || salon.storeType || salon.salontype || '',
  };
};

function RecommendedSalons() {
  const { filters } = useHomeFilterStore();
  const { location } = useLocationStore();

  // Number of cards currently visible to the user (client-side windowing)
  const [visibleCount, setVisibleCount] = useState(DISPLAY_CHUNK);

  const queryParams = {
    limit: API_FETCH_LIMIT,
    ...filters,
    ...(location?.lat ? { lat: location.lat } : {}),
    ...(location?.lng ? { lng: location.lng } : {}),
  };

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllSalons(queryParams);

  // Flatten all pages into a single list
  const allSalons = data?.pages.flatMap((p) => p.data ?? []).map(normalizeSalon) ?? [];

  // Cards actually shown to the user
  const visibleSalons = allSalons.slice(0, visibleCount);

  // True when we've revealed all locally-loaded data and there's more on the server
  const showLoadMore = visibleCount >= allSalons.length && hasNextPage && !isFetchingNextPage;

  // Sentinel ref — triggers revealing the next 8 cards on scroll
  const sentinelRef = useRef(null);

  // Reveal next chunk when sentinel enters viewport
  const handleScrollReveal = useCallback(
    (entries) => {
      if (!entries[0].isIntersecting) return;

      // Still have locally-loaded cards to reveal → show next 8
      if (visibleCount < allSalons.length) {
        setVisibleCount((prev) => Math.min(prev + DISPLAY_CHUNK, allSalons.length));
      }
      // Otherwise the "Load More" button takes over — do nothing here
    },
    [visibleCount, allSalons.length]
  );

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(handleScrollReveal, { threshold: 0.1 });
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [handleScrollReveal]);

  // Reset visibleCount when filters/location change (new query)
  useEffect(() => {
    setVisibleCount(DISPLAY_CHUNK);
  }, [filters, location]);

  // "Load More" button handler — fetches PAGES_PER_BATCH API pages at once
  // so the user gets a meaningful batch (~30 salons) to scroll through.
  const handleLoadMore = async () => {
    for (let i = 0; i < PAGES_PER_BATCH; i++) {
      // hasNextPage is re-evaluated after each fetchNextPage call
      await fetchNextPage();
    }
    // visibleCount stays where it is; the IntersectionObserver will reveal
    // the newly loaded cards 8-by-8 as the user scrolls down.
  };

  // Initial load skeletons
  if (isLoading) {
    return (
      <section className="bg-gray-100 py-8 lg:py-12">
        <div className="px-4 lg:px-10 xl:px-32">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
                Recommended Salons
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Discover top-rated salons near you
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-100 py-8 lg:py-12">
      <div className="px-4 lg:px-10 xl:px-32">

        <div className="flex items-start justify-between mb-5 lg:mb-8">
          <div>
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
              Recommended Salons
            </h2>
            <p className="text-sm text-gray-500 mt-0.5 lg:mt-1">
              Discover top-rated salons near you
            </p>
          </div>

          <Link
            to="/explore"
            className="flex items-center gap-1 text-sm font-medium text-gray-900"
          >
            See All <ChevronRight size={16} />
          </Link>
        </div>

        {isError ? (

          <ErrorState onRetry={refetch} />

        ) : !allSalons || allSalons.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-gray-200 shadow-sm text-center px-4">
            <p className="text-gray-500 font-medium text-lg">
              No recommended salons found.
            </p>

            {(filters?.gender || filters?.search) && (
              <p className="text-gray-400 text-sm mt-1">
                Try changing the filters.
              </p>
            )}
          </div>

        ) : (

          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {visibleSalons.map((salon, idx) => (
                <Link
                  key={`${salon.id}-${idx}`}
                  to={`/salon-details/${salon.id}`}
                  className="block"
                >
                  <ServiceCard service={salon} />
                </Link>
              ))}
            </div>

            {/* Sentinel — watched by IntersectionObserver to reveal next 8 cards */}
            <div ref={sentinelRef} className="h-10 mt-4" />

            {/* Skeleton shown while fetching next API page */}
            {isFetchingNextPage && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mt-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <ServiceCardSkeleton key={`more-${i}`} />
                ))}
              </div>
            )}

            {/* Load More button — shown when locally-loaded batch is exhausted */}
            {showLoadMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}

            {/* End of all data */}
            {!hasNextPage && visibleCount >= allSalons.length && allSalons.length > 0 && (
              <p className="text-center text-sm text-gray-400 mt-6">
                You've seen all the salons.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default RecommendedSalons;
