import { Endpoint } from "./endpoint";
import Storage from "./chrome-plugin-api/storage";
import { Category } from '../models'

export default {
  create: (item: {title: string, categories: Category[], isActive: boolean}) => {
    const {title, categories, isActive} = item;

    return Endpoint.createSpreadsheet(title)
      .then(({data}) => {
        const model: any = {
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
  addRow: (data: string[][], spreadsheetId: string) => {
    return Endpoint.appendRow(data, spreadsheetId);
  }
}
