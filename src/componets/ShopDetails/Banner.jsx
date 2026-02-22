import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Share2, Heart } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import custom styles
import './Banner.css';

const Banner = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Sample slide data - replace with actual salon/shop images
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=500&fit=crop',
      alt: 'Salon Image 1'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1622287162716-f311baa16c2d?w=800&h=500&fit=crop',
      alt: 'Salon Image 2'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=500&fit=crop',
      alt: 'Salon Image 3'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=500&fit=crop',
      alt: 'Salon Image 4'
    },
  ];

  const handleShare = () => {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: 'Check out this salon',
        text: 'Amazing salon services',
        url: window.location.href,
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      console.log('Share functionality');
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet banner-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active banner-bullet-active',
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="banner-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="w-full h-[400px] lg:h-[500px] bg-gray-200 flex items-center justify-center">
              <img 
                src={slide.image} 
                alt={slide.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500"%3E%3Crect fill="%23E5E7EB" width="800" height="500"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ESalon Image ' + slide.id + '%3C/text%3E%3C/svg%3E'
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Action Icons - Share and Heart */}
      <div className="absolute top-4 right-4 z-10 flex gap-3">
        {/* Share Button */}
        <button
          onClick={handleShare}
          className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-105"
          aria-label="Share"
        >
          <Share2 size={20} className="text-gray-700" strokeWidth={2} />
        </button>

        {/* Heart/Favorite Button */}
        <button
          onClick={handleFavorite}
          className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-105"
          aria-label="Add to favorites"
        >
          <Heart 
            size={20} 
            className={isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-700'} 
            strokeWidth={2} 
          />
        </button>
      </div>
    </div>
  );
};

export default Banner;