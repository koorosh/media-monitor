import { Endpoint } from "./endpoint";
import Storage from "./chrome-plugin-api/storage";

export default {
  create: (item) => {
    const {title, categories, isActive} = item;

    return Endpoint.createSpreadsheet(title).then(({data}) => {
      const model = {
        spreadsheetId: data.spreadsheetId,
        title: data.properties.title,
        sheetId: data.sheets && data.sheets.length > 0 ?
          data.sheets[0].properties.sheetId : 0,
        categories
      };
      const headers = ['Date', 'Site', ...categories.map(c => c.name)];

      return this.addRow([headers], data.spreadsheetId)
        .then(() => Storage.updateItemByKey(model.spreadsheetId, model))
        .then(() => Storage.setActiveStatus(model.spreadsheetId, isActive))
    });
  },
  getAll: () => {
    return Storage.getData()
      .then((items) => Object.values(items))
  },
  setActive: (spreadsheetId) => {
    return Storage.setActiveStatus(spreadsheetId, true)
  },
  addRow: (data, spreadsheetId) => {
    return Endpoint.appendRow(data, spreadsheetId);
  }
}
