import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronRight } from 'lucide-react';
import 'swiper/css';
import ServiceCard from "../shared/ui/ServiceCard";
import ServiceCardSkeleton from "../shared/ui/ServiceCardSkeleton";
import { useTopSalons } from "../../hooks/services/useTopSalons";
import { useHomeFilterStore } from "../../store/homeFilterStore";
import { Link } from "react-router-dom";

const BASE_IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
const PROFILE_IMG_URL = import.meta.env.VITE_PROFILE_IMG_URL;

// Normalize the API response shape to what ServiceCard expects
const normalizeService = (salon) => {
  let images = [];

  const validImages = Array.isArray(salon.images) 
    ? salon.images.filter(img => img && typeof img === 'string' && img.trim() !== '') 
    : [];

  if (validImages.length > 0) {
    images = validImages.map((img) => `${BASE_IMAGE_URL}/${img}`);
  } else if (salon.salonImage && typeof salon.salonImage === 'string' && salon.salonImage.trim() !== '') {
    images = [`${BASE_IMAGE_URL}/${salon.salonImage}`];
  } else {
    images = ['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80'];
  }

  const logoUrl = salon.profilePic 
    ? `${PROFILE_IMG_URL}/${salon.profilePic}`
    : salon.logo 
      ? `${PROFILE_IMG_URL}/${salon.logo}`
      : null;

  return {
    id: salon.id ?? salon._id,
    name: salon.salonName,
    logo: salon.salonName?.charAt(0)?.toUpperCase() || 'S',
    logoUrl,
    mainService: salon.serviceName || 'Service',
    price: salon.servicePrice || 0,
    rating: salon.rating ?? 0,
    isPremium: salon.isPremium,
    isFavourite: salon.isFavourite ?? salon.isFavorite ?? false, // Note the spelling difference from popular services API mapping if applicable
    reviews: salon.reviewCount || 0,
    location: salon.address || 'Nearby', // TopSalons addresses tend to be less populated based on the payload provided
    distance: salon.distance ? `${salon.distance.toFixed(1)} km` : '',
    services: salon.categories?.length > 0 ? salon.categories : ['Service'],
    images,
    languageCodes: salon.languageCodes,
    rawGender: salon.gender || salon.salonGender || salon.salonType || salon.salontype || '',
  };
};

function TopSalons() {
  const navigate = useNavigate();
  const { filters } = useHomeFilterStore();
  
  // Pass dynamic filters directly down to the query hook
  const { data, isLoading, isError } = useTopSalons(filters);
  console.log(data, "top-salons")

  const rawSalons = data?.data || []; // Note: TopSalons returns data directly, whereas nearby returns data.data according to previous setups
  let services = rawSalons.map(normalizeService);

  if (filters?.gender) {
    const activeGender = filters.gender.toLowerCase();
    const isTarget = (str) => {
       if(!str) return false;
       const s = str.toLowerCase();
       if (activeGender === 'male' || activeGender === 'men') return s === 'male' || s === 'men' || s.includes('men');
       if (activeGender === 'female' || activeGender === 'women') return s === 'female' || s === 'women' || s.includes('women');
       if (activeGender.includes('kid') || activeGender.includes('baby')) return s.includes('kid') || s.includes('baby');
       if (activeGender === 'unisex') return s.includes('unisex') || s.includes('both');
       return s.includes(activeGender);
    };
    services = services.filter(s => isTarget(s.rawGender) || s.services.some(isTarget));
  }

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="bg-gray-100 py-10">
        <div className="px-4 lg:px-10 xl:px-32 max-w-[1536px] mx-auto flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Top Salons</h2>
            <p className="text-sm text-gray-500 mt-1">Handpicked best salons for you</p>
          </div>
        </div>
        <div className="px-4 lg:px-10 xl:px-32 max-w-[1536px] mx-auto flex gap-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="min-w-[280px] w-full max-w-[320px]">
              <ServiceCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error or empty state
  if (isError || services.length === 0) {
    return (
      <div className="bg-gray-100 py-6 lg:py-10 overflow-hidden">
        <div className="px-4 lg:px-10 xl:px-32 max-w-[1536px] mx-auto flex items-start justify-between mb-4 lg:mb-6">
          <div>
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Top Salons</h2>
            <p className="text-sm text-gray-500 mt-0.5 lg:mt-1">Handpicked best salons for you</p>
          </div>
        </div>
        <div className="px-4 lg:px-10 xl:px-32 max-w-[1536px] mx-auto">
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-gray-200 shadow-sm text-center px-4">
            <p className="text-gray-500 font-medium text-lg">No top salons found.</p>
            {filters?.gender && <p className="text-gray-400 text-sm mt-1">Try changing the category filter.</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-6 lg:py-10 overflow-hidden">
      {/* Header */}
      <div className="px-4 lg:px-10 xl:px-32 max-w-[1536px] mx-auto flex items-start justify-between mb-4 lg:mb-6">
        <div>
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Top Salons</h2>
          <p className="text-sm text-gray-500 mt-0.5 lg:mt-1">Handpicked best salons for you</p>
        </div>
        <Link 
          to="/top-salons"
          className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-pink-500 transition-colors"
        >
          See All <ChevronRight size={16} />
        </Link>
      </div>

      {/* Single Swiper — mobile shows 1.2 cards, desktop shows 3+ */}
      <div className="px-4 lg:px-10 xl:px-32 max-w-[1536px] mx-auto">
        <Swiper
          slidesPerView={1.2}
          spaceBetween={12}
          breakpoints={{
            1024: {
              slidesPerView: 2.8,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 3.2,
              spaceBetween: 24,
            },
            1536: {
              slidesPerView: 4.2,
              spaceBetween: 24,
            },
          }}
          className="popular-services-slider"
        >
          {services.map((service, idx) => (
            <SwiperSlide key={`${service.id}-${idx}`} className="h-auto pb-2">
              <Link to={`/salon-details/${service.id}`} className="block h-full">
                <ServiceCard service={service} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default TopSalons;
