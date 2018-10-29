import {Request} from "./request";

const API_KEY = 'AIzaSyCh4KU1aTpx9fl2TRVjxtn8aM3o1n_xFYs';

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
  appendRow: (data: string[][], spreadsheetId: string, range: string = 'A1') => {
    // TODO: specify A1:E1 to exactly insert row with 6 columns. it will fix random insertion of rows
    const body = {
      values: data,
      majorDimension: 'ROWS'
    };

    const config = {
      params: {
        key: API_KEY,
        valueInputOption: 'USER_ENTERED',
        includeValuesInResponse: 'false',
        insertDataOption: 'INSERT_ROWS',
        alt: 'json'
      }
    };

    return Request.post(endpoints.getValuesAppendUrl(spreadsheetId, range), body, config);
  }
};
