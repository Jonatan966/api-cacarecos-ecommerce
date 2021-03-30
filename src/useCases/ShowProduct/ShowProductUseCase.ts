import { AppError, errorList } from 'src/utils/errorHandler'
import { MongoProductRepository } from '../../repositories/MongoProductRepository'
import { IShowProductRequestDTO } from './ShowProductDTO'

export class ShowProductUseCase {
  constructor (
    private mongoProductRepository: MongoProductRepository
  ) {}

  async execute (data: IShowProductRequestDTO) {
    const product = await this.mongoProductRepository.findById(data.id)

    if (!product) {
      throw new AppError(errorList.ITEM_NAO_ENCONTRADO)
    }

    return product
  }
}
