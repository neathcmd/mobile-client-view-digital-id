export interface AuthLoginForm {
  user_name: string;
  password: string;
}

export interface AuthRegisterForm {
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
