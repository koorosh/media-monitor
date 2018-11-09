import { create } from 'lodash-es'

import { Category } from './category'
import { Item } from './item'

export class Project extends Item {
  parentDirId: string
  spreadsheetId: string
  sheetId: string
  spreadsheetRange: string

  constructor(
    public name: string = 'Новий проект',
    public categories: Category[] = [],
    public isActive: boolean = false) {
    super()
  }

  static fromSheetRecord(record: any) {
    return create(new Project(record.name, record.categories), record)
  }
}
