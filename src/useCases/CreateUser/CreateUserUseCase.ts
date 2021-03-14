import { User } from '../../entities/User'
import { MongoUsersRepository } from '../../repositories/MongoUsersRepository'
import { ICreateUserRequestDTO } from './CreateUserDTO'

export class CreateUserUseCase {
  constructor (
    private mongoUsersRepository: MongoUsersRepository
  ) {}

  async execute (data: ICreateUserRequestDTO) {
    const user = new User(data)

    const result = (await this.mongoUsersRepository.save(user))

    return result
  }
}
