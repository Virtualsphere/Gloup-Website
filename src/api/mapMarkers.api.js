import axiosInstance from "./axiosInstance";

/**
 * Fetch clustered map markers.
 * @param {{ bounds: { northEast: { lat: number, lng: number }, southWest: { lat: number, lng: number } }, zoom: number, filters?: object, limit?: number }} params
 */
export const getMapMarkersClustered = async (params) => {
  const { bounds, zoom, filters = {}, limit = 500 } = params;

  if (!bounds || !bounds.northEast || !bounds.southWest || !zoom) {
    throw new Error("bounds and zoom are required");
  }

  const response = await axiosInstance.post("/app/v2/salons/map-markers-clustered", {
    bounds,
    zoom,
    filters,
    limit
  });

  return response.data; // Expected: { success, zoom, clusteringEnabled, data: { clusters: [], markers: [] }, totalCount }
};
