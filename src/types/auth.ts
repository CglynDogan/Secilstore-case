export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  status: number;
  message: string | null;
  data: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
  };
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}