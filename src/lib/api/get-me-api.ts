import axios from "@/lib/api/request";
import { IUser } from "@/types/user-type";
import { CardItem } from "@/types/card-type";

export const userRequest = () => {
  const PROFILE = async (): Promise<IUser> => {
    return await axios({
      url: "/user/me",
      method: "GET",
    });
  };

  const GET_CARDS = async (): Promise<{ cards: CardItem[] }> => {
    return await axios({
      url: "/card/get-cards?is_deleted=false",
      method: "GET",
      withCredentials: true,
    });
  };

  return {
    PROFILE,
    GET_CARDS,
  };
};
