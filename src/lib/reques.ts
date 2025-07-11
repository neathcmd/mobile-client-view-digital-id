import axios from "axios";

const request = axios.create({
  baseURL: "https://your-api-url.com/api", // change this
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor example (e.g., add token or handle 401 errors)
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized, redirect to login");
    }
    return Promise.reject(error);
  }
);

export default request;
