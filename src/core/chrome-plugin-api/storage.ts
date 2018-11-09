import { forOwn, omit } from 'lodash-es'
import { isChromePluginContext } from './helpers'
import { Project } from '../../models'

export interface StorageData {
  [key: string]: Project
}

const storage = {
  updateItemByKey: (key: string, data: Project): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!isChromePluginContext()) {
        reject('Application runs out of Chrome Plugin context. Cannot authentificate.')
      }
      const items = {
        [key]: data
      }
      window.chrome.storage.local.set(items, () => resolve());
    })
  },
  updateAll: (data: StorageData): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!isChromePluginContext()) {
        reject('Application runs out of Chrome Plugin context. Cannot authentificate.')
      }
      window.chrome.storage.local.set(data, () => resolve());
    })
  },
  setActiveStatus: (projectId: string, status=true) => {
    return storage.getData()
      .then((items: StorageData) => {
        if (items[projectId] && items[projectId].isActive === status) {
          return Promise.resolve();
        }

        forOwn(items, (value, key) => {
          items[key].isActive = items[key].id === projectId
        })

        return storage.updateAll(items)
      })
      .then(() => true)
  },
  getData: (): Promise<StorageData> => {
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
  },
  removeByKey: (key): Promise<any> => {
    return storage.getData()
      .then(data =>
        storage.clearAll()
          .then(() => storage.updateAll(omit(data, [key])))
      )
  }
}

export default storage
