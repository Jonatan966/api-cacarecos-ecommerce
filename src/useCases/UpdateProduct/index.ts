import { mongoProductRepository } from '@repositories/index'
import { UpdateProductController } from './UpdateProductController'
import { UpdateProductUseCase } from './UpdateProductUseCase'

export const updateProductUseCase = new UpdateProductUseCase(
  mongoProductRepository
)

export const updateProductController = new UpdateProductController(
  updateProductUseCase
)
