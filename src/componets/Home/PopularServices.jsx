import React, { useEffect } from 'react'
import { ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import ServiceCard from '../shared/ui/ServiceCard'
import ServiceCardSkeleton from '../shared/ui/ServiceCardSkeleton'
import 'swiper/css'
import { Link } from 'react-router-dom'

import { useUserLocation } from '../../hooks/useUserLocation'
import { useNearbySalons } from '../../hooks/services/useNearbySalons'
import { useHomeFilterStore } from '../../store/homeFilterStore'
import ErrorState from '../shared/ui/ErrorState'

const SALON_IMAGE_URL = import.meta.env.VITE_SALON_IMAGE_URL;
// const PROFILE_IMG_URL = import.meta.env.VITE_PROFILE_IMG_URL;

// Normalize the API response shape to what ServiceCard expects
const normalizeService = (salon) => {
  let images = [];
  const storeId = salon.id ?? salon._id;

  const validImages = Array.isArray(salon.images)
    ? salon.images.filter(img => img && typeof img === 'string' && img.trim() !== '')
    : [];

  if (validImages.length > 0) {
    images = validImages.map((img) => `${SALON_IMAGE_URL}/${storeId}/images/${img}`);
  } else if (salon.salonImage && typeof salon.salonImage === 'string' && salon.salonImage.trim() !== '') {
    images = [`${SALON_IMAGE_URL}/${storeId}/images/${salon.salonImage}`];
  } else {
    images = ['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80'];
  }

  return {
    id: storeId,
    name: salon.salonName,
    mainService: salon.serviceName || '',
    price: salon.servicePrice,
    rating: salon.rating,
    isPremium: salon.isPremium,
    isFavourite: salon.isFavourite ?? salon.isFavorite ?? false,
    reviews: 0,
    location: salon.address,
    distance: salon.distance ? `${salon.distance.toFixed(1)} km` : '',
    services: salon.categories?.length > 0 ? salon.categories : ['Haircut', 'Facial'],
    images,
    languageCodes: salon.languageCodes,
    rawGender: salon.gender || salon.salonGender || salon.salonType || salon.storeType || salon.salontype || '',
  };
};



const PopularServices = () => {
  const { getLocation } = useUserLocation()
  const { filters } = useHomeFilterStore()

  // Pass dynamic filters directly down to the query hook
  const { data, isLoading, isError, refetch } = useNearbySalons(filters)




  useEffect(() => {
    getLocation()
  }, [])

  const rawSalons = data?.data?.data || []
  let services = rawSalons.map(normalizeService)



  // Loading skeleton
  if (isLoading) {
    return (
      <div className="bg-gray-100 py-10">
        <div className="px-4 lg:px-10 xl:px-32 flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Popular Services Nearby</h2>
            <p className="text-sm text-gray-500 mt-1">Based on your location</p>
          </div>
        </div>
        <div className="px-4 lg:px-10 xl:px-32 flex gap-4 overflow-hidden">
          {[1, 2, 3, 4,5].map((i) => (
            <div key={i} className="min-w-[280px] w-full max-w-[320px]">
              <ServiceCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    )
  }


return (
  <div className="bg-gray-100 py-6 lg:py-10 overflow-hidden">

    {/* Header (ALWAYS visible) */}
    <div className="px-4 lg:px-10 xl:px-32 flex items-start justify-between mb-4 lg:mb-6">
      <div>
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
          Popular Services Nearby
        </h2>
        <p className="text-sm text-gray-500 mt-0.5 lg:mt-1">
          Based on your location
        </p>
      </div>

      <Link
        to="/explore"
        className="flex items-center gap-1 text-sm font-medium text-gray-900"
      >
        See All <ChevronRight size={16} />
      </Link>
    </div>

    <div className="px-4 lg:px-10 xl:px-32">

      {isError ? (
        <ErrorState onRetry={refetch} />

      ) : !services || services.length === 0 ? (

        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-gray-200 shadow-sm text-center px-4">
          <p className="text-gray-500 font-medium text-lg">
            No nearby salons found.
          </p>

          {(filters?.gender || filters?.search) && (
            <p className="text-gray-400 text-sm mt-1">
              Try changing the filters.
            </p>
          )}
        </div>

      ) : (

        <Swiper
          slidesPerView={1.2}
          spaceBetween={12}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 2.5, spaceBetween: 20 },
            1024: { slidesPerView: 2.8, spaceBetween: 24 },
            1280: { slidesPerView: 3.2, spaceBetween: 24 },
            1536: { slidesPerView: 4.2, spaceBetween: 24 },
          }}
          className="popular-services-slider"
        >
          {services.map((service, idx) => (
            <SwiperSlide key={`${service.id}-${idx}`}>
              <Link to={`/salon-details/${service.id}`}>
                <ServiceCard service={service} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

      )}
    </div>
  </div>
);
}

export default PopularServices
