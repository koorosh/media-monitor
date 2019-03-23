import { Endpoint } from "./endpoint";
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
        const headers = ['Сайт', ...categories.map(c => c.name)];

        return spreadsheet.addHeader([headers], data.spreadsheetId)
          .then(({ spreadsheetRange }) => ({
            spreadsheetId: model.spreadsheetId,
            sheetId: model.sheetId,
            spreadsheetRange
          }))
      });
  },
  addRow: (data: string[][], spreadsheetId: string, range?: string) => {
    return Endpoint.appendRow(data, spreadsheetId, range);
  },
  addHeader: (data: string[][], spreadsheetId: string): Promise<any> => {
    return Endpoint.appendRow(data, spreadsheetId, undefined, 'updates.updatedRange')
      .then((data) => {
        const regex = /[a-z]/ig;
        const { updates } = data
        const { updatedRange } = updates // "'Sheet1'!A6:B6"
        const columnsRange = updatedRange
          .substring(updatedRange.indexOf('!') + 1)
          .match(regex)
          .join(':')
        return {
          spreadsheetRange: columnsRange
        }
      })
  }
}

export default spreadsheet
