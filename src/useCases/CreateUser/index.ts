import { mongoUsersRepository } from '../../repositories'
import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'

const createUserUseCase = new CreateUserUseCase(
  mongoUsersRepository
)

const createUserController = new CreateUserController(
  createUserUseCase
)

export { createUserUseCase, createUserController }
