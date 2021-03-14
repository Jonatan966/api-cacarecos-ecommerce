import { Collection, Db } from 'mongodb'
import { Category } from '../entities/Category'

const antiIdProjection = { projection: { _id: 0 } }

export class MongoCategoryRepository {
  private categoriesCollection: Collection<Category>;

  constructor (
    mongoConnector: Promise<Db>
  ) {
    mongoConnector.then(value => {
      this.categoriesCollection = value.collection<Category>('categories')
    }
    )
  }

  async save (category: Category) {
    const alreadyExists = await this.categoriesCollection.findOne({ name: category.name })

    if (!alreadyExists) {
      const result = await this.categoriesCollection.insertOne(category)

      if (result.insertedCount) {
        return result.ops[0]
      }

      throw new Error("Couldn't save this")
    }

    throw new Error('Category already exists')
  }

  async index () {
    const categories = await this.categoriesCollection.find({}, antiIdProjection).toArray()
    return categories
  }

  async findByName (categoryName: string) {
    const category = await this.categoriesCollection.findOne({ name: categoryName }, antiIdProjection)

    return category
  }

  async findById (categoryId: string) {
    const category = await this.categoriesCollection.findOne({ id: categoryId }, antiIdProjection)

    return category
  }

  async delete (categoryId: string) {
    const category = await this.findById(categoryId)
    const result = await this.categoriesCollection.deleteOne({ id: category.id })

    if (result.deletedCount) {
      return true
    }

    throw new Error('This operation could not be performed')
  }
}
