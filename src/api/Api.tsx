import axios, { AxiosResponse } from "axios"
import {
  AuthResponse,
  UserLoginParams,
  UserRegisterParams,
} from "./models/ApiUser"
import { User } from "@/model/user"
import { BranchesReponse, BranchParams } from "./models/ApiBranch"
import { Car, CarFilters } from "./models/ApiCar"
import { Order } from "@/model/order"
import { Review } from "@/model/review"
import { string } from "prop-types"
import { EmailRequestInterface } from "./models/ApiEmail"

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
      api.delete("/users/signout", {
        withCredentials: true,
      }),
    uploadProfileImage: (
      body: FormData
    ): Promise<AxiosResponse<{ message: string }>> =>
      api.put("/users/uploadProfileImage", body),
  },
  branch: {
    create: (
      body: FormData
    ): Promise<AxiosResponse<{ message: string }>> =>
      api.post("/branch/create", body),
    getAll: (): Promise<AxiosResponse<BranchesReponse>> =>
      api.get("/branch/getAll"),
    delete: (
      id: string
    ): Promise<AxiosResponse<{ message: string }>> =>
      api.delete(`/branch/delete/${id}`),
  },
  car: {
    create: (
      body: FormData
    ): Promise<AxiosResponse<{ message: string }>> =>
      api.post("/car/create", body),
    getAll: (
      entry?: string
    ): Promise<AxiosResponse<{ cars: Car[]; message: string }>> =>
      api.get(`/car/all/${entry}`),
    getCategory: (
      params: string
    ): Promise<AxiosResponse<{ cars: Car[]; message: string }>> =>
      api.get(`/car/category/${params}`),
    getCar: (
      id: string
    ): Promise<AxiosResponse<{ car: Car; message: string }>> =>
      api.get(`/car/${id}`),

    filter: (
      params: CarFilters
    ): Promise<AxiosResponse<{ cars: Car[] }>> => {
      return api.get("/car/filtered", { params })
    },
    getAveragePrice: (): Promise<AxiosResponse<number>> =>
      api.get("/car/get/averageRentalPrice"),
  },
  order: {
    create: (
      data: any
    ): Promise<AxiosResponse<{ message: string; orderId: string }>> =>
      api.post("/order/create", data),
    getAll: (
      id: string
    ): Promise<AxiosResponse<{ message: string; orders: Order[] }>> =>
      api.get(`/order/getAll/${id}`),
    getTopCar: (): Promise<
      AxiosResponse<{ message: string; car: Car }>
    > => api.get("/order/getMostReservedCarId"),
    getOrder: (
      id: string
    ): Promise<AxiosResponse<{ message: string; order: Order }>> =>
      api.get(`/order/${id}`),
    validateOrder: (
      body: any
    ): Promise<AxiosResponse<{ message: string }>> =>
      api.post(`/order/validate/${body.orderId}`, {
        totalPrice: body.totalPrice,
      }),
    deleteOrder: (
      id: string
    ): Promise<AxiosResponse<{ message: string }>> =>
      api.delete(`/order/${id}`),
    getPaidOrders: (
      id: string
    ): Promise<AxiosResponse<{ message: string; orders: Order[] }>> =>
      api.get(`/order/paid/${id}`),
  },
  review: {
    create: (
      body: any
    ): Promise<AxiosResponse<{ message: string }>> =>
      api.post("/reviews/create", body),
    getAll: (): Promise<
      AxiosResponse<{ message: string; data: Review[] }>
    > => api.get("/reviews/"),
    getUserReviews: (
      id: string
    ): Promise<AxiosResponse<{ message: string; data: Review }>> =>
      api.get(`/reviews/${id}`),
  },
  coupon: {
    validateCoupon: (
      code: string
    ): Promise<
      AxiosResponse<{
        valid: boolean
        discountAmount: number
        message?: string
      }>
    > => api.get(`/coupons/validate/${code}`),
  },
  email: {
    send: (
      body: EmailRequestInterface
    ): Promise<AxiosResponse<{ message: string }>> =>
      api.post("/email/send", body),
  },
}
