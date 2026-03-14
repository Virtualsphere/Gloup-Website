import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Share2, Heart } from 'lucide-react';
import HeartOutline from "../../assets/icons/ic_heart.svg?react";
import HeartFill from "../../assets/icons/ic_heart_fill.svg?react";
import ShareIcon from "../../assets/icons/ic_share.svg?react";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import custom styles
import './Banner.css';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { useToggleFavourite } from '../../hooks/services/useToggleFavourite';
import { useGetFavourites } from '../../hooks/services/useGetFavourites';
import toast from 'react-hot-toast';

const BASE_IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const Banner = ({ images = [], isLoading = false, salonId = null }) => {
  const { data: favData } = useGetFavourites();
  const favouritesList = favData?.data ?? [];
  const isGloballyFavorited = favouritesList.some((fav) => {
    const favId = fav?.store?.id ?? fav?.store?._id ?? fav?.id;
    return String(favId) === String(salonId);
  });

  const exactFavoriteState = favData ? isGloballyFavorited : false;
  const [isFavorite, setIsFavorite] = useState(exactFavoriteState);

  React.useEffect(() => {
    setIsFavorite(exactFavoriteState);
  }, [exactFavoriteState]);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const openLoginModal = useUiStore((s) => s.openLoginModal);
  const { mutate: toggle, isPending } = useToggleFavourite();

  // Map API images or provide a fallback slide
  const slides = images?.length > 0 ? images.map((img, index) => ({
    id: index + 1,
    image: `${BASE_IMAGE_URL}/${img}`,
    alt: `Salon Image ${index + 1}`
  })) : [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=500&fit=crop',
      alt: 'Salon Image 1 fallback'
    }
  ];

  if (isLoading) {
    return (
      <div className="relative w-full h-[400px] lg:h-[500px] bg-gray-200 animate-pulse">
        {/* Skeleton Action Icons */}
        <div className="absolute top-4 right-4 z-10 flex gap-3">
          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gray-300 rounded-full" />
          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gray-300 rounded-full" />
        </div>
      </div>
    );
  }

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
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }

    if (!salonId) {
      toast.error("Salon ID missing, cannot favorite.");
      return;
    }

    setIsFavorite((prev) => !prev);
    
    toggle(salonId, {
      // onSuccess: (res) => {
      //   toast.success(res?.message || (isFavorite ? "Removed from favourites" : "Added to favourites"));
      // },
      // onError: () => {
      //   setIsFavorite((prev) => !prev);
      //   toast.error("Something went wrong. Please try again.");
      // },
    });
  };

  const HeartIcon = isFavorite ? HeartFill : HeartOutline;

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
          <ShareIcon width={20} height={20} />
        </button>

        {/* Heart/Favorite Button */}
        <button
          onClick={handleFavorite}
          disabled={isPending}
          className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50"
          aria-label="Add to favorites"
        >
          <HeartIcon 
            width={24} 
            height={24} 
            className={isFavorite ? 'text-red-500' : 'text-gray-500'} 
          />
        </button>
      </div>
    </div>
  );
};

export default Banner;