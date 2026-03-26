import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// Import custom styles
import './HeroSlider.css'

import { useGetBanner } from '../../hooks/services/useGetBanner'




const HeroSlider = () => {


  const { data, isLoading, isError } = useGetBanner()
  const imageBaseUrl = import.meta.env.VITE_BANNER_IMAGE_URL

  // Consistent skeleton for loading, error, or empty states to prevent UI collapse
  if (isLoading || isError || !data?.success || !data?.data?.length) {
    return (
      <div className="lg:hidden">
        <div className="w-full min-h-[224px] bg-gray-200 animate-pulse flex items-center justify-center">
          {/* Optional: Add a subtle loading icon or message */}
        </div>
      </div>
    );
  }

  return (
    <div className="lg:hidden">
      <div className="relative overflow-hidden">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet custom-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active',
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="hero-swiper"
        >
          {data.data.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="w-full relative h-full bg-gray-200 flex items-center justify-center">
                {/* Top black shadow gradient for profile text visibility */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-black/40 to-transparent z-10 pointer-events-none"></div>
                <img 
                  src={`${imageBaseUrl}/${slide.imageUrl}`} 
                  alt={`Slide ${slide.id}`}
                  className="w-full min-h-[224px] block object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23E5E7EB" width="400" height="200"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ESlide ' + slide.id + '%3C/text%3E%3C/svg%3E'
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
      </div>
    </div>
  )
}

export default HeroSlider
