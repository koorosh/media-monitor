import { Item } from './item'
import { Option } from './option'

export class Category extends Item {
  constructor(
    public name: string,
    public options: Option[] = []) {
    super()
  }
}
