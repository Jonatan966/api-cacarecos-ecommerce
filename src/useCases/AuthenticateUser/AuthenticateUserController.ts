import { Request, Response } from 'express'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {
  constructor (
    private authenticateUserUseCase: AuthenticateUserUseCase
  ) {}

  async handle (request: Request, response: Response) {
    try {
      const { email, password } = request.body

      const result = await this.authenticateUserUseCase.execute({
        email, password
      })

      return response.send(result)
    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
  }
}
