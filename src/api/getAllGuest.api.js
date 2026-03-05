import axiosInstance from "./axiosInstance";


export const getAllGuest = async () => {
const response = await axiosInstance.get('/app/v2/guest/all')
    return response.data
}