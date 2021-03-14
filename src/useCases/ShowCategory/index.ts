import { mongoCategoryRepository } from '../../repositories'
import { ShowCategoryController } from './ShowCategoryController'
import { ShowCategoryUseCase } from './ShowCategoryUseCase'

const showCategoriyUseCase = new ShowCategoryUseCase(
  mongoCategoryRepository
)

const showCategoryController = new ShowCategoryController(
  showCategoriyUseCase
)

export { showCategoriyUseCase, showCategoryController }
