import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/bindCallback';
import 'rxjs/add/observable/of';

export const Auth = {
  /***
   * Returns token if user is logged in or null if not
   * @returns {Observable<string>}
   */
  getToken: (callback) => {
    //const getAuthToken = Observable.bindCallback(window.chrome.identity.getAuthToken);
    //return getAuthToken({ 'interactive': true });
    window.chrome.identity.getAuthToken({ 'interactive': true }, (token) => {
      if (!window.chrome.runtime.lastError) {
        window.chrome.identity.removeCachedAuthToken({ token: token }, () => Auth.getToken(callback))
      }
      callback(token)
    })
  },
  /***
   * Returns True if user is logged in
   * @returns {Observable<bool>}
   */
  isLoggedIn: (callback) => {
    this.getToken((token) => callback(!!token));
  },
  /***
   * Returns two args: AccountInfo and signedIn
   * @returns {Observable<Object, bool>}
   */
  onSignInChanged: (callback) => {
    window.chrome.identity.onSignInChanged.addListener(callback);
  }
};
