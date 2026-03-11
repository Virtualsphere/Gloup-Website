import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useGetAllSalons } from "../../hooks/services/useGetAllSalons";
import ServiceCard from "../shared/ui/ServiceCard";

const BASE_IMAGE_URL = "https://v1.gloup.in/images";

// Normalize API response to ServiceCard shape
const normalizeSalon = (salon) => {
  let images = [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
  ];

  const validImages = Array.isArray(salon.images)
    ? salon.images.filter(
        (img) => img && typeof img === "string" && img.trim() !== ""
      )
    : [];

  if (validImages.length > 0) {
    images = validImages.map((img) => `${BASE_IMAGE_URL}/${img}`);
  } else if (
    salon.salonImage &&
    typeof salon.salonImage === "string" &&
    salon.salonImage.trim() !== ""
  ) {
    images = [`${BASE_IMAGE_URL}/${salon.salonImage}`];
  }

  return {
    id: salon.id,
    name: salon.salonName,
    logo: salon.salonName?.charAt(0)?.toUpperCase() || "S",
    mainService: salon.serviceName || "Service",
    price: salon.servicePrice || 0,
    rating: salon.rating ?? 0,
    isPremium: salon.isPremium,
    isFavourite: salon.isFavorite,
    reviews: salon.reviewCount || 0,
    location: salon.address || "Nearby",
    distance: salon.distance ? `${salon.distance.toFixed(1)} km` : "",
    services: salon.categories?.length > 0 ? salon.categories : ["Service"],
    images,
  };
};

// Skeleton card
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-md animate-pulse overflow-hidden">
    <div className="h-48 bg-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
    </div>
  </div>
);

function RecommendedSalons() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllSalons({ limit: 8 });

  console.log(data)

  // Flatten all pages into a single list
  const salons = data?.pages.flatMap((p) => p.data ?? []).map(normalizeSalon) ?? [];

  // Sentinel element — sits at the bottom of the list
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Initial load skeletons
  if (isLoading) {
    return (
      <section className="bg-gray-100 px-4 lg:px-10 xl:px-32 py-8 lg:py-12">
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
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (isError || salons.length === 0) return null;

  return (
    <section className="bg-gray-100 px-4 lg:px-10 xl:px-32 py-8 lg:py-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-5 lg:mb-8">
        <div>
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
            Recommended Salons
          </h2>
          <p className="text-sm text-gray-500 mt-0.5 lg:mt-1">
            Discover top-rated salons near you
          </p>
        </div>
        <button className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-pink-500 transition-colors">
          See All <ChevronRight size={16} />
        </button>
      </div>

      {/* Responsive grid
          - mobile  (default)  : 1 card
          - sm ≥ 640px         : 2 cards
          - lg ≥ 1024px        : 3 cards
          - xl ≥ 1280px        : 4 cards               */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {salons.map((salon, idx) => (
          <Link
            key={`${salon.id}-${idx}`}
            to={`/salon-details/${salon.id}`}
            className="block"
          >
            <ServiceCard service={salon} />
          </Link>
        ))}
      </div>

      {/* Scroll sentinel — triggers fetchNextPage via IntersectionObserver */}
      <div ref={sentinelRef} className="h-10 mt-4" />

      {/* Loading more indicator */}
      {isFetchingNextPage && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={`more-${i}`} />
          ))}
        </div>
      )}

      {/* End-of-list message */}
      {!hasNextPage && salons.length > 0 && (
        <p className="text-center text-sm text-gray-400 mt-6">
          You've seen all the salons 🎉
        </p>
      )}
    </section>
  );
}

export default RecommendedSalons;
