import React from 'react';
import { LocateFixed, Plus, Minus } from 'lucide-react';
import { useMapStore } from '../../store/mapStore';

export default function MapControls({ map }) {
  const { setCenter } = useMapStore();

  const handleZoomIn = () => {
    if (map) map.setZoom(map.getZoom() + 1);
  };

  const handleZoomOut = () => {
    if (map) map.setZoom(map.getZoom() - 1);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(userLocation);
          if (map) {
            map.panTo(userLocation);
            map.setZoom(14); // Zoom in closer on current location
          }
        },
        (error) => {
          console.error("Error fetching location", error);
        }
      );
    }
  };

  return (
    <div className="absolute right-4 bottom-32 hidden lg:flex flex-col gap-3 z-10">
      <button 
        onClick={handleCurrentLocation}
        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 bg-white text-gray-800 transition shadow-[0_2px_10px_rgba(0,0,0,0.15)] focus:outline-none"
        aria-label="Current Location"
      >
        <LocateFixed className="w-5 h-5" />
      </button>

      <div className="bg-white rounded-[12px] flex flex-col shadow-md overflow-hidden bg-white text-gray-800 border border-gray-100">
        <button 
          onClick={handleZoomIn}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 border-b border-gray-100 transition focus:outline-none"
          aria-label="Zoom In"
        >
          <Plus className="w-5 h-5" />
        </button>
        <button 
          onClick={handleZoomOut}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition focus:outline-none"
          aria-label="Zoom Out"
        >
          <Minus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
