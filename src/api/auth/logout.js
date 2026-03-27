import axiosInstance from "../axiosInstance";

export const logout = async () => {
    const response = await axiosInstance.post(`/user/auth/logout`);
    return response.data;
};
