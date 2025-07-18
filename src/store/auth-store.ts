import { create } from "zustand";
import { devtools } from "zustand/middleware";
import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
import { CookieName } from "@/types/cookie-enum";

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    accessToken: null,
    refreshToken: null,

    // setTokens after login or register
    setTokens: (accessToken, refreshToken) => {
      Cookies.set(CookieName.ACCESSTOKEN, accessToken),
        Cookies.set(CookieName.REFRESHTOKEN, refreshToken),
        set(
          {
            accessToken,
            refreshToken,
          },
          false,
          "auth-store"
        );
    },
  }))
);
