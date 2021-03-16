import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  constructor (
    private createUserUseCase: CreateUserUseCase
  ) {}

  async handle (request: Request, response: Response) {
    let { name, email, password } = request.body

    if (name && email && password) {
      password = await bcrypt.hash(password, 7)

      const result = await this.createUserUseCase.execute({
        name,
        email,
        password
      })

      return response.status(201).json(result)
    }

    return response.status(400).json({ error: 'there are fields missing' })
  }
}
