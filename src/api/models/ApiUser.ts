export interface UserLoginParams {
  email: string
  password: string
}

export interface UserRegisterParams {
  email: string
  password: string
  userName: string
}

export interface AuthResponse {
  accessToken: string
}
