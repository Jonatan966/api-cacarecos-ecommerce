import { MongoProductRepository } from '@repositories/MongoProductRepository'
import { IDeleteProductRequestDTO } from './DeleteProductDTO'

export class DeleteProductUseCase {
  constructor (
    private mongoProductsRepository: MongoProductRepository
  ) {}

  async execute (data: IDeleteProductRequestDTO) {
    await this.mongoProductsRepository.delete(data.id)
  }
}
