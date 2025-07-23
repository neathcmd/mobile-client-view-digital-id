// import { ReactNode } from "react";
import { IUser } from "./user-type";

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  is_deleted: boolean;
  updated_at: string;
  created_at: string;
}


export type CardType = "Minimal" | "Modern" | "Corporate";
export type GenderType = "male" | "female";
export interface CardItem {
  id: string;
  user: IUser;
  gender: GenderType;
  full_name: string;
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
  qr_link?: string;
  card_type?: CardType;
  theme_color?: string;
  is_active: boolean;
  is_deleted: boolean;
  updated_at: string;
  created_at: string;
  socialLinks: SocialLink[];



}export interface CreateCardPayload {
  full_name: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  nationality: string;
  address: string;
  card_type: string;
  social: {
    platform: string;
    icon: string;
    url: string;
  }[];
}

