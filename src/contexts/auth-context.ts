import { computed, observable } from 'mobx'
import { configureAxios } from '../core/request'
import Authenticate from '../core/chrome-plugin-api/authentificate'

class AuthContext {

  constructor() {
    this.authentificate(false)
  }

  @observable isLoggedIn: boolean

  authentificate(interactive: boolean = true): void {
    Authenticate.getToken(interactive)
      .then((token: string) => {
        this.isLoggedIn = !!token
        if (!!token) {
          configureAxios(token);
        }
      },
        (error) => console.warn(error)
      )
  }
}

export default new AuthContext()
