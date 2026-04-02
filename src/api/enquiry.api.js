import axiosInstance from './axiosInstance';

/**
 * POST /v2/enquiry
 * @param {{ name: string, email: string, phone: string, state: string, message?: string }} data
 */
export const createEnquiry = async (data) => {
  const response = await axiosInstance.post('/partner/app/v2/enquiry', data);
  return response.data;
};
