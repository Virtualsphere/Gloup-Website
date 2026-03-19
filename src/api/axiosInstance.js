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


export default axiosInstance;


