import axiosInstance from "./axiosInstance";


export const getBanner = async () => {
const response = await axiosInstance.get('/app/v2/getbanner')
    return response.data
}