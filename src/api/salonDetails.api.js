import axiosInstance from "./axiosInstance";


// Get Nearby salons

export const getSalonDetails = async (store_id) => {
    const response = await axiosInstance.post(`/user/app/v2/store/details/`, {
        store_id
    });

    return response.data;
};


