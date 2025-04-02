import axios, { AxiosResponse } from "axios"
import {
  AuthResponse,
  UserLoginParams,
  UserRegisterParams,
} from "./models/ApiUser"
import { User } from "@/model/user"
import { sign } from "crypto"
import { BranchesReponse, BranchParams } from "./models/ApiBranch"

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
    getUserInfo: (
      token: string
    ): Promise<AxiosResponse<{ user: User }>> =>
      api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    refreshToken: (): Promise<AxiosResponse<AuthResponse>> =>
      api.get("/users/refresh", {
        withCredentials: true,
      }),
    signout: (): Promise<AxiosResponse<AuthResponse>> =>
      api.delete("/users/signout"),
  },
  branch: {
    create: (
      body: BranchParams
    ): Promise<AxiosResponse<BranchParams>> =>
      api.post("/branch/create", body),
    getAll: (): Promise<AxiosResponse<BranchesReponse>> =>
      api.get("/branch/getAll"),
  },
}
