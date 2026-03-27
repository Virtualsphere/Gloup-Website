import axiosInstance from "./axiosInstance";


export const getAllGuest = async () => {
const response = await axiosInstance.get('/user/app/v2/guest/all')
    return response.data
}