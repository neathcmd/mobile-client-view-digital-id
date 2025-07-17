export interface AuthRegisterType {
  email: string;
  full_name: string;
  user_name: string;
  os?: string;
  device_type?: string;
  device_name?: string;
  ip_address?: string;
  browser?: string;
}

export interface AuthLoginType {
  user_name: string;
}
