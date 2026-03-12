import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, MapPin, Search, Crosshair } from 'lucide-react';
import { useLoadScript } from '@react-google-maps/api';
import { useLocationStore } from '../../../store/locationStore';

const libraries = ['places'];
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const LocationSearchModal = ({ isOpen, onClose }) => {
  const [searchInput, setSearchInput] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [isLocating, setIsLocating] = useState(false);
  
  const setLocation = useLocationStore((s) => s.setLocation);

  const autocompleteService = useRef(null);
  const placesService = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (isLoaded && !autocompleteService.current) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
      // We need a dummy div for PlacesService as it requires a DOM element
      placesService.current = new window.google.maps.places.PlacesService(document.createElement('div'));
    }
  }, [isLoaded]);

  // Handle body scroll locking & Safari keyboard push fix
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle typing in the search box
  useEffect(() => {
    if (!searchInput.trim() || !autocompleteService.current) {
      setPredictions([]);
      return;
    }

    autocompleteService.current.getPlacePredictions(
      { 
        input: searchInput, 
        componentRestrictions: { country: 'in' } // Restrict to India 
      }, 
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          setPredictions(results);
        } else {
          setPredictions([]);
        }
      }
    );
  }, [searchInput]);

  const handleSelectPlace = (placeId, description) => {
    if (!placesService.current) return;

    placesService.current.getDetails(
      { placeId, fields: ['geometry', 'name', 'formatted_address'] },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place.geometry) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          
          setLocation({
            address: place.formatted_address || place.name || description,
            lat: lat,
            lng: lng
          });
          onClose();
        }
      }
    );
  };

  const handleCurrentLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Here you would optimally use reverse geocoding to get the name,
        // but for now we set coords and a generic text, or trigger the hook
        const { latitude, longitude } = position.coords;
        
        // Reverse geocoding to get a readable address
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
          setIsLocating(false);
          let addressText = "Current Location";
          if (status === "OK" && results[0]) {
            // Find the most relevant city-level or neighborhood address
            const cityResult = results.find(r => r.types.includes('locality')) || results[0];
            addressText = cityResult.formatted_address;
          }
          
          setLocation({
            address: addressText,
            lat: latitude,
            lng: longitude
          });
          onClose();
        });
      },
      (error) => {
        console.error("Error getting location: ", error);
        alert("Could not get your current location.");
        setIsLocating(false);
      }
    );
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex flex-col justify-end md:justify-center md:items-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 animate-fadeInModal" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="absolute inset-0 md:relative md:w-[500px] md:h-auto md:max-h-[85vh] bg-[#F5F5F5] md:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slideUpModal z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 md:py-5 border-b border-gray-200 bg-white">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2">
            <X size={24} className="text-gray-800" />
          </button>
          <h2 className="text-lg font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">
            Select Location
          </h2>
          <div className="w-10"></div> {/* Placeholder for centering */}
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[#F5F5F5]">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for area, street name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-white border-2 border-gray-200 rounded-2xl py-3.5 pl-12 pr-12 text-gray-500 font-medium placeholder-gray-400 placeholder:text-sm focus:outline-none focus:border-black focus:text-gray-900 transition-colors"
              autoFocus
            />
            {searchInput && (
              <button 
                onClick={() => setSearchInput('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Use Current Location Button */}
          <button 
            onClick={handleCurrentLocation}
            disabled={isLocating}
            className="w-full bg-black text-white rounded-2xl p-4 flex items-center justify-between hover:bg-gray-900 transition-colors active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-3 font-semibold">
              <Crosshair size={22} className={isLocating ? "animate-spin" : ""} />
              {isLocating ? "Locating..." : "Use current location"}
            </div>
            <ChevronRightIcon />
          </button>

          {/* Predictions List */}
          {loadError && (
            <div className="text-center p-4 text-red-500">Error loading Maps API</div>
          )}
          
          <div className="flex flex-col gap-3 mt-1">
            {predictions.map((prediction) => (
              <button
                key={prediction.place_id}
                onClick={() => handleSelectPlace(prediction.place_id, prediction.description)}
                className="bg-white rounded-2xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border border-gray-200 text-left active:bg-gray-100"
              >
                <div className="flex items-center gap-4 pr-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-gray-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 text-[15px]">
                      {prediction.structured_formatting?.main_text || prediction.description}
                    </span>
                    <span className="text-sm text-gray-500 truncate max-w-[220px] md:max-w-[300px]">
                      {prediction.structured_formatting?.secondary_text || ''}
                    </span>
                  </div>
                </div>
                <ChevronRightIcon />
              </button>
            ))}

            {/* Empty UI State when typing but no results */}
            {searchInput.trim() && predictions.length === 0 && !loadError && (
              <div className="text-center p-8 text-gray-500">
                No locations found matching "{searchInput}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

// Helper chevron icon
const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default LocationSearchModal;
