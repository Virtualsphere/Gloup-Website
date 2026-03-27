// api/nearbyStore.api.js

import axiosInstance from "./axiosInstance";

export const addGuest = async (data) => {
  const response = await axiosInstance.post(
    "/user/app/v2/guest/add",
    data
  );

  return response.data;
};