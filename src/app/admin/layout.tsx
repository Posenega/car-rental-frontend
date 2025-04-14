"use client"
import { UserContext } from "@/context/userContext"
import { UserContextType } from "@/model/user"
import React, { useContext, useEffect, useState } from "react"
import style from "./style.module.scss"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useContext(UserContext) as UserContextType
  const [lock, setLock] = useState<boolean>(true)
  useEffect(() => {
    if (user.isAdmin) {
      setLock(false)
    } else {
      setLock(true)
    }
  })
  return (
    <main className={style.main}>
      {lock ? (
        <>{/* TODO: Render something instead of nothing */}</>
      ) : (
        children
      )}
    </main>
  )
}
