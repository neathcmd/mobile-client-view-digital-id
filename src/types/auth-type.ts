export interface AuthLoginType {
  email: string;
  password: string;
}

export interface AuthRegisterType {
  fullName: string;
  email: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
  };
}
