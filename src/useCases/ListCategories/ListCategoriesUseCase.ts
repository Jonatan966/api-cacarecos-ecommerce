import { MongoCategoryRepository } from '../../repositories/MongoCategoryRepository'

export class ListCategoriesUseCase {
  constructor (
    private mongoCategoryRepository: MongoCategoryRepository
  ) {}

  async execute () {
    const categories = await this.mongoCategoryRepository.index()
    return categories
  }
}
