import { mongoCategoryRepository } from '../../repositories'
import { DeleteCategoryController } from './DeleteCategoryController'
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase'

const deleteCategoryUseCase = new DeleteCategoryUseCase(
  mongoCategoryRepository
)

const deleteCategoryController = new DeleteCategoryController(
  deleteCategoryUseCase
)

export { deleteCategoryUseCase, deleteCategoryController }
