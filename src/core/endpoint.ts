import {Request} from "./request";

const API_KEY = process.env.GOOGLE_API_KEY;

const endpoints = {
  spreadsheet: 'https://sheets.googleapis.com/v4/spreadsheets',
  getValuesAppendUrl: (spreadsheetId, range) => `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append`
};

export const Endpoint = {
  createSpreadsheet: (title) => {
    const body = {
      properties: {
        title: title,
        locale: 'uk_UA'
      }
    };

    const config = {
      params: {
        key: API_KEY,
        fields: 'properties/title,sheets/properties/sheetId,spreadsheetId'
      }
    };

    return Request.post(endpoints.spreadsheet, body, config);
  },
  appendRow: (data: string[][], spreadsheetId: string, range: string = 'A1', returnFields: string = '') => {
    // TODO: specify A1:E1 to exactly insert row with 6 columns. it will fix random insertion of rows
    const body = {
      values: data,
      majorDimension: 'ROWS'
    };

    const config = {
      params: {
        range: 'A1',
        includeValuesInResponse: 'false',
        key: API_KEY,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        alt: 'json'
      }
    };

    return Request.post(endpoints.getValuesAppendUrl(spreadsheetId, range), body, config);
  }
};
