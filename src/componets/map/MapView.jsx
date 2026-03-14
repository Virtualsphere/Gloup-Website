import React, { useCallback, useRef } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { useMapStore } from '../../store/mapStore';
import { useMapsLoader } from '../../store/CustomMapsProvider';
import MapMarker from './MapMarker';
import MarkerCluster from './MarkerCluster';

const containerStyle = {
  width: '100%',
  height: '100%'
};

import { useMapFilterStore } from '../../store/mapFilterStore';

export default function MapView({ onMapLoad }) {
  const mapRef = useRef(null);
  const { filters } = useMapFilterStore();
  const {
    center,
    zoom,
    setCenter,
    setBoundsAndZoom,
    fetchMapData,
    markers,
    clusters
  } = useMapStore();

  const { isLoaded } = useMapsLoader();

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
    if (onMapLoad) onMapLoad(map);
  }, [onMapLoad]);

  const onUnmount = useCallback(function callback() {
    mapRef.current = null;
  }, []);

  const debounceTimerRef = useRef(null);

  const handleIdle = () => {
    if (mapRef.current) {
      const gBounds = mapRef.current.getBounds();
      if (!gBounds) return;

      const newBounds = {
        northEast: {
          lat: gBounds.getNorthEast().lat(),
          lng: gBounds.getNorthEast().lng()
        },
        southWest: {
          lat: gBounds.getSouthWest().lat(),
          lng: gBounds.getSouthWest().lng()
        }
      };

      const newZoom = mapRef.current.getZoom();
      const currentCenter = mapRef.current.getCenter();

      setBoundsAndZoom(newBounds, newZoom);
      setCenter({ lat: currentCenter.lat(), lng: currentCenter.lng() });

      // Clear previous timeout to debounce the fetch spam
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Fetch markers based on new bounds combined with current global filters
      debounceTimerRef.current = setTimeout(() => {
        fetchMapData(filters);
      }, 500);
    }
  };

  if (!isLoaded) return <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onIdle={handleIdle}
      options={{
        disableDefaultUI: true, // We are using custom MapControls
        clickableIcons: false,
        gestureHandling: 'greedy'
      }}
    >
      {/* Render Individual Markers */}
      {markers.map((marker, idx) => (
        <MapMarker key={`marker-${marker.id || idx}`} marker={marker} />
      ))}

      {/* Render Clusters */}
      {clusters.map((cluster, idx) => (
        <MarkerCluster key={`cluster-${idx}`} cluster={cluster} map={mapRef.current} />
      ))}
    </GoogleMap>
  );
}
