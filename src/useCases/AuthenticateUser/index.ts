import { mongoUsersRepository } from '@repositories/index'
import { AuthenticateUserController } from './AuthenticateUserController'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

const authenticateUserUseCase = new AuthenticateUserUseCase(
  mongoUsersRepository
)

const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
)

export { authenticateUserUseCase, authenticateUserController }
