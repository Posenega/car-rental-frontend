"use client"

import { Branch, BranchContextType } from "@/model/branch"
import React from "react"

export const BranchContext =
  React.createContext<BranchContextType | null>(null)

export const BranchProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [branch, setBranch] = React.useState<Branch>({
    _id: "",
    branchName: "",
    location: "",
    phoneNumber: "",
    openingHours: "",
    url: "",
    mapLocation: {
      lat: 0,
      lng: 0,
    },
  })
  const [branches, setBranches] = React.useState<Branch[]>([])

  const storeBranch = (branch: any) => {
    setBranch(branch)
  }
  const storeBranches = (branches: Branch[]) => {
    setBranches(branches)
  }

  const value = {
    branch,
    storeBranch,
    branches,
    storeBranches,
  }

  return (
    <BranchContext.Provider value={value}>
      {children}
    </BranchContext.Provider>
  )
}
