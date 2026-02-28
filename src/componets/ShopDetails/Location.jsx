import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const Location = ({ locationData = {}, shopName = "" }) => {
  const address = locationData?.address || "Address not provided";
  
  // Safely parse lat/long
  const lat = parseFloat(locationData?.latitude);
  const lng = parseFloat(locationData?.longitude);
  const hasCoordinates = !isNaN(lat) && !isNaN(lng);
  
  const center = {
    lat: hasCoordinates ? lat : 13.0416667, // Fallback location if invalid
    lng: hasCoordinates ? lng : 80.2340045,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const handleDirectionsClick = () => {
    if (hasCoordinates) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
    }
  };

  return (
    <div className="bg-white lg:bg-gray-100 py-6 px-5 lg:px-0">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">Location</h2>

      {/* Card wrapper on desktop */}
      <div className="lg:bg-white lg:rounded-2xl lg:border lg:border-gray-200 lg:overflow-hidden">
        {/* Map Placeholder */}
        <div className="w-full h-48 lg:h-56 bg-gray-200 rounded-2xl lg:rounded-none flex flex-col items-center justify-center relative overflow-hidden">
          {isLoaded && hasCoordinates ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={15}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
              }}
            >
              <Marker position={center} />
            </GoogleMap>
          ) : (
            <>
              <div className="flex flex-col items-center gap-2 z-10">
                <MapPin size={40} className="text-orange-500" fill="#fed7aa" strokeWidth={1.5} />
                <span className="text-sm text-gray-500 font-medium text-center px-4">
                  {shopName || "Salon Location"}
                </span>
              </div>
              {/* Subtle dot-grid to hint at a map */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
            </>
          )}
        </div>

        {/* Address + Get Directions */}
        <div className="pt-4 lg:px-5 lg:pb-5">
          <p className="text-gray-700 text-sm lg:text-base font-normal mb-3">
            {address}
          </p>
          <button 
            onClick={handleDirectionsClick}
            className="lg:flex items-center gap-2 text-sm lg:text-base font-semibold text-gray-900 hover:text-gray-600 transition-colors hidden"
          >
            <Navigation size={16} className="text-gray-900" style={{ transform: 'rotate(45deg)' }} />
            Get Directions
          </button>
        </div>


        <button 
          onClick={handleDirectionsClick}
          className="w-full py-3 border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-gray-900 active:bg-gray-50 transition-colors lg:hidden"
        >
          <Navigation size={16} className="text-gray-900 fill-gray-900" style={{ transform: 'rotate(45deg)' }}/>
          Get Directions
        </button>
      </div>

    </div>
  );
};

export default Location;

