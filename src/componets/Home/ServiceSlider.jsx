import React, { useState } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const categories = [
  { id: 1, name: 'Nails',    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80' },
  { id: 2, name: 'Massage',  image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80' },
  { id: 3, name: 'Haircut',  image: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=400&q=80' },
  { id: 4, name: 'Facial',   image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80' },
  { id: 5, name: 'Coloring', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80' },
  { id: 6, name: 'Spa',      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80' },
]

const mobileServices = [
  { id: 1, name: 'Nails', icon: '' },
  { id: 2, name: 'Massage', icon: '' },
  { id: 3, name: 'Haircut', icon: '' },
  { id: 4, name: 'Facial', icon: '' },
  { id: 5, name: 'Coloring', icon: '' },
  { id: 6, name: 'Spa', icon: '' },
  { id: 7, name: 'Waxing', icon: '' },
]

const ServiceSlider = () => {
  const isMobile = useMediaQuery(1024)
  const [activeService, setActiveService] = useState(0)

  if (isMobile) {
    return (
      <div className="px-3 bg-white py-2">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {mobileServices.map((service, index) => (
            <div
              key={service.id}
              onClick={() => setActiveService(index)}
              className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center text-2xl">
                {service.icon}
              </div>
              <span
                className={`text-sm whitespace-nowrap transition-all ${
                  activeService === index ? 'font-medium text-black' : 'font-normal text-gray-400'
                }`}
              >
                {service.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-6 gap-5 px-10 xl:px-32 py-8 bg-gray-100">
      {categories.map(cat => (
        <button
          key={cat.id}
          className="flex flex-col items-center gap-3 group cursor-pointer"
        >
          <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-200 shadow-sm group-hover:shadow-md transition-shadow">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
            {cat.name}
          </span>
        </button>
      ))}
    </div>
  )
}

export default ServiceSlider
