import { create } from "zustand";
import { devtools } from "zustand/middleware";
import Cookies from "js-cookie";
import { CookieName } from "@/types/cookie-enum";

interface AuthStore {
  accessToken: string;
  refreshToken: string;
  setTokens: (accessToken: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    accessToken: null,
    refreshToken: null,

    //setToken after login or register
    setTokens: (accessToken, refreshToken) => {
      Cookies.set(CookieName.ACCESSTOKEN, accessToken);
      Cookies.set(CookieName.REFRESHTOKEN, refreshToken);
      set(
        {
          accessToken,
          refreshToken,
        },
        false,
        "token"
      );
    },
  }))
);
