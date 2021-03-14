import { Router } from 'express'
import authMiddleware from './middlewares/AuthMiddleware'
import { authenticateUserController } from './useCases/AuthenticateUser'
import { createCategoryController } from './useCases/CreateCategory'
import { createUserController } from './useCases/CreateUser'
import { deleteCategoryController } from './useCases/DeleteCategory'
import { listCategoriesController } from './useCases/ListCategories'
import { showCategoryController } from './useCases/ShowCategory'

const routes = Router()

routes.route('/categories')
  .get((request, response) =>
    listCategoriesController.handle(request, response)
  )
  .post(authMiddleware(), (request, response) =>
    createCategoryController.handle(request, response)
  )

routes.route('/categories/:id')
  .get((request, response) =>
    showCategoryController.handle(request, response)
  )
  .delete(authMiddleware(), (request, response) =>
    deleteCategoryController.handle(request, response)
  )

routes.route('/users')
  .post((request, response) =>
    createUserController.handle(request, response)
  )

routes.post('/users/auth', (request, response) =>
  authenticateUserController.handle(request, response)
)

export { routes }
