import { mongoProductRepository } from '../../repositories'
import { DeleteProductController } from './DeleteProductController'
import { DeleteProductUseCase } from './DeleteProductUseCase'

const deleteProductUseCase = new DeleteProductUseCase(
  mongoProductRepository
)

const deleteProductController = new DeleteProductController(
  deleteProductUseCase
)

export { deleteProductUseCase, deleteProductController }
