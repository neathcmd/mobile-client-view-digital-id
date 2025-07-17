// lib/api/user-api.ts
import axios from "@/lib/api/request";

export const userRequest = () => {
  const PROFILE = async ()=> {
    return await axios({
      url: "/user/me", // make sure this route is valid
      method: "GET",
    });
  };
  return {
    PROFILE,
  };
};
