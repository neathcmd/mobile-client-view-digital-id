import axios from "@/lib/api/request";
import { IUser } from "@/types/user-type";

export const userRequest = () => {
  const PROFILE = async (): Promise<IUser> => {
    return await axios({
      url: "/user/me",
      method: "GET",
    });
  };
  const GET_CARDS = async () => {
    return await axios({
      url: "/card/get-cards?is_deleted=false",
      withCredentials: true,
      method: "GET",
    });
  };

  return {
    PROFILE,
    GET_CARDS,
  };
};
