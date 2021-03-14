import { MongoCategoryRepository } from '../../repositories/MongoCategoryRepository'
import { IDeleteategoryRequestDTO } from './DeleteCategoryDTO'

export class DeleteCategoryUseCase {
  constructor (
    private mongoCategoryRepository: MongoCategoryRepository
  ) {}

  async execute (data: IDeleteategoryRequestDTO) {
    const category = await this.mongoCategoryRepository.findById(data.id)

    if (!category) {
      throw new Error('Category not found')
    }

    return (await this.mongoCategoryRepository.delete(data.id))
  }
}
