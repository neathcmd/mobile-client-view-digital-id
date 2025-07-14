import axios, { type AxiosError, type AxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 🔑 include cookies in requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically retry requests once if token is expired
axiosInstance.interceptors.response.use(
  (response) => response.data, // simplify response shape
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Check if unauthorized and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token — cookies are sent automatically
        await axiosInstance.post("/auth/refresh");

        // Retry the original request after successful refresh
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Optional: Redirect to login or clear session
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };
