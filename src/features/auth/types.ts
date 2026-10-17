export interface AuthUser {
  id: number;
  uuid?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  role: string;
  avatar?: string | null;
  bio?: string | null;
}

export interface AuthSuccessResponse {
  status: boolean;
  message: string;
  code: number;
  token_type?: string;
  token?: string;
  data: AuthUser;
}

export interface ProfileResponse {
  status: boolean;
  message: string;
  code: number;
  data: AuthUser;
}

export interface ApiResponse<T = unknown> {
  status?: boolean;
  success?: boolean;
  message: string;
  code?: number;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  profileLoading: boolean;
  error: string | null;
  initialized: boolean;
}
