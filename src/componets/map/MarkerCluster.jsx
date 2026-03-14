import React from 'react';
import { Marker } from '@react-google-maps/api';
import { useMapStore } from '../../store/mapStore';

export default function MarkerCluster({ cluster, map }) {
  const { setCenter } = useMapStore();
  
  // Custom transparent image fallback if using OverlayView is too complex
  // For standard @react-google-maps/api, a colored marker or custom SVG icon URL is best.
  // We recreate a green circle with text using an SVG data URI
  const count = cluster.count || 2;
  const size = count > 100 ? 50 : count > 20 ? 40 : 30;
  
  const svgMarkup = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="#22c55e" fill-opacity="0.9" stroke="white" stroke-width="2"/>
      <text x="${size/2}" y="${size/2}" font-family="Arial, sans-serif" font-size="${size/2.5}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="central">${count}</text>
    </svg>
  `;
  const svgUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgMarkup)}`;

  const handleClick = () => {
    if (map) {
      // Zoom into the cluster
      map.panTo({ lat: cluster.lat, lng: cluster.lng });
      map.setZoom(map.getZoom() + 2);
    }
  };

  return (
    <Marker
      position={{ lat: cluster.lat, lng: cluster.lng }}
      onClick={handleClick}
      icon={{
        url: svgUrl,
        anchor: new window.google.maps.Point(size/2, size/2)
      }}
      zIndex={100}
    />
  );
}
