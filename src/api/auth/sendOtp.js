import axiosInstance from "../axiosInstance";




export const sendOtp = async (phone) => {
    const response = await axiosInstance.post(`/auth/sendOTP`, {
        phone
    });

    return response.data;
};


