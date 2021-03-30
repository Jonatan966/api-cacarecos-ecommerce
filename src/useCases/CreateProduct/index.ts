import { mongoProductRepository } from '@repositories/index'
import { CreateProductController } from './CreateProductController'
import { CreateProductUseCase } from './CreateProductUseCase'

export const createProductUseCase = new CreateProductUseCase(
  mongoProductRepository
)

export const createProductController = new CreateProductController(
  createProductUseCase
)
