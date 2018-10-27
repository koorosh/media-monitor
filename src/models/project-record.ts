import { Category } from './category'

export class ProjectRecord {
  id: string
  name: string
  spreadsheetId: string
  sheetId: string
  categories: Category[]
  isActive: boolean
}
