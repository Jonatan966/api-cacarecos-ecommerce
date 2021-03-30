import { MongoProductRepository } from '@repositories/MongoProductRepository'
import { AppError, errorList } from 'src/utils/errorHandler'
import { omitJSONFields } from 'src/utils/omitJSONFields'
import slugCreator from 'src/utils/slugCreator'
import { IUpdateProductRequestDTO } from './UpdateProductDTO'

export class UpdateProductUseCase {
  constructor (
    private mongoProductsRepository: MongoProductRepository
  ) {}

  async execute (data: IUpdateProductRequestDTO) {
    const product = await this.mongoProductsRepository.findById(data.id)

    if (product) {
      if (data.slug) {
        data.slug = slugCreator(data.slug)
      }

      const newProduct = {
        ...product,
        ...omitJSONFields(data, 'id', '_id', 'created_at', 'updated_at'),
        updated_at: Date.now()
      }

      await this.mongoProductsRepository.update(newProduct)

      return omitJSONFields(newProduct, '_id')
    }

    throw new AppError(errorList.ITEM_NAO_ENCONTRADO)
  }
}