import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Search, X } from 'lucide-react';
import { useGetCategory } from '../hooks/services/useGetCategory';
import { useGetAllSalons } from '../hooks/services/useGetAllSalons';
import SalonCategoryCard from '../componets/shared/ui/SalonCategoryCard';

const SALON_IMAGE_URL = import.meta.env.VITE_SALON_IMAGE_URL;

const normalizeService = (salon) => {
  let images = ['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80'];
  const storeId = salon.id ?? salon._id;

  const validImages = Array.isArray(salon.images)
    ? salon.images.filter((img) => img && typeof img === 'string' && img.trim() !== '')
    : [];

  if (validImages.length > 0) {
    images = validImages.map((img) => `${SALON_IMAGE_URL}${img}`);
  } else if (salon.salonImage && typeof salon.salonImage === 'string' && salon.salonImage.trim() !== '') {
    images = [`${SALON_IMAGE_URL}/${storeId}/images/${salon.salonImage}`];
  }

  return {
    id: storeId,
    name: salon.salonName,
    image: (() => {
      if (validImages.length > 0) return `${SALON_IMAGE_URL}${validImages[0]}`;
      if (salon.salonImage?.trim()) return `${SALON_IMAGE_URL}${salon.salonImage}`;
      return 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80';
    })(),
    mainService: salon.serviceName || 'Service',
    price: salon.servicePrice || 0,
    rating: salon.rating ?? 0,
    isPremium: salon.isPremium,
    isFavourite: salon.isFavourite,
    reviews: salon.reviewCount || 0,
    location: salon.address || 'Nearby',
    distance: salon.distance ? `${salon.distance.toFixed(1)} KM` : '',
    services: salon.categories?.length > 0 ? salon.categories : [],
    languageCodes: salon.languageCodes,
  };
};

const SaloonCategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const tabsRef = useRef(null);

  const currentCategoryId = categoryId;
  const passedCategoryName = location.state?.categoryName || 'Category';

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const imageBaseUrl = import.meta.env.VITE_CATEGORY_IMAGE_URL;

  // Fetch all categories for the tab strip
  const { data: categoryData } = useGetCategory();
  const categories = categoryData?.data || location.state?.categories || [];

  // Scroll the active tab into view
  useEffect(() => {
    if (tabsRef.current) {
      const activeBtn = tabsRef.current.querySelector('[data-active="true"]');
      if (activeBtn) {
        activeBtn.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [currentCategoryId, categories]);

  // Fetch salons filtered by category ID
  const filters = {
    category: currentCategoryId,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
  };

  const {
    data: salonsData,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllSalons(filters);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentCategoryId]);

  const rawSalons = salonsData?.pages?.flatMap((p) => p.data) ?? [];
  const salons = rawSalons.map(normalizeService);

  const handleCategoryChange = (cat) => {
    navigate(`/salons/category/${cat.id}`, {
      state: { categoryName: cat.label.trim(), categories },
      replace: true,
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="sticky top-0 lg:top-[75px] z-20 bg-white border-b lg:border-none border-gray-100 shadow-sm">
        {/* Title row */}
        <div className=" lg:hidden flex items-center gap-3 px-4 lg:px-10 xl:px-32 pt-4 pb-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            <ArrowLeft size={22} className="text-gray-800" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 truncate">
            {categories.find(c => String(c.id) === String(currentCategoryId))?.label || passedCategoryName}
          </h1>
        </div>

        {/* Category tabs */}
        {categories.length > 0 && (
          <div
            ref={tabsRef}
            className="flex lg:py-10 overflow-x-auto scrollbar-hide gap-3 px-4 lg:px-10 xl:px-32 pb-3 border-b lg:border-none border-gray-100"
          >
            {categories.map((cat) => {
              const isActive = String(cat.id) === String(currentCategoryId);
              return (
                <button
                  key={cat.id}
                  data-active={isActive}
                  onClick={() => handleCategoryChange(cat)}
                  className="flex flex-col items-center gap-1.5 flex-shrink-0 group"
                >
                  {/* Image */}
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center transition-all duration-200
                    `}
                  >
                    {cat.imageUrl ? (
                      <img
                        src={`${imageBaseUrl}${cat.imageUrl}`}
                        alt={cat.label}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-xs text-gray-400">{cat.label?.[0]}</span>
                    )}
                  </div>
                  {/* Label */}
                  <span
                    className={`text-xs text-center w-16 truncate transition-all duration-200
                      ${isActive ? 'font-semibold text-black border-b-2 border-black pb-0.5' : 'font-normal text-gray-500'}
                    `}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Search bar (Mobile Only) */}
        <div className="px-4 py-3 border-t border-gray-50 lg:hidden">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 w-full transition-all focus-within:border-gray-400 focus-within:shadow-sm">
            <Search size={18} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for salons, parlors, or massages..."
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="flex-shrink-0 hover:bg-gray-100 p-1 rounded-full transition-colors">
                <X size={16} className="text-gray-500" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="px-4 lg:px-10 xl:px-32 py-4">
        {/* Section heading & Desktop Search */}
        <div className="mb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-base lg:text-xl font-bold text-gray-900">
              Salons offering {categories.find(c => String(c.id) === String(currentCategoryId))?.label || passedCategoryName}
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">Browse through our curated list of salons</p>
          </div>

          {/* Desktop Search bar */}
          <div className="hidden lg:flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2.5 w-[400px] transition-all hover:border-gray-400 focus-within:border-gray-500 focus-within:shadow-sm">
            <Search size={18} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for salons, parlors, or massages..."
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="flex-shrink-0 hover:bg-gray-100 p-1 rounded-full transition-colors">
                <X size={16} className="text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse">
                <div className="h-44 bg-gray-200 rounded-t-2xl" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty / error state */}
        {!isLoading && (isError || salons.length === 0) && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <Search size={40} className="mb-4 opacity-30" />
            <p className="text-base font-medium text-gray-500">
              {searchQuery ? `No salons found for "${searchQuery}"` : 'Select a category to view salons'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-sm text-black underline underline-offset-2"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Salon grid */}
        {!isLoading && !isError && salons.length > 0 && (
          <>
            <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 xl:grid-cols-4 lg:gap-6">
              {salons.map((salon, idx) => (
                <Link
                  key={`${salon.id}-${idx}`}
                  to={`/salon-details/${salon.id}`}
                  className="block"
                >
                  <SalonCategoryCard salon={salon} />
                </Link>
              ))}
            </div>

            {/* Load more */}
            {hasNextPage && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="px-8 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors disabled:opacity-60"
                >
                  {isFetchingNextPage ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SaloonCategoryPage;
