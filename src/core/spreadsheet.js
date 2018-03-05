import { Endpoint } from "./endpoint";

export const Spreadsheet = {
  create: (title) => {
    return Endpoint.createSpreadsheet(title);
  }
};
