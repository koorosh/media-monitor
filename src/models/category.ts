import { maxBy, map } from 'lodash'
import { Item } from './item'
import { Option } from './option'

export class Category extends Item {
  orderIndex: number

  constructor(
    public name: string,
    public options: Option[] = []) {
    super()
  }

  static applySortIndex(categories: Category[]): Category[] {
    const withoutOrderIndex = categories.filter(c => !c.orderIndex)
    const withOrderIndex = categories.filter(c => !!c.orderIndex)
    const lastCategoryByIndex = maxBy(withOrderIndex, c => c.orderIndex)
    const nextOrderIndex = lastCategoryByIndex ? lastCategoryByIndex.orderIndex + 1 : 0
    return [
      ...withOrderIndex,
      ...map(withoutOrderIndex, (c: Category, idx: number) => {
        c.orderIndex = nextOrderIndex + idx
        return c
      })
    ]
  }
}
