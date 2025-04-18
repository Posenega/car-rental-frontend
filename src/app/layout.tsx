"use client"
import { Roboto } from "next/font/google"
import "./globals.css"
import { UserContext, UserProvider } from "../context/userContext"
import { useContext, useEffect, useState } from "react"
import { UserContextType } from "@/model/user"
import { useApiStatus } from "@/hooks/useApiStatus"
import { CarRentalApi } from "@/api/Api"
import { BranchProvider } from "@/context/branchContext"

import Header from "../components/header"
import Footer from "../components/footer"
import { CarProvider } from "@/context/carContext"
import { OrderProvider } from "@/context/orderContext"
import { ReviewProvider } from "@/context/reviewContext"

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
  const [path, setPath] = useState("")
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    let path = window.location.pathname
    setPath(path)
    if (
      path.includes("cars") ||
      path.includes("about") ||
      path === "/"
    ) {
      setIsDark(true)
    }
  }, [])
  return (
    <html lang="en">
      <UserProvider>
        <BranchProvider>
          <CarProvider>
            <OrderProvider>
              <ReviewProvider>
                <AuthLayer>
                  {path.includes("auth") ||
                    path.includes("admin") || <Header />}
                  <body className={`${roboto.variable}`}>
                    {children}
                  </body>
                  {path.includes("auth") ||
                    path.includes("admin") || <Footer />}
                </AuthLayer>
              </ReviewProvider>
            </OrderProvider>
          </CarProvider>
        </BranchProvider>
      </UserProvider>
    </html>
  )
}

function AuthLayer({ children }: { children: React.ReactNode }) {
  const { storeAccessToken, storeUser, setAccess } = useContext(
    UserContext
  ) as UserContextType

  const getUserInfo = useApiStatus({
    api: CarRentalApi.user.getUserInfo,
    onSuccess({ result }) {
      if (window.location.pathname.includes("auth")) {
        window.location.pathname = "/"
      }
      setAccess("LOGGED_IN")
      storeUser(result.user)
    },
    onFail({ message }) {
      if (message === "jwt expired") {
        refreshToken.fire()
        setAccess("WAIT")
      } else {
        setAccess("WAIT")
      }
    },
  })
  const refreshToken = useApiStatus({
    api: CarRentalApi.user.refreshToken,
    onSuccess({ result }) {
      storeAccessToken(result.accessToken)
      getUserInfo.fire(result.accessToken)
    },
    onFail({ message }) {
      CarRentalApi.user.signout()
      storeAccessToken("")
      console.log(message)
      setAccess("SIGNED_OUT")
    },
  })

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      storeAccessToken(token)
      getUserInfo.fire(token)
      return
    } else {
      refreshToken.fire()
    }
  }, [])
  return <>{children}</>
}
