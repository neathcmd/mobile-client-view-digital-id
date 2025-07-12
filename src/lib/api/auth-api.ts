import request from "../reques";
import type {
  AuthLoginForm,
  AuthRegisterForm,
  IAuthResponse,
} from "@/types/auth-type";

export const authRequest = () => {
  const AUTH_LOGIN = async (payload: AuthLoginForm): Promise<IAuthResponse> => {
    return await request({
      url: "/auth/login",
      method: "POST",
      data: payload,
    });
  };

  const AUTH_REGISTER = async (
    payload: AuthRegisterForm
  ): Promise<IAuthResponse> => {
    return await request({
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
