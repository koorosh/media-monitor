import { v4 as uuidv4 } from 'uuid';

export class Item {
  constructor() {
    this.id = uuidv4()
  }
  id: string
}
