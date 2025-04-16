export class User {
  _id: string
  userName: string
  email: string
  isAdmin: Boolean
  points: number
  image: string
  constructor(user: {
    _id: string
    userName: string
    email: string
    isAdmin: Boolean
    points: number
    image: string
  }) {
    this._id = user._id
    this.userName = user.userName
    this.email = user.email
    this.isAdmin = user.isAdmin
    this.points = user.points
    this.image = user.image
  }
}

export type UserContextType = {
  user: User
  accessToken: string | null
  storeAccessToken: (token: string) => void
  storeUser: (user: User) => void
  login: (user: User, token: string) => void
  signout: () => void
  access: string
  setAccess: (access: string) => void
}
