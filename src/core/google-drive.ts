import {Request} from "./request";

const API_KEY = 'AIzaSyCh4KU1aTpx9fl2TRVjxtn8aM3o1n_xFYs';

const endpoints = {
  driveFiles: `https://www.googleapis.com/drive/v3/files`,
  listFiles: `https://content.googleapis.com/drive/v3/files`,
  updateFile: `https://www.googleapis.com/drive/v3/files`
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
      .then((data: any) => data.id);
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
        fields: 'files/id'
      },
      q: `name = "${dirName}" and trashed = false and mimeType = "application/vnd.google-apps.folder"`
    };

    return Request.get(endpoints.listFiles, config)
      .then((data: any) => {
        return data.files
      })
  }

  static existsDir(dirName): Promise<string> {
    return GoogleDrive.listDirs(dirName)
      .then((files: any) => {
        if (files && files.length > 0) {
          return files[0].id
        }
        else {
          return undefined
        }
      })
  }
}
