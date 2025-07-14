import { axiosInstance } from "../request";
import type {
  AuthLoginForm,
  AuthRegisterForm,
  IAuthResponse,
} from "@/types/auth-type";

export const authRequest = () => {
  const AUTH_LOGIN = async (payload: AuthLoginForm): Promise<IAuthResponse> => {
    return await axiosInstance({
      url: "/auth/login",
      method: "POST",
      data: payload,
    });
  };

  const AUTH_REGISTER = async (
    payload: AuthRegisterForm
  ): Promise<IAuthResponse> => {
    return await axiosInstance({
      url: "/auth/register",
      method: "POST",
      data: payload,
    });
  };

  return {
    AUTH_LOGIN,
    AUTH_REGISTER,
  };
};

// auth-api.ts
export const AuthregisterUser = async (data: AuthRegisterForm) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data; // <-- This is the value returned by the function
};
