import {Request} from "./request";

const API_KEY = 'AIzaSyCh4KU1aTpx9fl2TRVjxtn8aM3o1n_xFYs';

const endpoints = {
  spreadsheet: 'https://sheets.googleapis.com/v4/spreadsheets'
};

export const Endpoint = {
  createSpreadsheet: (title) => {

    const body = {
      properties: {
        title: title
      }
    };

    const config = {
      params: {
        key: API_KEY,
        fields: 'properties/title,sheets/properties/sheetId,spreadsheetId'
      }
    };

    return Request.post(endpoints.spreadsheet, body, config);
  }
};
