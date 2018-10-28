import { Category } from './category'
import { Item } from './item'
import { ProjectRecord } from './project-record'

export class Project extends Item {
  parentDirId: string
  spreadsheetId: string
  sheetId: string

  constructor(
    public name: string = 'New Project',
    public categories: Category[] = [],
    public isActive: boolean = false) {
    super()
  }

  static fromSheetRecord(record: ProjectRecord) {
    const project = new Project(record.name, record.categories)
    project.id = record.id
    project.isActive = record.isActive
    return project
  }
}
