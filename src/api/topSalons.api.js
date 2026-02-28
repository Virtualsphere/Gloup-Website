import axiosInstance from "./axiosInstance";


export const getTopSalons = async () => {
const response = await axiosInstance.get('/app/v2/salons/top')
    return response.data
}