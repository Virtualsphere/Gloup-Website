import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const axiosInstance = axios.create({
    baseURL:"https://f7f92njd-5678.inc1.devtunnels.ms/user",
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


