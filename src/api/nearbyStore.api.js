// api/nearbyStore.api.js

import axiosInstance from "./axiosInstance";

export const getNearbySalons = async (filters) => {
  const response = await axiosInstance.post(
    "/user/app/v2/store/nearby/",
    filters
  );

  return response.data;
};