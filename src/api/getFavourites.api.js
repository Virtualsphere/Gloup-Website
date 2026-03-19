import axiosInstance from "./axiosInstance";

/**
 * GET /app/v2/favourites
 * Returns all favourite salons for the authenticated user.
 */
export const getFavourites = async () => {
  const response = await axiosInstance.get("/app/v2/favourites");
  return response.data;
};
