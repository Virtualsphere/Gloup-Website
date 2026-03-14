import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { useMapStore } from '../../store/mapStore';
import { useNavigate } from 'react-router-dom';

export default function MapMarker({ marker }) {
  const { selectedStoreId, setSelectedStoreId } = useMapStore();
  const navigate = useNavigate();

  const isSelected = selectedStoreId === marker.id;

  const handleClick = () => {
    setSelectedStoreId(marker.id);
  };

  const handleInfoWindowClose = () => {
    setSelectedStoreId(null);
  };

  const handleNavigateToSalon = () => {
    navigate(`/salon-details/${marker.id}`);
  };

  return (
    <>
      <Marker
        position={{ lat: marker.lat, lng: marker.lng }}
        onClick={handleClick}
        // Utilizing a custom red drop pin if possible, otherwise fallback to default red
        icon={{
          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png" 
        }}
      />
      
      {isSelected && (
        <InfoWindow
          position={{ lat: marker.lat, lng: marker.lng }}
          onCloseClick={handleInfoWindowClose}
          options={{
             pixelOffset: new window.google.maps.Size(0, -35), 
             maxWidth: 200
          }}
        >
          <div 
             className="bg-white p-1 cursor-pointer flex flex-col gap-1 min-w-[120px]"
             onClick={handleNavigateToSalon}
          >
            <h4 className="font-semibold text-sm text-black truncate">{marker.name}</h4>
            <div className="flex items-center text-xs text-gray-600">
               <span className="font-medium mr-1">{marker.rating || "0.0"}</span>
               <span className="text-yellow-400">★</span>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}
