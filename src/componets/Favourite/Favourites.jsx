import React from "react";
import FavoriteCard from "../../componets/shared/ui/FavoriteCard";
import { ListFilter } from "lucide-react";
import { useGetFavourites } from "../../hooks/services/useGetFavourites";
import { Link } from "react-router-dom";

const BASE_IMAGE_URL = "https://v1.gloup.in/images";

const normalizeFav = (item) => {
  const salon = item?.store ?? item;

  const rawImages = Array.isArray(salon.images) ? salon.images : [];
  const validImages = rawImages.filter((img) => img && img.trim() !== "");
  const image =
    validImages.length > 0
      ? `${BASE_IMAGE_URL}/${validImages[0]}`
      : salon.salonImage
      ? `${BASE_IMAGE_URL}/${salon.salonImage}`
      : "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80";

  return {
    id: salon.id ?? salon._id,
    image,
    name: salon.salonName ?? salon.name,
    rating: salon.rating ?? "0.0",
    reviews: salon.reviewCount ?? 0,
    location: salon.address ?? "Nearby",
    distance: salon.distance ? `${salon.distance.toFixed?.(1) ?? salon.distance} km` : "",
    mainService: salon.serviceName ?? "Service",
    price: salon.servicePrice ?? 0,
    isPremium: salon.isPremium ?? false,
    isFavorite: true,
    languages: [],
    services: salon.categories ?? [],
  };
};

// Skeleton card
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

const Favourites = () => {
  const { data, isLoading, isError, refetch } = useGetFavourites();

  const favourites = (data?.data ?? []).map(normalizeFav);

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
            placeholder="Search favorites..."
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
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">My Favorites</h2>
          <p className="text-sm text-gray-500 mt-1">
            {isLoading ? "Loading..." : `${favourites.length} saved salon${favourites.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Loading skeletons */}
        {isLoading && (
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-6">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonFavCard key={i} />)}
          </div>
        )}

        {/* Error state */}
        {isError && !isLoading && (
          <div className="text-center py-10">
            <p className="text-gray-500">Failed to load favourites.</p>
            <button
              onClick={() => refetch()}
              className="mt-3 text-sm font-medium text-pink-500 hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Favourite cards */}
        {!isLoading && !isError && favourites.length > 0 && (
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-6">
            {favourites.map((fav) => (
              <Link key={fav.id} to={`/salon-details/${fav.id}`} className="block">
                <FavoriteCard salon={fav} onRemoved={refetch} />
              </Link>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && favourites.length === 0 && (
          <div className="text-center py-10 lg:py-20">
            <h5 className="font-semibold text-gray-900 lg:text-xl">No favourites added</h5>
            <p className="text-gray-500 mt-2">You haven't saved any salons yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;

