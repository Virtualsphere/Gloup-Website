import React, { useEffect, useRef, useState } from "react";
import FavoriteCard from "../../componets/shared/ui/FavoriteCard";
import { ListFilter } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetAllSalons } from "../../hooks/services/useGetAllSalons";
import { useHomeFilterStore } from "../../store/homeFilterStore";
import { useLocationStore } from "../../store/locationStore";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const BASE_IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
const PROFILE_IMG_URL = import.meta.env.VITE_PROFILE_IMG_URL;

const normalizeSalon = (salon) => {
  let images = [];
  const validImages = Array.isArray(salon.images)
    ? salon.images.filter((img) => img && typeof img === "string" && img.trim() !== "")
    : [];

  if (validImages.length > 0) {
    images = validImages.map((img) => `${BASE_IMAGE_URL}/${img}`);
  } else if (salon.salonImage && typeof salon.salonImage === "string" && salon.salonImage.trim() !== "") {
    images = [`${BASE_IMAGE_URL}/${salon.salonImage}`];
  } else {
    images = ["https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"];
  }

  const logoUrl = salon.profilePic
    ? `${PROFILE_IMG_URL}/${salon.profilePic}`
    : salon.logo
    ? `${PROFILE_IMG_URL}/${salon.logo}`
    : null;

  return {
    id: salon.id ?? salon._id,
    image: images[0],
    name: salon.salonName ?? salon.name,
    rating: salon.rating ?? "0.0",
    reviews: salon.reviewCount ?? 0,
    location: salon.address ?? "Nearby",
    distance: salon.distance ? `${salon.distance.toFixed?.(1) ?? salon.distance} km` : "",
    mainService: salon.serviceName ?? "Service",
    price: salon.servicePrice ?? 0,
    isPremium: salon.isPremium ?? false,
    isFavorite: salon.isFavourite ?? salon.isFavorite ?? false,
    // languages: [],
    services: salon.categories ?? ["Service"],
    rawGender: salon.gender || salon.salonGender || salon.salonType || salon.storeType || salon.salontype || "",
  };
};

const SkeletonFavCard = () => (
  <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex gap-3 animate-pulse">
    <div className="w-[110px] h-[110px] bg-gray-200 rounded-xl flex-shrink-0" />
    <div className="flex-1 flex flex-col gap-2 py-1">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-3 bg-gray-200 rounded w-1/3" />
    </div>
  </div>
);

const ExploreSalons = () => {
  const { filters } = useHomeFilterStore();
  const { location } = useLocationStore();
  
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);

  const queryParams = { 
    limit: 12, 
    ...filters,
    search: debouncedSearch || undefined,
    lat: location?.lat || undefined,
    lng: location?.lng || undefined
  };

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllSalons(queryParams);

  let salons = data?.pages.flatMap((p) => p.data ?? []).map(normalizeSalon) ?? [];

  // The backend already filters by gender according to useHomeFilterStore, so we just use the raw map.

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

  return (
    <div className="page-favourites min-h-screen bg-gray-50 pb-20">
      {/* Mobile Top App Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="flex items-center gap-2 bg-gray-50 flex-1 rounded-lg px-3 py-2 mr-3 border border-gray-100 shadow-sm">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search explore..."
            className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400 text-gray-700"
          />
        </div>
        <button className="bg-gray-50 p-2 rounded-lg border border-gray-100 shadow-sm">
          <ListFilter size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="px-4 py-4 lg:py-8 lg:px-32 mx-auto">
        {/* Header */}
        <div className="mb-4 lg:mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Explore Salons</h2>
          <p className="text-sm text-gray-500 mt-1">
            Discover the best beauty services near you
          </p>
        </div>

        {/* Loading skeletons */}
        {isLoading && (
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-6">
            {Array.from({ length: 9 }).map((_, i) => <SkeletonFavCard key={i} />)}
          </div>
        )}

        {/* Error state */}
        {isError && !isLoading && (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200">
            <p className="text-gray-500 font-medium text-lg">Failed to load salons.</p>
          </div>
        )}

        {/* Loaded Cards */}
        {!isLoading && !isError && salons.length > 0 && (
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-6">
            {salons.map((salon, idx) => (
              <Link key={`${salon.id}-${idx}`} to={`/salon-details/${salon.id}`} className="block">
                <FavoriteCard salon={salon} />
              </Link>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && salons.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200">
            <p className="text-gray-500 font-medium text-lg">No salons found.</p>
            {filters?.gender && <p className="text-gray-400 text-sm mt-1">Try changing the category filter.</p>}
          </div>
        )}

        {/* Scroll sentinel */}
        <div ref={sentinelRef} className="h-10 mt-4" />

        {/* Loading more indicator */}
        {isFetchingNextPage && (
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-6 mt-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonFavCard key={`more-${i}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreSalons;
