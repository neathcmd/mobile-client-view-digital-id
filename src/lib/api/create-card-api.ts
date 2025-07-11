import axios from "axios";
import { CreateCardPayload, CreateCardResponse } from "@/types/card-type";

export const createCard = async (
  payload: CreateCardPayload
): Promise<CreateCardResponse> => {
  try {
    const response = await axios.post("/api/v1/card/create-card", payload);
    return response.data;
  } catch (error: any) {
    console.error("Create card API error:", error);
    throw error;
  }
};
