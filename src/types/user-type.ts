import { ReactNode } from "react";
import { CardItem } from "./card-type";

export interface IUser {
  full_name: ReactNode;
  massage: string;
  data: UserData;
}
export interface UserData {
  id: string;
  full_name?: string | undefined;
  user_name: string;
  email: string;
  password: string;
  avatar?: string;
  is_deleted: boolean;
  is_active: boolean;
  role: string[];
  created_at: string;
  updated_at: string;
  idCard: CardItem[];
}
