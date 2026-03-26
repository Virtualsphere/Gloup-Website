import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetCategory } from '../../hooks/services/useGetCategory'

const ServiceSlider = () => {
  const [activeService, setActiveService] = useState(0)
  const navigate = useNavigate()

  const { data, isLoading, isError } = useGetCategory()

  const imageBaseUrl = import.meta.env.VITE_CATEGORY_IMAGE_URL

  const handleCategoryClick = (service, index) => {
    setActiveService(index)
    navigate(`/salons/category/${service.id}`, {
      state: { categoryName: service.label.trim(), categories: data?.data || [] }
    })
  }

  if (isLoading) {
    return (
      <div className="bg-white lg:bg-gray-100 py-2 lg:py-8 overflow-x-auto lg:overflow-visible scrollbar-hide">
        <div className="flex lg:grid grid-cols-6 gap-4 lg:gap-5 px-3 lg:px-10 xl:px-32 w-full">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 lg:w-full lg:h-auto lg:aspect-square bg-gray-200 animate-pulse rounded-xl sm:rounded-2xl lg:rounded-2xl flex-shrink-0 lg:flex-shrink"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data?.success || !data?.data?.length) {
    return null;
  }

  return (
    <div className="bg-white lg:bg-gray-100 py-2 lg:py-8 overflow-x-auto lg:overflow-visible scrollbar-hide pb-2">
      <div className="flex  gap-4 lg:gap-16 px-3 lg:px-10 xl:px-32 w-full overflow-x-auto scrollbar-hide">
        {data.data.map((service, index) => {
          const isActiveMobile = activeService === index;
          return (
            <button
              key={service.id}
              onClick={() => handleCategoryClick(service, index)}
              className="flex flex-col items-center gap-2 lg:gap-3 group cursor-pointer flex-shrink-0 lg:flex-shrink"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-48 lg:h-48 lg:aspect-square rounded-xl sm:rounded-2xl lg:rounded-2xl overflow-hidden bg-gray-200 lg:shadow-sm lg:group-hover:shadow-md transition-shadow flex items-center justify-center">
                {service.imageUrl ? (
                  <img
                    src={`${imageBaseUrl}/${service.imageUrl}`}
                    alt={service.label}
                    className="w-full h-full object-cover lg:group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23E5E7EB" width="400" height="400"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EService ' + service.id + '%3C/text%3E%3C/svg%3E'
                    }}
                  />
                ) : null}
              </div>
              <span
                className={`text-sm whitespace-nowrap lg:whitespace-normal transition-all duration-300
                  ${isActiveMobile ? 'font-medium text-black' : 'font-normal text-gray-400'}
                  lg:font-medium lg:text-gray-700 lg:group-hover:text-gray-900
                `}
              >
                {service.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  )
}

export default ServiceSlider
