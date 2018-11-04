import * as uuidv4 from 'uuid/v4'

export class Item {
  constructor() {
    this.id = uuidv4()
  }
  id: string
}
