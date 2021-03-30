import { Product } from '@entities/Product'
import { Collection, Db } from 'mongodb'
import { AppError, errorList } from 'src/utils/errorHandler'
import { omitJSONFields } from 'src/utils/omitJSONFields'

export class MongoProductRepository {
  private productsCollection : Collection<Product>;

  constructor (
    mongoConnector: Promise<Db>
  ) {
    mongoConnector.then(value => {
      this.productsCollection = value.collection<Product>('products')
    })
  }

  async index () {
    const products = await this.productsCollection.find({}, { projection: { _id: 0 } }).toArray()

    return products
  }

  async findById (productId: string) {
    const product = await this.productsCollection.findOne({ id: productId })

    return product
  }

  async findBySlug (productSlug: string) {
    const product = await this.productsCollection.findOne({ slug: productSlug })

    return product
  }

  async save (product: Product) {
    const alreadyExists = await this.findBySlug(product.slug)

    if (!alreadyExists) {
      const resultInfo = await this.productsCollection.insertOne(product)

      if (resultInfo.insertedCount) {
        return omitJSONFields<Product>(resultInfo.ops[0], '_id')
      }

      throw new AppError(errorList.OPERACAO_NAO_EXECUTADA, 500)
    }

    throw new AppError(errorList.ITEM_JA_CADASTRADO)
  }

  async delete (productId: string) {
    const product = await this.findById(productId)

    if (product) {
      const result = await this.productsCollection.deleteOne({ id: product.id })

      if (result.deletedCount) {
        return true
      }

      throw new AppError(errorList.OPERACAO_NAO_EXECUTADA, 500)
    }

    throw new AppError(errorList.ITEM_NAO_ENCONTRADO)
  }

  async update (product: Product) {
    const alreadyExists = await this.findById(product.id)

    if (!alreadyExists) {
      throw new AppError(errorList.ITEM_NAO_ENCONTRADO)
    }

    if (alreadyExists.slug !== product.slug) {
      const slugAlreadyExists = await this.findBySlug(product.slug)

      if (slugAlreadyExists) {
        throw new AppError({
          error: {
            code: -1,
            message: 'JÁ EXISTE UM CADASTRO COM ESSE SLUG'
          }
        })
      }
    }

    const updateResult = await this.productsCollection.updateOne(
      { id: alreadyExists.id }, { $set: omitJSONFields(product, 'id', 'created_at') }
    )

    return !!updateResult.result.ok
  }
}
