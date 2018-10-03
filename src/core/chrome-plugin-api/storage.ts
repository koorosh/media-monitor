import { forOwn } from 'lodash'
import { isChromePluginContext } from './helpers'

const storage = {
  updateItemByKey: (key: string, data: any) => {
    return new Promise((resolve, reject) => {
      if (isChromePluginContext()) {
        reject('Application runs out of Chrome Plugin context. Cannot authentificate.')
      }
      const items = {
        [key]: data
      }
      window.chrome.storage.local.set(items, () => resolve());
    })
  },
  updateAll: (data) => {
    return new Promise((resolve, reject) => {
      if (isChromePluginContext()) {
        reject('Application runs out of Chrome Plugin context. Cannot authentificate.')
      }
      window.chrome.storage.local.set(data, () => resolve());
    })
  },
  setActiveStatus: (spreadsheetId: string, status=true) => {
    return this.getData()
      .then(items => {
        if (items[spreadsheetId] && items[spreadsheetId].isActive === status) {
          return Promise.resolve();
        }

        forOwn(items, (value, key) => {
          items[key].isActive = items[key].spreadsheetId === spreadsheetId
        })

        return this.updateAll(items)
      })
      .then(() => true)
  },
  getData: () => {
    return new Promise((resolve, reject) => {
      window.chrome.storage.local.get(null, (items) => {
        if(window.chrome.runtime.lastError) {
          reject(new Error('Could not get data from storage.'))
        }
        resolve(items)
      });
    })
  },
  clearAll: () => {
    return new Promise((resolve) => {
      window.chrome.storage.local.clear(() => resolve());
    })
  }
}

export default storage
