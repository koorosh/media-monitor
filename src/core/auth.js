import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/bindCallback';

export const Auth = {
  /***
   * Returns token if user is logged in or null if not
   * @returns {Observable<string>}
   */
  getToken: () => {
    const getAuthToken = Observable.bindCallback(chrome.identity.getAuthToken);
    return getAuthToken({ 'interactive': true });
  },
  /***
   * Returns True if user is logged in
   * @returns {Observable<bool>}
   */
  isLoggedIn: () => {
    return this.getToken().map(token => !!token);
  },
  /***
   * Returns two args: AccountInfo and signedIn
   * @returns {Observable<Object, bool>}
   */
  onSignInChanged: () => {
    return Observable.fromEvent(chrome.identity.onSignInChanged);
  }
};
