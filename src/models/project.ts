import { create } from 'lodash'

import { Category } from './category'
import { Item } from './item'

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

  static fromSheetRecord(record: any) {
    return create(new Project(record.name, record.categories), record)
  }
}
