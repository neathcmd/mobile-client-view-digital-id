import axios from "@/lib/api/request";
import { CreateCardType, ICardResponse } from "@/types/card-type";

export const cardRequest = () => {
  const GET_CARDS = async (id: string): Promise<ICardResponse> => {
    return await axios({
      url: `/card/get-cards${id}`,
      method: "GET",
    });
  };

  const CREATE_CARD = async (payload: CreateCardType) => {
    return await axios({
      url: "/card/create-card",
      method: "POST",
      data: payload,
    });
  };
  const UPDATE_CARD = async (
    id: string,
    payload: CreateCardType
  ): Promise<ICardResponse> => {
    return await axios({
      url: `/card/update-card/${id}`,
      method: "PUT",
      data: payload,
    });
  };
  return {
    UPDATE_CARD,
    GET_CARDS,
    CREATE_CARD,
  };
};
