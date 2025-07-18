import axios from "@/lib/api/request";
import { AuthRegisterType, AuthLoginType } from "@/types/auth-type";

export const authRequest = () => {
  const AUTH_REGISTER = async (payload: AuthRegisterType) => {
    return await axios({
      url: "/auth/register",
      method: "POST",
      data: payload,
    });
  };

  const AUTH_LOGIN = async (payload: AuthLoginType) => {
    return await axios({
      url: "/auth/login",
      method: "POST",
      data: payload,
    });
  };
  return {
    AUTH_REGISTER,
    AUTH_LOGIN,
  };
};
