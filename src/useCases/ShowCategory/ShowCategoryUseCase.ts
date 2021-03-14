import { MongoCategoryRepository } from '../../repositories/MongoCategoryRepository'
import { IShowCategoryRequestDTO } from './ShowCategoryDTO'

export class ShowCategoryUseCase {
  constructor (
    private mongoCategoryRepository: MongoCategoryRepository
  ) {}

  async execute (data: IShowCategoryRequestDTO) {
    const category = await this.mongoCategoryRepository.findById(data.id)

    if (!category) {
      throw new Error('Category not found')
    }

    return category
  }
}
