
class AuthContext {

  isLoggedIn: boolean

  authentificate(): Promise<boolean> {
    return Promise.resolve(false)
  }
}

export default AuthContext
