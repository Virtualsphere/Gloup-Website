import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});
let pathname = window.location
// Request interceptor to attach token as adminauthtoken header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");  
  if (token) {
    config.headers["userauth"] = token; // set custom header here
  }
  return config;
});

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data.error.code === "Authentication Failed") {
      localStorage.removeItem("token");
      if (pathname !== "/login" && pathname !== "/register") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
