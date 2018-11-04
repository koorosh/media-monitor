import { computed, observable } from 'mobx'
import { configureAxios } from '../core/request'
import Authenticate from '../core/chrome-plugin-api/authentificate'

class AuthContext {

  constructor() {
    this.authentificate()
  }

  @observable isLoggedIn: boolean

  authentificate(): void {
    Authenticate.getToken()
      .then((token: string) => {
        this.isLoggedIn = !!token
        if (!!token) {
          configureAxios(token);
        }
      })
  }
}

export default new AuthContext()
