import React from 'react';
import { Star, ChevronRight } from 'lucide-react';

const Reviews = () => {
  const ratingStats = [
    { stars: 5, count: 200, percentage: 80 },
    { stars: 4, count: 60, percentage: 20 },
    { stars: 3, count: 30, percentage: 10 },
    { stars: 2, count: 10, percentage: 5 },
    { stars: 1, count: 0, percentage: 0 },
  ];

  const filters = [
    { label: 'All (300)', active: true },
    { label: '5 ★ (200)', active: false },
    { label: '4 ★ (60)', active: false },
    { label: '3 ★ (30)', active: false },
  ];

  const reviews = [
    {
      id: 1,
      name: 'Karthik M.',
      initial: 'K',
      date: '2 days ago',
      rating: 5,
      text: 'Excellent haircut! The stylist really knows his craft. Clean salon with great ambiance.',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    },
    {
      id: 2,
      name: 'Ravi S.',
      initial: 'R',
      date: '2 days ago',
      rating: 5,
      text: 'Best grooming experience in the area. Very professional staff and reasonable prices.',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    },
    {
      id: 3,
      name: 'Pradeep K.',
      initial: 'P',
      date: '2 days ago',
      rating: 5,
      text: 'Good service overall. The facial treatment was amazing. Will visit again for sure.',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    },
    {
      id: 4,
      name: 'Suresh R.',
      initial: 'S',
      date: '2 days ago',
      rating: 5,
      text: 'Loved the hot towel shave! Old-school experience with modern comfort. Highly recommend.',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    },
    {
      id: 5,
      name: 'Vijay T.',
      initial: 'V',
      date: '2 days ago',
      rating: 5,
      text: 'Quick service, no long waits. The haircut was exactly what I wanted. Great attention to detail.',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={14}
        className={`${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-white lg:bg-gray-100 py-6 px-5 lg:px-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900">Reviews</h2>
        <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs md:text-sm lg:text-base">300 reviews</span>
            <button className="text-gray-900 text-sm font-medium lg:hidden">See All</button>
        </div>
      </div>

      {/* Rating Summary Block */}
      <div className="flex items-start gap-6 mb-6">
        {/* Overall Rating */}
        <div className="flex flex-col items-start gap-1">
          <span className="text-5xl font-bold text-gray-900">4.5</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className={i < 4 ? "text-yellow-400 fill-yellow-400" : (i === 4 ? "text-yellow-400 fill-yellow-400 half" : "text-gray-300")} /> 
              // Simple full stars for now, actual half star logic implies specific icon or svg
            ))}
          </div>
          <span className="text-xs md:text-sm text-gray-500">300 ratings</span>
        </div>

        {/* Rating Bars */}
        <div className="flex-1 space-y-1.5 md:space-y-2 lg:space-y-3  pt-1">
          {ratingStats.map((stat) => (
            <div key={stat.stars} className="flex items-center gap-2 text-xs md:text-sm lg:text-base">
              <span className="w-2 font-medium text-gray-500">{stat.stars}</span>
              <Star size={10} className="text-yellow-400 fill-yellow-400" />
              <div className="flex-1 h-1.5 md:h-2 lg:h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
              <span className="w-6 text-right text-xs md:text-sm lg:text-base text-gray-500">{stat.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide pb-2 mb-6">
        {filters.map((filter, index) => (
          <button
            key={index}
            className={`px-4 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap transition-colors ${
              filter.active
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Review Cards */}
      <div className="space-y-4 mb-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-start justify-between mb-3">
              <div className="flex gap-3">
                <div className={`w-10 h-10 rounded-full ${review.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <span className={`${review.textColor} font-semibold text-lg`}>{review.initial}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{review.name}</h3>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={12} 
                    className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {review.text}
            </p>
          </div>
        ))}
      </div>

      {/* See All Button */}
      <button className="w-full py-3 border border-gray-200 md:border-0 outline-none md:text-base lg:text-lg rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-gray-700 active:bg-gray-50 transition-colors">
        See All (300 reviews)
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Reviews;
