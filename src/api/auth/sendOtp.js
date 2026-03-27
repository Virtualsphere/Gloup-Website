import axiosInstance from "../axiosInstance";




export const sendOtp = async (phone) => {
    const response = await axiosInstance.post(`/user/auth/sendOTP`, {
        phone
    });

    return response.data;
};


