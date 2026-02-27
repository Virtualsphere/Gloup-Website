import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:"http://localhost:5678/user/app/v2",
    // withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    }
})


export default axiosInstance;


