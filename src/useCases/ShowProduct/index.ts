import { mongoProductRepository } from '../../repositories'
import { ShowProductController } from './ShowProductController'
import { ShowProductUseCase } from './ShowProductUseCase'

const showProductUseCase = new ShowProductUseCase(
  mongoProductRepository
)

const showProductController = new ShowProductController(
  showProductUseCase
)

export { showProductUseCase, showProductController }
