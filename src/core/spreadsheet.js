import { Endpoint } from "./endpoint";
import {Storage} from "./storage";

export class Spreadsheet {
  static create(item, callback) {
    const {title, categories, isActive} = item;

    return Endpoint.createSpreadsheet(title).then(({data}) => {
      const item = {
        spreadsheetId: data.spreadsheetId,
        title: data.properties.title,
        sheetId: data.sheets && data.sheets.length > 0 ?
          data.sheets[0].properties.sheetId : 0,
        categories
      };

      Storage.updateItem(item.spreadsheetId, item, () => {
        Storage.setActiveStatus(item.spreadsheetId, isActive, callback)
      })
    });
  }

  static getAll(callback) {
    Storage.getData((items) => callback(Object.values(items)));
  }

  static setActive(spreadsheetId, callback) {
    Storage.setActiveStatus(spreadsheetId, true, callback);
  }
}
