import axios, { type AxiosError, type AxiosRequestConfig } from "axios";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// const authRequest = axios.create({
//   baseURL: BASE_URL,
//   //   timeout: 10000,
// });

// // Get token from cookie
// const getCookieValue = (name: string): string | null => {
//   const cookies = document.cookie.split(";");
//   const cookie = cookies.find((row) => row.trim().startsWith(`${name}=`));
//   return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
// };

// // Set token to cookie (used after login/register)
// const setTokenCookie = (token: string) => {
//   document.cookie = `token=${token}; path=/; max-age=86400`; // 1 day
// };

// // Request Interceptor
// authRequest.interceptors.request.use(
//   (config) => {
//     const token = getCookieValue("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response Interceptor
// authRequest.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.warn("Unauthorized: You can redirect to login here");
//     }
//     return Promise.reject(error);
//   }
// );

// export { authRequest, setTokenCookie };

import axios, { type AxiosRequestConfig } from "axios";
import { CookieName } from "@/types/cookie-eunm";
import Cookies from "js-cookie";
