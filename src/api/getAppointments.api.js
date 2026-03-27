import axiosInstance from "./axiosInstance";

/**
 * POST /user/app/v2/getallapointments
 * Returns all appointments for the authenticated user.
 */
export const getAppointments = async () => {
  const response = await axiosInstance.post("/user/app/getallapointments");
  return response.data;
};
