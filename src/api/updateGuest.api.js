// api/nearbyStore.api.js

import axiosInstance from "./axiosInstance";

export const updateGuest = async (data) => {
  const response = await axiosInstance.patch(
    "/app/v2/guest/update",
    data
  );

  return response.data;
};