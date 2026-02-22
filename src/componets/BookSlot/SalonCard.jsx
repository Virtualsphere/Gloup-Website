import { MapPin, Users, Star, Crown, Clock, Calendar } from "lucide-react";

const SalonCard = ({ showTime, bookingDate, bookingTime, rounded = true }) => {
  return (
    
      <div>


        {/* Main Card */}
        <div className={`bg-white pb-3 shadow-xl overflow-hidden border border-stone-100 ${rounded ? 'rounded-3xl' : ''}`}>
          {/* Image + Info Row */}
          <div className="flex gap-4 p-4">
            {/* Salon Image */}
            <div className="w-28 h-20 lg:w-32 lg:h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-stone-200 relative">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&q=80"
                alt="Luxury Hair & Spa Studio"
                className="w-full h-full object-cover"
              />
              {/* Verified badge */}
              <div className="absolute top-1.5 left-1.5 bg-yellow-400 rounded-full w-5 h-5 flex items-center justify-center shadow">
                <Crown className="w-3 h-3 text-white fill-yellow-400" />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-center gap-2">
              <h2
                className="text-stone-800 font-semibold leading-tight"
                style={{ fontSize: "clamp(1rem, 3vw, 1.15rem)" }}
              >
                Luxury Hair & Spa Studio
              </h2>

              {/* Rating & Gender */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-stone-400 font-semibold text-sm">4.5</span>
                  <span className="text-stone-400 text-sm">(201)</span>
                </div>
                <div className="flex items-center gap-1 text-stone-500 text-sm">
                  <Users className="w-3 h-3 text-indigo-400" />
                  <span className="text-stone-500 text-sm">Unisex</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-stone-400 mt-0.5 flex-shrink-0" />
                <span className="text-stone-400 text-xs leading-relaxed">
                  123 Main Street, Downtown Area,
                  City Center, State 12345
                </span>
              </div>
            </div>

          </div>
          
          {/* Conditional Time & Date Display */}
          {showTime && (
            
                <>
                <div className="flex items-center gap-3 px-4">
                  <div className="flex items-center gap-2 text-stone-400">
                    <Calendar className="w-4 h-4 text-black" />
                    <span className="text-xs font-medium">{bookingDate}</span>
                </div>
                <div className="flex items-center gap-2 text-stone-400">
                    <Clock className="w-4 h-4 text-black" />
                    <span className="text-xs font-medium">{bookingTime}</span>
                </div>
                </div>
                </>
            
          )}
          
        </div>
      </div>
  );
};

export default SalonCard;