import axiosInstance from "./axiosInstance";

export const getCategory = async () => {
    // Note: Assuming '/app/v2/getcategory' as the endpoint based on common patterns in the app
    const response = await axiosInstance.get('/user/app/v2/getallcategory');
    return response.data;
};
