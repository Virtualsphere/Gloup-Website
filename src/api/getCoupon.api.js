import axiosInstance from "./axiosInstance";


export const getCoupon = async () => {
const response = await axiosInstance.get('/user/app/v2/get/activecoupons')
    return response.data
}