import axiosInstance from "./axiosInstance";

export const getSlotStatus = async ({ saloon_id, date }) => {
  const response = await axiosInstance.get('/user/app/v2/getslotstatus', {
    params: { saloon_id, date }
  });
  return response.data;
};
