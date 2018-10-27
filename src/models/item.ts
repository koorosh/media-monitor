export class Item {
  constructor() {
    this.id = new Date().getTime().toString()
  }
  id: string
}
