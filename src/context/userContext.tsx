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
    isAdmin: false,
  })
  const [accessToken, setAccessToken] = React.useState<string | null>(
    null
  )

  const storeUser = (user: User) => {
    setUser(user)
  }

  const storeAccessToken = (token: string | null) => {
    setAccessToken(token === "" ? null : token)
    if (token === "") {
      localStorage.removeItem("accessToken")
    } else {
      localStorage.setItem("accessToken", token as string)
    }
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
      isAdmin: false,
    })
    console.log("hello")
    window.location.pathname = "/auth"
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
