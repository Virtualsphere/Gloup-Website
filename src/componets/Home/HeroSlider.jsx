import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// Import custom styles
import './HeroSlider.css'

const HeroSlider = () => {
  // Sample slide data - you can replace with your actual images
  const slides = [
    {
      id: 1,
      image: '/slider-1.jpg',
      alt: 'Slide 1'
    },
    {
      id: 2,
      image: '/slider-2.jpg',
      alt: 'Slide 2'
    },
    {
      id: 3,
      image: '/slider-3.jpg',
      alt: 'Slide 3'
    },
    {
      id: 4,
      image: '/slider-4.jpg',
      alt: 'Slide 4'
    },
  ]

  return (
    <div className="md:hidden px-3 py-2">
      <div className="relative rounded-2xl overflow-hidden">
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
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <img 
                  src={slide.image} 
                  alt={slide.alt}
                  className="w-full h-full object-cover"
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
