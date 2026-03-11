import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ServiceCard from '../componets/shared/ui/ServiceCard';
import { useUserLocation } from '../hooks/useUserLocation';
import { useNearbySalons } from '../hooks/services/useNearbySalons';
import { useHomeFilterStore } from '../store/homeFilterStore';

const BASE_IMAGE_URL = 'https://v1.gloup.in/images';

// Normalize the API response shape to what ServiceCard expects
const normalizeService = (salon) => {
  let images = ['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80'];

  const validImages = Array.isArray(salon.images) 
    ? salon.images.filter((img) => img && typeof img === 'string' && img.trim() !== '') 
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
    isPremium: salon.isPremium,
    isFavourite: salon.isFavourite,
    reviews: 0,
    location: salon.address || 'Nearby',
    distance: salon.distance ? `${salon.distance.toFixed(1)} km` : '',
    services: salon.categories?.length > 0 ? salon.categories : ['Service'],
    images,
  };
};

const PopularServicesPage = () => {
  const navigate = useNavigate();
  const { getLocation } = useUserLocation();
  const { filters } = useHomeFilterStore();
  
  // Pass dynamic filters directly down to the query hook
  const { data, isLoading, isError } = useNearbySalons(filters);

  useEffect(() => {
    getLocation();
    window.scrollTo(0, 0);
  }, []);

  const rawSalons = data?.data?.data || [];
  const services = rawSalons.map(normalizeService);

  return (
    <div className="bg-gray-100 min-h-screen py-6 lg:py-10">
      <div className="px-4 lg:px-10 xl:px-32 mb-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-900" />
          </button>
          <div>
            <h1 className="text-xl lg:text-3xl font-bold text-gray-900">Popular Services</h1>
            <p className="text-sm text-gray-500 mt-1">Discover highly rated services based on your location</p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-2xl" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error / Empty State */}
        {!isLoading && (isError || services.length === 0) && (
          <div className="text-center py-20">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-500">We couldn't find any popular services near you right now.</p>
          </div>
        )}

        {/* Services Grid */}
        {!isLoading && !isError && services.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <Link 
                key={`${service.id}-${idx}`} 
                to={`/salon-details/${service.id}`} 
                className="block h-full transform transition-transform hover:scale-[1.02]"
              >
                <ServiceCard service={service} fullWidth={true} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularServicesPage;
