import React, { useEffect } from 'react'
import { ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import ServiceCard from './ServiceCard'
import 'swiper/css'
import { Link } from 'react-router-dom'

import { useUserLocation } from '../../hooks/useUserLocation'
import { useNearbySalons } from '../../hooks/services/useNearbySalons'

const BASE_IMAGE_URL = 'https://v1.gloup.in/images'

// Normalize the API response shape to what ServiceCard expects
const normalizeService = (salon) => {
  let images = ['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80'];

  const validImages = Array.isArray(salon.images) 
    ? salon.images.filter(img => img && typeof img === 'string' && img.trim() !== '') 
    : [];

  if (validImages.length > 0) {
    images = validImages.map((img) => `${BASE_IMAGE_URL}/${img}`);
  } else if (salon.salonImage && typeof salon.salonImage === 'string' && salon.salonImage.trim() !== '') {
    images = [`${BASE_IMAGE_URL}/${salon.salonImage}`];
  }

  return {
    id: salon.id,
    name: salon.salonName,
    logo: salon.salonName?.charAt(0)?.toUpperCase() || 'S',
    mainService: salon.serviceName || 'Service',
    price: salon.servicePrice || 0,
    rating: salon.rating ?? 0,
    isPremium:salon.isPremium,
    isFavourite:salon.isFavourite,
    reviews: 0,
    location: salon.address || 'Nearby',
    distance: salon.distance ? `${salon.distance.toFixed(1)} km` : '',
    services: salon.categories?.length > 0 ? salon.categories : ['Service'],
    images,
  };
};



const PopularServices = () => {
  const { getLocation } = useUserLocation()
  const { data, isLoading, isError } = useNearbySalons()

  useEffect(() => {
    getLocation()
  }, [])

  const rawSalons = data?.data?.data || []
  const services = rawSalons.map(normalizeService)

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="bg-gray-100 px-4 lg:px-10 xl:px-32 py-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Popular Services Nearby</h2>
            <p className="text-sm text-gray-500 mt-1">Based on your location</p>
          </div>
        </div>
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="min-w-[280px] bg-white rounded-2xl shadow-md animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-2xl" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Error or empty state
  if (isError || services.length === 0) {
    return null
  }

  return (
    <div className="bg-gray-100 py-6 lg:py-10 overflow-hidden">
      {/* Header */}
      <div className="px-4 lg:px-10 xl:px-32 flex items-start justify-between mb-4 lg:mb-6">
        <div>
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Popular Services Nearby</h2>
          <p className="text-sm text-gray-500 mt-0.5 lg:mt-1">Based on your location</p>
        </div>
        <button className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-pink-500 transition-colors">
          See All <ChevronRight size={16} />
        </button>
      </div>

      {/* Single Swiper — mobile shows 1.2 cards, desktop shows 3+ */}
      <div className="pl-4 lg:pl-10 xl:pl-32">
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
          className="popular-services-slider !overflow-visible"
        >
          {services.map((service, idx) => (
            <SwiperSlide key={`${service.id}-${idx}`} className="h-auto pb-2">
              <Link to={`/shop-details/${service.id}`} className="block h-full">
                <ServiceCard service={service} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default PopularServices
