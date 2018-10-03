import {Request} from "./request";

const API_KEY = 'AIzaSyCh4KU1aTpx9fl2TRVjxtn8aM3o1n_xFYs';

const endpoints = {
  driveFiles: `https://www.googleapis.com/upload/drive/v3/files`,
  listFiles: `https://content.googleapis.com/drive/v3/files`,
  updateFile: `https://content.googleapis.com/drive/v3/files`,
  getValuesAppendUrl: (spreadsheetId, range) => `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append`
};

export class GoogleDrive {

  static createDir(dirName) {
    const body = {
      mimeType: "application/vnd.google-apps.folder",
      name: dirName,
      folderColorRgb: "#499AD8"
    };

    const config = {
      params: {
        key: API_KEY,
        alt: 'json'
      }
    };

    return Request.post(endpoints.driveFiles, body, config)
      .then((resp: any) => resp.id);
  }

  static moveFile(fileId, targetDirId, currentParentId='root') {
    const config = {
      params: {
        key: API_KEY,
        alt: 'json',
        addParents: targetDirId,
        removeParents: currentParentId
      }
    };
    return Request.patch(`${endpoints.updateFile}/${fileId}`, undefined, config);
  }

  static listDirs(dirName) {
    const config = {
      params: {
        key: API_KEY,
        q: `name = "${dirName}" and trashed = false`,
        fields: 'files/id'
      }
    };

    return Request.get(endpoints.listFiles, config)
  }

  static existsDir(dirName) {
    return GoogleDrive.listDirs(dirName)
      .then((response: any) => response.files && response.files.length > 0)
  }
}
