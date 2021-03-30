import { mongoProductRepository } from '@repositories/index'
import { ListProductsController } from './ListProductsController'
import { ListProductsUseCase } from './ListProductsUseCase'

export const listProductsUseCase = new ListProductsUseCase(
  mongoProductRepository
)

export const listProductsController = new ListProductsController(
  listProductsUseCase
)
