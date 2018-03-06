export class Storage {
  static updateItem(projectName, data, callback = () => {}) {
    let items = {};
    items[projectName] = data;
    window.chrome.storage.sync.set(items, callback);
  }
  static updateAll(data, callback = () => {}) {
    window.chrome.storage.sync.set(data, callback);
  }
  static setActiveStatus(spreadsheetId, status=true, callback = () => {}) {
    this.getData((items) => {

      if (items[spreadsheetId] && items[spreadsheetId].isActive === status) {
        callback();
        return;
      }

      for (let key in items) {
        if (items.hasOwnProperty(key)) {
          items[key].isActive = items[key].spreadsheetId === spreadsheetId
        }
      }

      this.updateAll(items, callback)
    })
  }
  static getData(callback) {
    window.chrome.storage.sync.get(null, function (items) {
      callback(window.chrome.runtime.lastError ? null : items)
    });
  }
}