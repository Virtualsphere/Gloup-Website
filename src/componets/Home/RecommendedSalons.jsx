import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useGetAllSalons } from "../../hooks/services/useGetAllSalons";
import ServiceCard from "../shared/ui/ServiceCard";
import ServiceCardSkeleton from "../shared/ui/ServiceCardSkeleton";
import { useHomeFilterStore } from "../../store/homeFilterStore";
import { useLocationStore } from "../../store/locationStore";

const BASE_IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
const PROFILE_IMG_URL = import.meta.env.VITE_PROFILE_IMG_URL;

// Normalize API response to ServiceCard shape
const normalizeSalon = (salon) => {
  let images = [];

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
  } else {
    images = [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    ];
  }

  const logoUrl = salon.profilePic 
    ? `${PROFILE_IMG_URL}/${salon.profilePic}`
    : salon.logo 
      ? `${PROFILE_IMG_URL}/${salon.logo}`
      : null;

  return {
    id: salon.id ?? salon._id,
    name: salon.salonName,
    logo: salon.salonName?.charAt(0)?.toUpperCase() || "S",
    logoUrl,
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

  const queryParams = { 
    limit: 8, 
    ...filters,
    ...(location?.lat ? { lat: location.lat } : {}),
    ...(location?.lng ? { lng: location.lng } : {}),
  };

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllSalons(queryParams);

  console.log(fetchNextPage, "fetching Next page..............")

  console.log(data, "RecommendedSalons")

  // Flatten all pages into a single list
  let salons = data?.pages.flatMap((p) => p.data ?? []).map(normalizeSalon) ?? [];

  // The backend already filters by gender natively

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

  if (isError || salons.length === 0) {
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
          </div>
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-gray-200 shadow-sm text-center px-4">
            <p className="text-gray-500 font-medium text-lg">No recommended salons found.</p>
            {(filters?.gender || filters?.search) && <p className="text-gray-400 text-sm mt-1">Try changing the category or search filters.</p>}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-100 py-8 lg:py-12">
      <div className="px-4 lg:px-10 xl:px-32">
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
        <Link
          to="/explore"
          className="flex items-center gap-1 text-sm font-medium text-gray-900 transition-colors">
          See All <ChevronRight size={16} />
        </Link>
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
            <ServiceCardSkeleton key={`more-${i}`} />
          ))}
        </div>
      )}

      {/* End-of-list message */}
      {!hasNextPage && salons.length > 0 && (
        <p className="text-center text-sm text-gray-400 mt-6">
          You've seen all the salons 🎉
        </p>
      )}
      </div>
    </section>
  );
}

export default RecommendedSalons;
