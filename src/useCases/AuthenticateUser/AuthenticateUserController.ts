import { Request, Response } from 'express'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {
  constructor (
    private authenticateUserUseCase: AuthenticateUserUseCase
  ) {}

  async handle (request: Request, response: Response) {
    const { email, password } = request.body

    const result = await this.authenticateUserUseCase.execute({
      email, password
    })

    return response.send(result)
  }
}
