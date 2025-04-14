export class User {
  _id: string
  userName: string
  email: string
  isAdmin: Boolean
  constructor(user: {
    _id: string
    userName: string
    email: string
    isAdmin: Boolean
  }) {
    this._id = user._id
    this.userName = user.userName
    this.email = user.email
    this.isAdmin = user.isAdmin
  }
}

export type UserContextType = {
  user: User
  accessToken: string | null
  storeAccessToken: (token: string) => void
  storeUser: (user: User) => void
  login: (user: User, token: string) => void
  signout: () => void
}
