import { computed, observable } from 'mobx'
import { Auth } from '../core/auth'
import { configureAxios } from '../core/request'

class AuthContext {

  constructor() {
    this.authentificate()
  }

  @observable isLoggedIn: boolean

  authentificate(): void {
    Auth.getToken((token: string) => {
      this.isLoggedIn = !!token
      if (!!token) {
        configureAxios(token);
      }
    })
  }
}

export default new AuthContext()
