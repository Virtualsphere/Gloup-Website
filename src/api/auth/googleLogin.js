import axiosInstance from "../axiosInstance";

export const googleLogin = async (token) => {
    const response = await axiosInstance.post(`/user/auth/googlelogin`, {
        token
    });

    return response.data;
};
