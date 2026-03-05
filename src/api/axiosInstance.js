import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const axiosInstance = axios.create({
    baseURL:"http://localhost:5678/user",
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


