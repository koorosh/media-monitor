import { Endpoint } from "./endpoint";
import Storage from "./chrome-plugin-api/storage";
import { Category } from '../models'

const spreadsheet = {
  create: (item: {title: string, categories: Category[]}): Promise<any> => {
    const {title, categories} = item;

    return Endpoint.createSpreadsheet(title)
      .then((data) => {
        const model: any = {
          spreadsheetId: data.spreadsheetId,
          title: data.properties.title,
          sheetId: data.sheets && data.sheets.length > 0 ?
            data.sheets[0].properties.sheetId : 0,
          categories
        };
        const headers = ['Date', 'Site', ...categories.map(c => c.name)];

        return spreadsheet.addRow([headers], data.spreadsheetId)
          .then(() => ({
            spreadsheetId: model.spreadsheetId,
            sheetId: model.sheetId
          }))
      });
  },
  addRow: (data: string[][], spreadsheetId: string) => {
    return Endpoint.appendRow(data, spreadsheetId);
  }
}

export default spreadsheet
