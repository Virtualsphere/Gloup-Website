import axiosInstance from "./axiosInstance";


export const getBanner = async () => {
const response = await axiosInstance.get('/user/app/v2/getbanner')
    return response.data
}