import React, { useState } from 'react'
import { Search, MapPin, User, QrCode } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useGetBanner } from '../../hooks/services/useGetBanner'
import { useLocationStore } from '../../store/locationStore'
import LocationSearchModal from '../shared/ui/LocationSearchModal'

const DeskHero = () => {
  const [service, setService] = useState('')
  const [gender, setGender] = useState('Unisex')
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)

  const locationData = useLocationStore((state) => state.location);
  const displayAddress = locationData?.address 
    ? locationData.address.split(',')[0]
    : 'Bengaluru';

  const { data, isLoading, isError } = useGetBanner()
  const imageBaseUrl = import.meta.env.VITE_PROFILE_IMG_URL

  if (isLoading) {
    return <div className="w-full h-[680px] bg-gray-200 animate-pulse hidden lg:block"></div>
  }

  if (isError || !data?.success || !data?.data?.length) {
    return null;
  }

  return (
    <div className="relative bg-gray-100 overflow-hidden hidden lg:block">
      {/* Background swiper */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="w-full h-[680px]"
      >
        {data.data.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className="w-full h-full relative">
              <img
                src={`${imageBaseUrl}/${slide.imageUrl}`}
                alt={`Slide ${slide.id}`}
                className="w-full h-full object-cover"
                onError={e => { e.target.style.display = 'none' }}
              />
              {/* Overlay tint for text readability */}
              <div className="absolute inset-0 bg-white/60" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content overlay — z-10 to sit above the Swiper */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-10 xl:px-32 pb-8 max-w-[1536px] mx-auto w-full">
        {/* Headline */}
        <h1 className="text-4xl xl:text-5xl font-bold text-gray-900 mb-3 leading-tight">
          Book local selfcare services
        </h1>
        <p className="text-gray-500 text-sm xl:text-base mb-8 max-w-md leading-relaxed">
          Discover top-rated salons, barbers, medspas, wellness studios and beauty experts trusted by millions worldwide
        </p>

        {/* Colorful gradient-bordered search bar */}
        <div
          className="relative max-w-2xl"
          style={{
            background: 'linear-gradient(90deg, #00cfff, #a855f7, #f97316, #facc15)',
            borderRadius: '10px',
            padding: '2px',
            overflow: 'hidden',
          }}
        >
          <div className="flex items-center bg-white rounded-[8px] gap-0 divide-x divide-gray-200">
            {/* Section 1: Service search */}
            <div className="flex-1 flex items-center gap-2 px-4 py-4">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={service}
                onChange={e => setService(e.target.value)}
                placeholder="All services & venues"
                className="w-full outline-none text-sm text-black placeholder-black bg-transparent"
              />
            </div>

            {/* Section 2: Location */}
            <button 
              onClick={() => setIsLocationModalOpen(true)}
              className="flex-1 flex items-center justify-start gap-2 px-4 py-4 hover:bg-gray-50 transition-colors focus:outline-none h-full"
            >
              <MapPin className="w-4 h-4 text-black flex-shrink-0" />
              <span className="text-sm text-black truncate text-left max-w-[150px]">{displayAddress}</span>
            </button>

            {/* Section 3: Gender + Search button */}
            <div className="flex-1 flex items-center justify-between gap-2 px-4 py-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-black flex-shrink-0" />
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                  className="text-sm text-black outline-none bg-transparent cursor-pointer"
                >
                  <option value="Unisex">Unisex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <button className="bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-900 transition-colors flex-shrink-0">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Get the app */}
        <button className="mt-6 flex items-center gap-2 bg-white border border-gray-200 text-gray-800 text-sm font-medium px-4 py-2.5 rounded-md w-fit hover:bg-gray-50 transition-colors shadow-sm">
          Get the app
          <QrCode className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      <LocationSearchModal 
        isOpen={isLocationModalOpen} 
        onClose={() => setIsLocationModalOpen(false)} 
      />
    </div>
  )
}

export default DeskHero

