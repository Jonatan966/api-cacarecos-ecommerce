import { Category } from '../../entities/Category'
import { MongoCategoryRepository } from '../../repositories/MongoCategoryRepository'
import { ICreateCategoryRequestDTO } from './CreateCategoryDTO'

export class CreateCategoryUseCase {
  constructor (
    private mongoCategoryRepository: MongoCategoryRepository
  ) {}

  async execute (data: ICreateCategoryRequestDTO) {
    const newCategory = new Category(data)
    const savedCategory = await this.mongoCategoryRepository.save(newCategory)

    return savedCategory
  }
}
