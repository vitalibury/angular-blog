export interface User {
  email: string
  password: string,
  returnSecureToken?: boolean
}
export interface fbAuthResponse {
  idToken: string,
  expiresIn: string
}
