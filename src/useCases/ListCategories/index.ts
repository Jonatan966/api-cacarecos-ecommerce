import { mongoCategoryRepository } from '../../repositories'
import { ListCategoriesController } from './ListCategoriesController'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

const listCategoriesUseCase = new ListCategoriesUseCase(
  mongoCategoryRepository
)

const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
)

export { listCategoriesUseCase, listCategoriesController }
