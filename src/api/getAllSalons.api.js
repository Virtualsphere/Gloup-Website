import axiosInstance from "./axiosInstance";

/**
 * Fetch paginated salons from GET /app/v2/get-all-stores
 * @param {{ page: number, limit: number, gender?: string, category?: number, lat?: number, lng?: number, search?: string }} params
 */
export const getAllSalons = async (params = {}) => {
  const { page = 1, limit = 10, gender, category, lat, lng, search } = params;

  const queryParams = { page, limit };
  if (gender)    queryParams.gender   = gender;
  if (category)  queryParams.category = category;
  if (lat)       queryParams.lat      = lat;
  if (lng)       queryParams.lng      = lng;
  if (search)    queryParams.search   = search;

  const response = await axiosInstance.get("/app/v2/get-all-stores", {
    params: queryParams,
  });

  return response.data; // { success, pagination, data }
};
