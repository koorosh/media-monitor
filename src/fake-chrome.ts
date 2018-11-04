if (!window.chrome) {
  window.chrome = {}
}

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

  window.chrome.storage = {
    sync: {
      get,
      set,
    },
    local: {
      get,
      set,
      clear: () => {}
    }
  }
}

if (!window.chrome.runtime) {
  window.chrome.runtime = { lastError: null };
}

if (!window.chrome.tabs) {
  window.chrome.tabs = {
    id: 'qwerty',
    title: 'Tab title',
    url: 'www.tab-url.com/qwerty'
  };
}

export default window.chrome
