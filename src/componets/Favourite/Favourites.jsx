import React from "react";
import FavoriteCard from "../../componets/shared/ui/FavoriteCard";
import { ListFilter } from "lucide-react";

// Dummy data mirroring the screenshot exactly
const STATIC_FAVORITES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    name: "Elite Hair Studio",
    rating: "4.8",
    reviews: 234,
    location: "Koramangala, Bangalo...",
    distance: "2.5 KM",
    mainService: "Haircut",
    price: "299",
    isPremium: true,
    languages: ["A", "अ", "అ"],
    services: ["Hair", "Beard", "More", "Extra"]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1521590838703-d6cbfec461f3?w=800&q=80",
    name: "Beauty Lounge",
    rating: "4.6",
    reviews: 189,
    location: "Indiranagar, Bangalo...",
    distance: "3.2 KM",
    mainService: "Facial",
    price: "499",
    isPremium: false,
    languages: ["A", "अ"],
    services: ["Facial", "Makeup"]
  },
  {
    id: 3,
    name: "Chic Cuts",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    rating: "4.7",
    reviews: 278,
    location: "HSR Layout, Bangalo...",
    distance: "2.9 KM",
    mainService: "Styling",
    price: "399",
    isPremium: true,
    languages: ["A", "అ", "ల"], // Dummy representation
    services: ["Hair", "Color"]
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    name: "Glow Spa",
    rating: "4.9",
    reviews: 287,
    location: "Rajajinagar, Bangalo...",
    distance: "1.5 KM",
    mainService: "Facial",
    price: "699",
    isPremium: true,
    languages: ["A", "अ", "అ"],
    services: ["Facial", "Spa"]
  }
];

const Favourites = () => {
  const favourites = STATIC_FAVORITES;

  return (
    <div className="page-favourites min-h-screen bg-gray-50 pb-20">
      
      {/* Mobile Top App Bar (Screenshot styling) */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center gap-2 bg-gray-50 flex-1 rounded-lg px-3 py-2 mr-3 border border-gray-100 shadow-sm">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search favorites..." 
            className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400 text-gray-700"
          />
        </div>
        <button className="bg-gray-50 p-2 rounded-lg border border-gray-100 shadow-sm">
          <ListFilter size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="px-4 py-4 lg:py-8 lg:px-32 mx-auto">
        {/* Header Section */}
        <div className="mb-4 lg:mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">My Favorites</h2>
          <p className="text-sm text-gray-500 mt-1">{favourites.length} saved salons</p>
        </div>

        {favourites?.length > 0 ? (
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-6">
            {favourites.map((fav) => (
              <FavoriteCard key={fav.id} salon={fav} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 lg:py-20">
            <h5 className="font-semibold text-gray-900 lg:text-xl">No favourites added</h5>
            <p className="text-gray-500 mt-2">You haven’t saved any stores yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
