import { computed, observable } from 'mobx'
import { Option, Project, ProjectRecord } from '../models'
import ProjectContext from './project-context'

export type SaveRecord = {
  [categoryId: string]: Option[]
}

class MainContext {
  @computed get projects(): Project[] {
    return ProjectContext.projects
  }

  @computed get activeProject(): Project {
    return this.projects.find(project => project.isActive)
  }

  saveRecord(record: SaveRecord[]) {

  }
}

export default new MainContext()
