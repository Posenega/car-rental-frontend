"use client"
import { UserContext } from "@/context/userContext"
import { UserContextType } from "@/model/user"
import React, { useContext, useEffect, useState } from "react"

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
    <div>
      {lock ? (
        <>{/* TODO: Render something instead of nothing */}</>
      ) : (
        children
      )}
    </div>
  )
}
