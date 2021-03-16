import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AppError, errorList } from 'src/utils/errorHandler'

import { MongoUsersRepository } from '../../repositories/MongoUsersRepository'
import { IAuthenticateUserRequestDTO } from './AuthenticateUserDTO'

export class AuthenticateUserUseCase {
  constructor (
    private mongoUsersRepository: MongoUsersRepository
  ) {}

  async execute (data: IAuthenticateUserRequestDTO) {
    if (data.email && data.password) {
      const user = await this.mongoUsersRepository.findByEmail(data.email)

      if (await bcrypt.compare(data.password, user.password)) {
        const token = jwt.sign({
          id: user.id,
          admin: !!user.admin
        }, process.env.JWT_SECRET, { expiresIn: '3d' })

        return { token, admin: !!user.admin }
      }
    }
    throw new AppError(errorList.CAMPOS_FALTANDO)
  }
}
