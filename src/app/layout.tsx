"use client"
import { Geist, Geist_Mono, Roboto } from "next/font/google"
import "./globals.css"
import { UserContext, UserProvider } from "../../context/userContext"
import { useContext, useEffect } from "react"
import { UserContextType } from "@/model/user"
import { useApiStatus } from "@/hooks/useApiStatus"
import { CarRentalApi } from "@/api/Api"

const roboto = Roboto({
  weight: [
    "200",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
  subsets: ["latin"],
  variable: "--font-roboto",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <AuthLayer>
          <body className={`${roboto.variable}`}>{children}</body>
        </AuthLayer>
      </UserProvider>
    </html>
  )
}

function AuthLayer({ children }: { children: React.ReactNode }) {
  const { storeAccessToken, storeUser } = useContext(
    UserContext
  ) as UserContextType

  const getUserInfo = useApiStatus({
    api: CarRentalApi.user.getUserInfo,
    onSuccess({ result }) {
      if (window.location.pathname.includes("auth")) {
        window.location.pathname = "/"
      }
      storeUser(result.user)
    },
    onFail({ message }) {
      if (message === "jwt expired") {
        refreshToken.fire()
        // localStorage.removeItem("accessToken")
        // window.location.pathname = "/auth"
      }
    },
  })
  const refreshToken = useApiStatus({
    api: CarRentalApi.user.refreshToken,
    onSuccess({ result }) {
      console.log("refreshed token")
      console.log(result)
    },
    onFail({ message }) {
      console.log(message)
    },
  })

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      storeAccessToken(token)
      console.log("getting ingo")
      getUserInfo.fire(token)
    }
  }, [])
  return <>{children}</>
}
