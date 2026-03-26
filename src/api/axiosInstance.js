import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL,
    // withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    }
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.userauth = token;
  }

  return config;
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.error?.message;

    // ✅ Handle both 401 AND backend custom 400 auth error
    if (
      status === 401 ||
      (status === 400 && message === "Authentication Failed")
    ) {
      const { logout } = useAuthStore.getState();

      logout();
      localStorage.removeItem("auth-storage");
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;


