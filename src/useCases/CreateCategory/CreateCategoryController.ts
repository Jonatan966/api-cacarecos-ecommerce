import { Request, Response } from 'express'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

export class CreateCategoryController {
  constructor (
    private createCategoryUseCase: CreateCategoryUseCase
  ) {}

  async handle (request: Request, response: Response) {
    const { name } = request.body

    try {
      const newCategory = await this.createCategoryUseCase.execute({
        name
      })

      return response.status(200).send({ ...newCategory })
    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
  }
}