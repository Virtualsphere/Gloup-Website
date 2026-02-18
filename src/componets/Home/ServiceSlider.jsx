import React, { useState } from 'react'

const ServiceSlider = () => {
  const [activeService, setActiveService] = useState(0)

  const services = [
    { id: 1, name: 'Nails', icon: '' },
    { id: 2, name: 'Massage', icon: '' },
    { id: 3, name: 'Haircut', icon: '' },
    { id: 4, name: 'Facial', icon: '' },
    { id: 5, name: 'Coloring', icon: '' },
    { id: 6, name: 'Spa', icon: '' },
    { id: 7, name: 'Waxing', icon: '' },
  ]

  return (
    <div className="md:hidden px-3 bg-white py-2">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {services.map((service, index) => (
          <div
            key={service.id}
            onClick={() => setActiveService(index)}
            className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0"
          >
            {/* Service Icon */}
            <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center text-2xl">
              {service.icon}
            </div>
            
            {/* Service Name */}
            <span
              className={`text-sm whitespace-nowrap transition-all ${
                activeService === index
                  ? 'font-medium text-black'
                  : 'font-normal text-gray-400'
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

export default ServiceSlider
