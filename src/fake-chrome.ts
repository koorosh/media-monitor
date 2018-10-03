if (!window.chrome.identity) {
  const callbacks = [];
  let isSignedIn = false;

  window.chrome.identity = {
    getAuthToken: (details, callback) => {
      isSignedIn = true;
      callbacks.forEach((cb) => cb({}, isSignedIn));
      callback('FAKE_USER_TOKEN');
    },
    removeCachedAuthToken: (details, callback) => {
      callback();
    },
    onSignInChanged: {
      addListener: (callback) => {
        callbacks.push(callback);
      }
    }
  };
}

if (!window.chrome.storage) {
  let storage = {};

  const set = (items, callback) => {
    storage = Object.create({}, items);
    callback(storage);
  };

  const get = (key, callback) => {
    if (key) {
      callback(storage[key]);
    } else {
      callback(storage);
    }
  };

  // window.chrome.storage = {
  //   sync: {
  //     set,
  //     get,
  //     clear: () => {/**/}
  //   }
  // };
}

if (!window.chrome.runtime) {
  window.chrome.runtime = { lastError: null };
}

export default window.chrome
