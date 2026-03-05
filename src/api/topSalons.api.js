import axiosInstance from "./axiosInstance";

export const getTopSalons = async (filters = {}) => {
  const { limit, page, gender, lat, lng } = filters;

  const params = {};

  if (limit) params.limit = limit;
  if (page) params.page = page;
  if (gender) params.gender = gender;
  if (lat) params.lat = lat;
  if (lng) params.lng = lng;

  const response = await axiosInstance.get('/app/v2/salons/top', {
    params,
  });

  return response.data;
};