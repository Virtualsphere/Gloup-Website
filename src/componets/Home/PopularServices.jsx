import React from 'react'
import { ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import ServiceCard from './ServiceCard'
import 'swiper/css'
import { Link } from 'react-router-dom'

const PopularServices = () => {
  // Sample data - replace with actual data from API
  const services = [
    {
      id: 1,
      name: 'Super Luxury Hair Studio',
      logo: 'S',
      mainService: 'Haircut',
      price: 99,
      rating: 4.8,
      reviews: 210,
      location: 'Koramangla, Bengaluru',
      distance: '1.2 km',
      services: ['Haircut', 'Coloring', 'Styling', 'Treatment', 'Spa'],
      images: [
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
        'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80',
        'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80',
      ]
    },
    {
      id: 2,
      name: 'Super Luxury Spa',
      logo: 'S',
      mainService: 'Massage',
      price: 499,
      rating: 4.6,
      reviews: 156,
      location: 'Koramangla, Bengaluru',
      distance: '0.8 km',
      services: ['Massage', 'Spa', 'Facial', 'Body Treatment'],
      images: [
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
        'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
      ]
    },
    {
      id: 3,
      name: 'Glam Beauty Parlor',
      logo: 'G',
      mainService: 'Facial',
      price: 299,
      rating: 4.7,
      reviews: 189,
      location: 'Indiranagar, Bengaluru',
      distance: '2.5 km',
      services: ['Facial', 'Waxing', 'Threading', 'Makeup'],
      images: [
        'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80',
        'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80',
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
      ]
    },
  ]

  return (
    <div className="md:hidden bg-gray-50 py-6 mb-20 overflow-hidden">
      {/* Header */}
      <div className="px-3 mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Popular Services Nearby</h2>
          <p className="text-sm text-gray-500">Based on your location</p>
        </div>
        <button className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-pink-500 transition-colors">
          See All
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Service Cards Slider */}
      <div className="pl-3">
        <Swiper
          slidesPerView={1.2}
          spaceBetween={12}
          className="popular-services-slider !overflow-visible"
        >
          {services.map((service) => (
            <SwiperSlide key={service.id} className="h-auto">
              <Link to='/shop-details' className="block h-full"> {/* Added block h-full to ensure it covers the card */}
                <ServiceCard service={service} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .popular-services-slider {
          overflow: visible;
        }
        .popular-services-slider :global(.swiper-wrapper) {
          align-items: stretch;
        }
        .popular-services-slider :global(.swiper-slide) {
          height: auto;
        }
      `}</style>
    </div>
  )
}

export default PopularServices
