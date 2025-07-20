// import { ReactNode } from "react";
import { IUser } from "./user-type";
import { UserData } from "./user-type";

export interface SocialLinks {
  id: string;
  platform: string;
  url: string;
  icon: string;
  is_deleted: boolean;
  updated_at: string;
  created_at: string;
}

export interface CreateCardType {
  gender: string;
  nationality: string;
  dob: string;
  address: string;
  phone: string;
  card_type: string;
  social: Social[];
  web_site: string;
  job: string;
  bio: string;
}
interface Social {
  platform: string;
  icon: string;
  url: string;
}

export type CardType = "Minimal" | "Modern" | "Corporate";
export type GenderType = "male" | "female";
export interface CardItem {
  id: string;
  user: IUser;
  gender: GenderType;
  dob: string;
  address: string;
  phone: string;
  nationality: string;
  job: string;
  bio: string;
  web_site: string;
  company: string;
  qr_url?: string;
  qr_code?: string;
  card_type?: CardType;
  theme_color?: string;
  is_active: boolean;
  is_deleted: boolean;
  updated_at: string;
  created_at: string;
  socialLinks: SocialLinks[];
  qrlink: string;
}

export interface ICardResponse {
  message: string;
  card: {
    web_site: string | undefined;
    id: string;
    gender: GenderType;
    dob: string;
    address: string;
    phone: string;
    nationality: string;
    qr_url?: string;
    qr_code?: string;
    card_type?: CardType;
    is_active: boolean;
    is_deleted: boolean;
    theme_color?: string;
    updated_at: string;
    created_at: string;
    socialLinks: SocialLinks[];
    job: string;
    bio: string;
    company: string;
  };
}

export interface User {
  full_name?: string;
  email?: string;
  avatar?: string;
  data: UserData;
}
