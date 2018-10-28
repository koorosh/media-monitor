import { create } from 'lodash'
import { Category } from './category'
import { Project } from './project'

export class ProjectRecord {
  id: string
  name: string
  spreadsheetId: string
  sheetId: string
  categories: Category[]
  isActive: boolean

  static fromProject(project: Project, spreadsheetId: string, sheetId: string) {
    const fields = {
      spreadsheetId,
      sheetId,
      id: project.id,
      name: project.name,
      categories: project.categories,
      isActive: project.isActive
    }
    return create(new ProjectRecord(), fields)
  }
}
