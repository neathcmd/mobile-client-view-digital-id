import type { IAuthResponse, AuthLoginForm } from "";
import request from "";

export const authRequest = () => {
  const AUTH_LOGIN = async (payload: AuthLoginForm): Promise<IAuthResponse> => {
    return await request({
      url: "/auth/login",
      method: "POST",
      data: payload,
    });
  };
  return {
    AUTH_LOGIN,
  };
};
