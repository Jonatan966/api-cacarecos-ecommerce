import { mongoCategoryRepository } from '../../repositories'
import { ShowCategoryController } from './ShowCategoryController'
import { ShowCategoryUseCase } from './ShowCategoryUseCase'

const showCategoryUseCase = new ShowCategoryUseCase(
  mongoCategoryRepository
)

const showCategoryController = new ShowCategoryController(
  showCategoryUseCase
)

export { showCategoryUseCase, showCategoryController }
