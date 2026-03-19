import { create } from "zustand";
import { getMapMarkersClustered } from "../api/mapMarkers.api";

export const useMapStore = create((set, get) => ({
  // Map State
  bounds: null,
  zoom: 12,
  center: { lat: 13.0827, lng: 80.2707 }, // Default: Chennai

  // Data State
  clusters: [],
  markers: [],
  clusteringEnabled: false,
  totalCount: 0,
  isLoading: false,
  error: null,

  // Selected state
  selectedStoreId: null,

  // Actions
  setBoundsAndZoom: (bounds, zoom) => set({ bounds, zoom }),
  
  setCenter: (center) => set({ center }),
  
  setSelectedStoreId: (id) => set({ selectedStoreId: id }),

  fetchMapData: async (filters = {}) => {
    const { bounds, zoom } = get();
    if (!bounds || !zoom) return;

    set({ isLoading: true, error: null });

    try {
      const response = await getMapMarkersClustered({ bounds, zoom, filters });
      
      if (response.success) {
        set({
          clusters: response.data?.clusters || [],
          markers: response.data?.markers || [],
          clusteringEnabled: response.clusteringEnabled,
          totalCount: response.totalCount,
          isLoading: false
        });
      } else {
        throw new Error(response.message || "Failed to fetch map data");
      }
    } catch (err) {
      console.error("fetchMapData Error:", err);
      set({ error: err.message, isLoading: false });
    }
  },

  resetMapData: () => set({ clusters: [], markers: [], totalCount: 0, error: null })
}));
