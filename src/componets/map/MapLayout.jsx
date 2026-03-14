import React, { useEffect, useState, useRef } from 'react';
import { useMapStore } from '../../store/mapStore';
import { useLocationStore } from '../../store/locationStore';
import { useMapFilterStore } from '../../store/mapFilterStore';
import { useGetAllSalons } from '../../hooks/services/useGetAllSalons';
import { useNearbySalons } from '../../hooks/services/useNearbySalons';
import { Link } from 'react-router-dom';
import MapView from './MapView';
import MapSearchBar from './MapSearchBar';
import MapControls from './MapControls';
import MapFilter from './MapFilter';
import FavoriteCard from '../shared/ui/FavoriteCard';

const BASE_IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
const PROFILE_IMG_URL = import.meta.env.VITE_PROFILE_IMG_URL;

// Normalizer reused from ExploreSalons
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
    rawGender: salon.gender || salon.salonGender || salon.salonType || salon.storeType || salon.salontype || "",
    services: salon.categories ?? ["Service"],
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

export default function MapLayout() {
  const { fetchMapData } = useMapStore();
  const [mapInstance, setMapInstance] = useState(null);
  
  // Stores
  const { location } = useLocationStore();
  const { filters } = useMapFilterStore();

  // Search local state mapped from MapSearchBar
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Debounce search input locally in MapLayout to avoid query spam
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  // 1) Fetch Nearby if NO search query
  const { 
    data: nearbyData, 
    isLoading: isNearbyLoading, 
    isError: isNearbyError 
  } = useNearbySalons({ ...filters, limit: 20 }, !searchQuery);

  // 2) Fetch Search Results if searchQuery exists
  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllSalons(
    { limit: 12, ...filters, search: searchQuery, lat: location?.lat, lng: location?.lng }, 
    { enabled: !!searchQuery }
  );

  // Initial markers setup
  useEffect(() => {
    fetchMapData();
  }, [fetchMapData]);

  // Handle Search Input from floating bar
  const handleSearch = (query) => {
    setSearchInput(query);
  };

  // Compile final rendering list depending on what's active
  let salons = [];
  const activeLoading = searchQuery ? isSearchLoading : isNearbyLoading;
  const activeError = searchQuery ? isSearchError : isNearbyError;

  if (searchQuery) {
    salons = searchData?.pages.flatMap((p) => p.data ?? []).map(normalizeSalon) ?? [];
  } else {
    // Nearby response differs structure-wise from explore
    salons = nearbyData?.data?.data?.map(normalizeSalon) ?? [];
  }

  // Active Gender Filter flows through the backend endpoints directly

  // Infinite Scroll Sentinel for Search Results only
  const sentinelRef = useRef(null);
  useEffect(() => {
    if (!sentinelRef.current || !searchQuery) return;
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
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, searchQuery]);

  // Map instance actions wrapper
  const handleMapLoad = (map) => {
    setMapInstance(map);
  };

  // Drag to expand variables
  const [sheetState, setSheetState] = useState('half'); // 'half' | 'full'
  const touchStartY = useRef(0);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY.current;

    if (deltaY < -50) {
      // Swiped Up
      setSheetState('full');
    } else if (deltaY > 50) {
      // Swiped Down
      setSheetState('half');
    }
  };

  // Sync Google Map Center with global Location Store
  useEffect(() => {
    if (mapInstance && location?.lat && location?.lng) {
      mapInstance.panTo({ lat: location.lat, lng: location.lng });
    }
  }, [location, mapInstance]);

  const mobileHeightClass = sheetState === 'full' ? 'h-[65vh] min-h-[65vh] transition-all duration-300' : 'h-[40vh] min-h-[300px] transition-all duration-300';

  return (
    <div className="relative w-full h-screen bg-gray-50 flex flex-col lg:flex-row overflow-hidden">
      
      {/* Left Panel (Desktop) / Bottom Sheet (Mobile) */}
      <div className={`bg-[#F5F5F5] w-full lg:w-[400px] xl:w-[450px] rounded-t-[24px] lg:rounded-none lg:shadow-[4px_0_24px_rgba(0,0,0,0.05)] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] relative z-20 flex flex-col order-2 lg:order-1 flex-shrink-0 transition-all duration-300 lg:h-full lg:min-h-screen ${mobileHeightClass}`}>
        
        {/* Desktop Search Bar (inside Left Panel) */}
        <div className="hidden lg:block relative z-30 w-full h-20 flex-shrink-0">
          <MapSearchBar onSearch={handleSearch} initialValue={searchInput} />
        </div>

        {/* Mobile Drag Pill */}
        <div 
          className="w-full pt-4 pb-2 lg:hidden flex-shrink-0 cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => setSheetState(prev => prev === 'half' ? 'full' : 'half')}
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto pointer-events-none"></div>
        </div>

        {/* Filters */}
        <div className="px-4 lg:px-5 pb-2 lg:pt-0 flex-shrink-0">
           <MapFilter />
        </div>
        
        <div className="px-5 py-2 border-b border-gray-200 flex items-center justify-between bg-[#F5F5F5] flex-shrink-0">
            <h2 className="text-gray-700 font-bold text-base">
              {searchQuery ? `Results for "${searchQuery}"` : "Salons Nearby"}
            </h2>
            <span className="bg-gray-200 text-xs px-2.5 py-1 rounded-md text-gray-700 font-semibold">{salons.length} found</span>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 pb-10 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
           {activeLoading ? (
             <>
                <SkeletonFavCard />
                <SkeletonFavCard />
                <SkeletonFavCard />
             </>
           ) : activeError ? (
              <div className="text-center py-8 text-red-400 font-medium text-sm">Failed to load salons</div>
           ) : salons.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400 gap-2">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                 <span className="text-sm">No exact matches found near you</span>
              </div>
           ) : (
                <div className="flex flex-col gap-3">
                  {salons.map((salon, idx) => (
                    <Link key={`${salon.id}-${idx}`} to={`/salon-details/${salon.id}`} className="block">
                      <FavoriteCard salon={salon} />
                    </Link>
                  ))}
                  
                  {/* Scroll sentinel for Search Pagination */}
                  {searchQuery && <div ref={sentinelRef} className="h-4 w-full" />}
                  {isFetchingNextPage && <SkeletonFavCard />}
                </div>
           )}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative order-1 lg:order-2 w-full lg:w-auto">
        {/* Mobile Search Bar (floating over map) */}
        <div className="block lg:hidden">
          <MapSearchBar onSearch={handleSearch} initialValue={searchInput} />
        </div>
        <MapView onMapLoad={handleMapLoad} />
        <MapControls map={mapInstance} />
      </div>
      
    </div>
  );
}
