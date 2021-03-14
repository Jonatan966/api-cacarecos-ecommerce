import { v4 as uuid } from 'uuid'

export class User {
  public readonly id: string;

  public _id?: any;
  public name: string;
  public email: string;
  public password: string;
  public created_at?: number;
  public admin?: boolean;

  constructor (props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = uuid()
      this.created_at = Date.now()
    }
  }
}
