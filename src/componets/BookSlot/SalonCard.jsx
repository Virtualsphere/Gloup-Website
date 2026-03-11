import { MapPin, Users, Star, Crown, Clock, Calendar } from "lucide-react";
import { useBookingStore } from "../../store/bookingStore";

const SalonCard = ({ showTime, bookingDate, bookingTime, rounded = true }) => {
  const salon = useBookingStore((s) => s.salon);

  // Fallback values when the store hasn't been populated yet
  const name      = salon.name      || "Salon";
  const rating    = salon.rating    ?? "–";
  const reviews   = salon.reviewCount ?? 0;
  const gender    = salon.gender    || "";
  const address   = salon.address   || "";
  const imageUrl  = salon.imageUrl  || "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&q=80";

  return (
    <div>
      {/* Main Card */}
      <div className={`bg-white lg:bg-gray-100 pb-3 shadow-xl lg:shadow-none overflow-hidden border border-stone-100 ${rounded ? 'rounded-3xl' : ''}`}>
        {/* Image + Info Row */}
        <div className="flex gap-4 p-4 lg:px-0">
          {/* Salon Image */}
          <div className="w-28 h-20 lg:w-40 lg:h-28 flex-shrink-0 rounded-2xl overflow-hidden bg-stone-200 relative">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
            {/* Verified badge */}
            {salon.isVerified && (
              <div className="absolute top-1.5 left-1.5 bg-yellow-400 rounded-full w-5 h-5 flex items-center justify-center shadow">
                <Crown className="w-3 h-3 text-white fill-yellow-400" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-center lg:justify-start gap-2">
            <h2 className="text-stone-800 font-semibold leading-tight text-base lg:text-xl">
              {name}
            </h2>

            {/* Rating & Gender */}
            <div className="flex items-center gap-3">
              {rating !== "–" && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-stone-400 lg:text-stone-500 font-semibold text-sm lg:text-base">{rating}</span>
                  {reviews > 0 && (
                    <span className="text-stone-400 lg:text-stone-500 text-sm lg:text-base">({reviews})</span>
                  )}
                </div>
              )}
              {gender && (
                <div className="flex items-center gap-1 text-stone-600 text-sm">
                  <Users className="w-3 h-3 text-indigo-400" />
                  <span className="text-stone-500 text-sm lg:text-base capitalize">{gender}</span>
                </div>
              )}
            </div>

            {/* Location */}
            {address && (
              <div className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-stone-400 mt-0.5 flex-shrink-0" />
                <span className="text-stone-400 lg:text-stone-500 text-xs lg:text-sm leading-relaxed">
                  {address}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Conditional Time & Date Display */}
        {showTime && (
          <>
            <div className="flex items-center gap-3 px-4 lg:px-0">
              <div className="flex items-center gap-2 text-stone-400">
                <Calendar className="w-4 h-4 text-black" />
                <span className="text-xs lg:text-base lg:text-black font-medium">{bookingDate}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-400">
                <Clock className="w-4 h-4 text-black" />
                <span className="text-xs lg:text-base lg:text-black font-medium">{bookingTime}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SalonCard;