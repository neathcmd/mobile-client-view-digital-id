import axios, { type AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/auth-store";
import Cookies from "js-cookie";
import { CookieName } from "@/types/cookie-enum";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// function remove token from cookie
const removeCookie = (name: any, path = "/", domain = "") => {
  let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
  if (domain) {
    cookieString += ` domain=${domain};`;
  }
  document.cookie = cookieString;
};

// function handle logout
const handleLogout = () => {
  removeCookie(CookieName.ACCESS_TOKEN);
  removeCookie(CookieName.REFRESH_TOKEN);

  //Redirect to login
  window.location.href = "/login";
};

//Add Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    config.headers["Authorization"] = accessToken;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalConfig: AxiosRequestConfig = error.config;

    if (error.response && error.response.data.status === 401) {
      if (!isRefreshing) {
        try {
          const response = await axiosInstance({
            method: "POST",
            url: `${BASE_URL}/auth/refresh-token`,
          });
          const { accessToken } = response.data;
          Cookies.set(CookieName.ACCESS_TOKEN, accessToken);
          error.config.headers["Authorization"] = `${accessToken}`;
          return await axiosInstance(originalConfig);
        } catch (error: any) {
          if (error.response && error.response.data) {
            // make logout function or remove token
            handleLogout();
            return Promise.reject(error.response.data);
          }
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }
    }
    if (error.respone && error.response.status === 401) {
      // write logout logic if 401 error
      handleLogout();
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
