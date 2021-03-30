import { Product } from '@entities/Product'
import { MongoProductRepository } from '@repositories/MongoProductRepository'
import { ICreateProductDTO } from './CreateProductDTO'

export class CreateProductUseCase {
  constructor (
    private mongoProductsRepository: MongoProductRepository
  ) {}

  async execute (product: ICreateProductDTO) {
    const finalProduct = new Product(product)

    const result = await this.mongoProductsRepository.save(finalProduct)

    return result
  }
}
