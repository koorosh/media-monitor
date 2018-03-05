import {Request} from "./request";

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
        fields: 'properties/title,sheets/properties/sheetId,spreadsheetId'
      }
    };
    return Request.post(endpoints.spreadsheet, body, config);
  }
};
