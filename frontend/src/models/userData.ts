export interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserId {
  id: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: UserId;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface ShortUserInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
