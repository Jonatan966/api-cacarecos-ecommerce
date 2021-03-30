import slugCreator from 'src/utils/slugCreator'
import { v4 as uuid } from 'uuid'

export interface IProduct {
  id?: string;
  name?: string;
  slug?: string;
  description?: string;
  category?: string;
  price?: number;
  units?: number;
  created_at?: number;
}

export class Product {
  public readonly id: string;

  public name: string;
  public slug: string;
  public description: string;
  public category: string;
  public price: number;
  public units: number;
  public created_at?: number;
  public updated_at?: number;

  constructor (props: Omit<Product, 'id'>, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = uuid()
      this.slug = slugCreator(props.slug)
      this.created_at = Date.now()
      this.updated_at = Date.now()
    }
  }
}
