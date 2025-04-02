export type MapLocation = {
  lat: number
  lng: number
}

export class Branch {
  _id: string
  branchName: string
  location: string
  phoneNumber: string
  openingHours: string
  url: string
  mapLocation: MapLocation
  constructor(user: {
    _id: string
    branchName: string
    location: string
    phoneNumber: string
    openingHours: string
    url: string
    mapLocation: MapLocation
  }) {
    this._id = user._id
    this.branchName = user.branchName
    this.location = user.location
    this.phoneNumber = user.phoneNumber
    this.openingHours = user.openingHours
    this.url = user.url
    this.mapLocation = user.mapLocation
  }
}

export type BranchContextType = {
  branch: Branch
  branches: Branch[]
  storeBranch: (user: Branch) => void
  storeBranches: (branches: Branch[]) => void
}
