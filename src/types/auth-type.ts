export interface AuthLoginType {
  user_name: string;
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

export type AuthRegisterType = {
  email: string;
  user_name: string;
  full_name: string;
  password: string;
  os?: string;
  device_type?: string;
  device_name?: string;
  ip_address?: string;
  browser?: string;
};

export type AuthLoginType = {
  user_name: string;
  password: string;
};

// interceptor types
export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresAt?: number;
}

export interface AuthConfig {
  baseURL: string;
  timout?: number;
  maxRetries: number;
  retryDelay: number;
  tokenStorageKey: string;
  refreshTokenStorageKey: string;
  enableLogging: boolean;
  refreshEndpoint: string;
  loginRedirectPath: string;
  unauthorizedRedirectPath: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: number;
  requestId?: string;
}
