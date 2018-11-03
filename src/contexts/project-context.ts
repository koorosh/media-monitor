import { computed, observable } from 'mobx'
import { Category, Project } from '../models'
import storage, { StorageData } from '../core/chrome-plugin-api/storage'
import { GoogleDrive } from '../core/google-drive'
import config from '../config'
import spreadsheet from '../core/spreadsheet'

class ProjectContext {

  constructor() {
    this.queryProjects()
  }

  @observable projects: Project[] = []

  @computed get activeProject(): Project {
    return this.projects.find(project => project.isActive)
  }

  queryProjects() {
    storage.getData()
      .then((data: StorageData) => {
        this.projects = Object.values(data).map(Project.fromSheetRecord)
      })
  }

  createProject(project: Project): Promise<boolean> {
    project.categories = Category.applySortIndex(project.categories)
    return GoogleDrive.existsDir(config.projectDirName)
      .then((existingDirId: string) => {
        if (!existingDirId) {
          return GoogleDrive.createDir(config.projectDirName)
        }
        return Promise.resolve(existingDirId)
      })
      .then((directoryId: string) => {
        const spreadsheetPayload = {
          title: project.name,
          categories: project.categories
        }
        return spreadsheet.create(spreadsheetPayload)
          .then(({ spreadsheetId, sheetId }) => {
            project.spreadsheetId = spreadsheetId
            project.sheetId = sheetId
            project.parentDirId = directoryId

            return GoogleDrive.moveFile(project.spreadsheetId, project.parentDirId)
              .then(() => {
                return storage.updateItemByKey(project.id, project)
                  .then(() => {
                    return storage.setActiveStatus(project.id)
                  })
                  .then(() => {
                    this.projects.push(project)
                    return true
                  },
                  (error: Error) => {
                    console.log(error)
                    return false
                  })
              })
          })
      })
  }

  updateProject(project: Project): Promise<any> {
    project.categories = Category.applySortIndex(project.categories)
    return storage.updateItemByKey(project.id, project)
      .then(() => {
        const projectPosition = this.projects.findIndex(p => p.id === project.id)
        this.projects[projectPosition] = project
      })
  }

  removeProject(project: Project) {
    storage.removeByKey(project.id)
      .then(() => {
        this.projects = this.projects.filter(p => p.id !== project.id)
      })
  }

  setActiveProject(projecId: string) {
    return storage.setActiveStatus(projecId)
      .then(() => this.queryProjects())
  }
}

export default new ProjectContext()
