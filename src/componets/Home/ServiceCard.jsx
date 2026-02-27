import React, { useState } from 'react'
import { Crown, Heart, MapPin } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import './ServiceCard.css'

const ServiceCard = ({ service }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden h-full flex flex-col">
      {/* Image Slider */}
      <div className="relative">
        <Swiper
          modules={[Pagination]}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet service-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active service-bullet-active',
          }}
          className="service-image-slider"
        >
          {service.images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-48">
                <img 
                  src={image} 
                  alt={`${service.name} - ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Top Badges - Outside Swiper */}
        <div 
          className="absolute top-3 left-3 right-3 flex justify-between items-center z-50 pointer-events-none"
          style={{ transform: 'translateZ(10px)' }}
        >
          {/* premium */}
          {service.isPremium && (
            <div className="bg-yellow-400 p-2 rounded-full shadow-md pointer-events-auto">
             <Crown size={20} className="text-white" fill="white" />
          </div>
          )}

          {/* isFavourite */}
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className="ml-auto bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform pointer-events-auto"
          >
            <Heart 
              size={20} 
              className={isFavorite ? 'text-pink-500 fill-pink-500' : 'text-gray-700'}
            />
          </button>
        </div>

        {/* Price Tag - Outside Swiper */}
        <div 
          className="absolute bottom-3 right-3 bg-white px-1.5 py-1.5 rounded-lg shadow-md z-50"
          style={{ transform: 'translateZ(10px)' }}
        >
          <span className="text-xs font-normal text-gray-800">
            {service.mainService} • ₹{service.price}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Business Name & Rating */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            {service.logo && (
              <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">{service.logo}</span>
              </div>
            )}
            <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
              {service.name}
            </h3>
          </div>
          
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-medium text-gray-900">
              {service.rating}
            </span>
            <span className="text-sm text-gray-400">
              ({service.reviews})
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
          <MapPin size={16} className="text-gray-400" />
          <span>{service.location} • {service.distance}</span>
        </div>

        {/* Service Tags */}
        <div className='flex items-center justify-between mt-auto'>
          <div>
            <p className="text-xs font-medium text-gray-500">Lang</p>
            <p className="text-xs font-semibold text-gray-900">Eng, Hin</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {service.services.slice(0, 2).map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-violet-50 text-violet-500 text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
            {service.services.length > 2 && (
              <span className="px-3 py-1 bg-violet-50 text-violet-500 text-xs font-medium rounded-full">
                +{service.services.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
