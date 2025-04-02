export class User {
  _id: string
  userName: string
  email: string
  constructor(user: {
    _id: string
    userName: string
    email: string
  }) {
    this._id = user._id
    this.userName = user.userName
    this.email = user.email
  }
}

export type UserContextType = {
  user: User | null
  accessToken: string | null
  storeAccessToken: (token: string) => void
  storeUser: (user: User) => void
  login: (user: User, token: string) => void
  signout: () => void
}
