import { Router } from 'express'
import authMiddleware from './middlewares/AuthMiddleware'
import { authenticateUserController } from './useCases/AuthenticateUser'
import { createCategoryController } from './useCases/CreateCategory'
import { createProductController } from './useCases/CreateProduct'
import { createUserController } from './useCases/CreateUser'
import { deleteCategoryController } from './useCases/DeleteCategory'
import { deleteProductController } from './useCases/DeleteProduct'
import { listCategoriesController } from './useCases/ListCategories'
import { listProductsController } from './useCases/ListProducts'
import { showCategoryController } from './useCases/ShowCategory'
import { showProductController } from './useCases/ShowProduct'
import { updateProductController } from './useCases/UpdateProduct'
import { AppError } from './utils/errorHandler'

const routes = Router()

routes.route('/categories')
  .get((request, response) =>
    AppError.errorCatcher(async (req, res) =>
      await listCategoriesController.handle(req, res)
    , request, response)
  )
  .post(authMiddleware(), (request, response) =>
    AppError.errorCatcher(async (req, res) =>
      await createCategoryController.handle(req, res)
    , request, response)
  )

routes.route('/categories/:id')
  .get((request, response) =>
    AppError.errorCatcher(async (req, res) =>
      await showCategoryController.handle(req, res)
    , request, response)
  )
  .delete(authMiddleware(), (request, response) =>
    AppError.errorCatcher(async (req, res) =>
      await deleteCategoryController.handle(req, res)
    , request, response)
  )

routes.route('/users')
  .post((request, response) =>
    AppError.errorCatcher(async (req, res) =>
      await createUserController.handle(req, res)
    , request, response)
  )

routes.post('/users/auth', (request, response) =>
  AppError.errorCatcher(async (req, res) =>
    await authenticateUserController.handle(req, res)
  , request, response)
)

routes.route('/products')
  .get((request, response) =>
    AppError.errorCatcher(async (req, res) =>
      await listProductsController.handle(req, res)
    , request, response)
  )
  .post((request, response) =>
    AppError.errorCatcher(async (req, res) =>
      await createProductController.handle(req, res)
    , request, response)
  )

routes.route('/products/:id')
  .delete((request, response) =>
    AppError.errorCatcher(async (req, res) =>
      await deleteProductController.handle(req, res)
    , request, response)
  )
  .put((request, response) =>
    AppError.errorCatcher(async (req, res) =>
      await updateProductController.handle(req, res)
    , request, response)
  )
  .get((request, response) =>
    AppError.errorCatcher(async (req, res) =>
      await showProductController.handle(req, res)
    , request, response)
  )

export { routes }
