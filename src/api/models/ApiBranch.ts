import { Branch, MapLocation } from "@/model/branch"

export interface BranchParams {
  location: string
  branchName: string
  phoneNumber: string
  openingHours: string
  url: string
  mapLocation: MapLocation
}

export interface BranchesReponse {
  message: string
  data: Branch[]
}
