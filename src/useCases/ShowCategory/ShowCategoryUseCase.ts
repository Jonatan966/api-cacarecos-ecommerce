import { AppError, errorList } from 'src/utils/errorHandler'
import { MongoCategoryRepository } from '../../repositories/MongoCategoryRepository'
import { IShowCategoryRequestDTO } from './ShowCategoryDTO'

export class ShowCategoryUseCase {
  constructor (
    private mongoCategoryRepository: MongoCategoryRepository
  ) {}

  async execute (data: IShowCategoryRequestDTO) {
    const category = await this.mongoCategoryRepository.findById(data.id)

    if (!category) {
      throw new AppError(errorList.ITEM_NAO_ENCONTRADO)
    }

    return category
  }
}
