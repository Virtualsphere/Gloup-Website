import axiosInstance from "../axiosInstance";

export const verifyOtp = async (payload) => {
  const response = await axiosInstance.post(
    `/user/auth/verifyOTP`,
    payload
  );

  return response.data;
};