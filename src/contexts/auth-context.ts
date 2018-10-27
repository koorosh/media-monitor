import { computed, observable } from 'mobx'
import { Auth } from '../core/auth'

class AuthContext {

  constructor() {
    this.authentificate()
  }

  @observable isLoggedIn: boolean

  authentificate(): void {
    Auth.getToken((token: string) => {
      this.isLoggedIn = !!token
    })
  }
}

export default new AuthContext()
