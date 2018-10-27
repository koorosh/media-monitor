import { fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'
import { isChromePluginContext } from './helpers'

let retryCount = 0

const Authenticate = {
  getToken: () => {
    return new Promise(((resolve, reject) => {
      if(!isChromePluginContext()) {
        reject('Application runs out of Chrome Plugin context. Cannot authentificate.')
      }

      window.chrome.identity.getAuthToken({ interactive: true }, (token) => {
        if (!window.chrome.runtime.lastError) {
          if(retryCount < 2) {
            retryCount++
            Authenticate.removeCachedToken(token)
              .then(() => Authenticate.getToken())
              .then(t => {
                retryCount = 0
                resolve(t)
              })
              .catch(error => reject(error))
          } else {
            retryCount = 0
            reject(new Error('Cannot authenticate'))
          }
        }
        retryCount = 0
        resolve(token)
      });

    }))
  },
  isLoggedIn: () => {
    return this.getToken()
      .then(token => !!token)
      .catch(_ => false)
  },
  onSignInChanged: () => {
    return new Promise((resolve) => {
      window.chrome.identity.onSignInChanged.addListener((account: any, signedIn: boolean) => {
        resolve(signedIn)
      })
    })
  },
  removeCachedToken: (token) => {
    return new Promise((resolve => {
      window.chrome.identity.removeCachedAuthToken({ token }, () => resolve())
    }))

  }
}

export default Authenticate
