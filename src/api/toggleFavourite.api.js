import axiosInstance from "./axiosInstance";

/**
 * POST /app/v2/favourites
 * Toggles the favourite status for a salon.
 * Requires user authentication (token in header via axiosInstance interceptor).
 */
export const toggleFavourite = async (storeId) => {
  const response = await axiosInstance.post("/app/v2/favourites", {
    store_id: storeId,
  });
  return response.data;
};
