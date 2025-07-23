
import axios from "@/lib/api/request";
import { CreateCardPayload,  } from "@/types/card-type";


export const cardRequest = (() => {
  const CREATE_CARD = async (payload: CreateCardPayload) => {
    return await axios({
      url: "/card/create-card",
      withCredentials: true,
      method: "POST",
      data: payload,
    })
  }

  return {
    CREATE_CARD,
  }
})
