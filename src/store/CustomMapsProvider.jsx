import React, { createContext, useContext } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

const MapsContext = createContext({ isLoaded: false, loadError: null });

export const useMapsLoader = () => useContext(MapsContext);

export default function CustomMapsProvider({ children }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  return (
    <MapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </MapsContext.Provider>
  );
}
