import { v4 as uuid } from 'uuid'

export class Category {
  public readonly id: string;

  public _id?: any;
  public name: string;
  public color?: number[];

  constructor (props: Omit<Category, 'id'>, id?: string) {
    Object.assign(props)

    if (!id) {
      this.id = uuid()
      this.color = [Math.ceil(Math.random() * 360), 100, 86]
    }
  }
}
