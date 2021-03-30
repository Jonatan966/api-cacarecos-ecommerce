import { MongoProductRepository } from '@repositories/MongoProductRepository'

export class ListProductsUseCase {
  constructor (
    private mongoProductsRepository: MongoProductRepository
  ) { }

  async execute () {
    const products = await this.mongoProductsRepository.index()

    return products
  }
}
