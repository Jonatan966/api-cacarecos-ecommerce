import { mongoCategoryRepository } from '../../repositories'
import { CreateCategoryController } from './CreateCategoryController'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

const createCategoryUseCase = new CreateCategoryUseCase(
  mongoCategoryRepository
)

const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
)

export { createCategoryUseCase, createCategoryController }
