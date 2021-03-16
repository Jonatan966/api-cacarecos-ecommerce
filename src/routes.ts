import { Router } from 'express'
import authMiddleware from './middlewares/AuthMiddleware'
import { authenticateUserController } from './useCases/AuthenticateUser'
import { createCategoryController } from './useCases/CreateCategory'
import { createUserController } from './useCases/CreateUser'
import { deleteCategoryController } from './useCases/DeleteCategory'
import { listCategoriesController } from './useCases/ListCategories'
import { showCategoryController } from './useCases/ShowCategory'
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

export { routes }
