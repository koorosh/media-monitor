import { computed, observable } from 'mobx'
import { Project } from '../models'
import storage, { StorageData } from '../core/chrome-plugin-api/storage'
import { ProjectRecord } from '../models/project-record'

class ProjectContext {

  constructor() {
    this.queryProjects()
  }

  @observable projects: Project[]

  @computed get activeProject(): Project {
    return this.projects.find(project => project.isActive)
  }

  queryProjects() {
    storage.getData()
      .then((data: StorageData) => {
        this.projects = Object.values(data).map(Project.fromSheetRecord)
      })
  }

  saveProject(project: Project): Promise<boolean> {
    return storage.updateItemByKey(project.id, project)
      .then(() => {
        this.projects.push(project)
        return true
      },
        (error: Error) => {
          console.log(error)
          return false
        })
  }

  updateProject(project: Project): Promise<any> {
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
}

export default new ProjectContext()
