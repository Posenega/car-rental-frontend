"use client"

import { User, UserContextType } from "@/model/user"
import React from "react"

export const UserContext =
  React.createContext<UserContextType | null>(null)

export const UserProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [user, setUser] = React.useState<User>({
    _id: "",
    userName: "",
    email: "",
  })
  const [accessToken, setAccessToken] = React.useState<string | null>(
    null
  )

  const storeUser = (user: User) => {
    setUser(user)
  }

  const storeAccessToken = (token: string | null) => {
    localStorage.setItem("accessToken", token as string)
    setAccessToken(token === "" ? null : token)
  }

  const login = (user: User, token: string) => {
    setUser(user)
    localStorage.setItem("token", token)
  }

  const signout = () => {
    localStorage.removeItem("accessToken")
    setAccessToken("")
    setUser({
      _id: "",
      userName: "",
      email: "",
    })
  }

  const value = {
    user,
    storeUser,
    login,
    storeAccessToken,
    accessToken,
    signout,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
