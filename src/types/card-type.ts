import { ReactNode } from "react";
import { UserData } from "./user-type";

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  is_deleted: boolean;
  updated_at: string;
  created_at: string;
}

export type CardType = "Corporate" | "Modern" | "Minimal";
export type GenderType = "male" | "female";
export interface CardItem {
  image: string | Blob | undefined;
  location: ReactNode;
  email: any;
  name: ReactNode;
  company: string;
  user: string;
  id: string;
  gender: GenderType;
  dob: string;
  addres: string;
  phone: string;
  natinalty: string;
  qr_url: string;
  qr_code: string;
  card_type: CardType;
  is_active: boolean;
  is_deleted: boolean;
  them_color: string;
  updated_at: string;
  created_at: string;
  social_links: SocialLink[];
  job: string;
  bio: string;
  website: string;
  compeny: string;
}
