import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Auth} from "./core/auth";
import {configureAxios} from "./core/request";
import {App} from './App';

const root = document.getElementById('root');

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
  }
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
      set,
      get
    }
  }
}

if (!window.chrome.runtime) {
  window.chrome.runtime = { lastError: null }
}

//Auth.getToken((token) => {
  //let toket = "ya29.Glv4BRBohzRMxlLEA5BDrAS4SLu8jkNDeo4SkFj7hd1-mI5_OMgji9DgruX2a5u8YtsRkBJG3lLfn8ALTqxyxdte8cX0bSzN4s8F-pvEugoqrA4868zWUOHTJC6r"
  //configureAxios(token);
  ReactDOM.render(<App/>, root);
//});
