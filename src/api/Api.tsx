import axios, { AxiosResponse } from "axios"
import {
  AuthResponse,
  UserLoginParams,
  UserRegisterParams,
} from "./models/ApiUser"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
})

export const CarRentalApi = {
  instance: api,
  user: {
    login: (
      body: UserLoginParams
    ): Promise<AxiosResponse<AuthResponse>> =>
      api.post("/users/login", body),
    register: (
      body: UserRegisterParams
    ): Promise<AxiosResponse<AuthResponse>> =>
      api.post("/users/register", body),
  },
}
