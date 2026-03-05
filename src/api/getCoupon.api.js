import axiosInstance from "./axiosInstance";


export const getCoupon = async () => {
const response = await axiosInstance.get('/app/v2/get/activecoupons')
    return response.data
}