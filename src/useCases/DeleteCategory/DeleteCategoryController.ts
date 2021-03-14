import { Request, Response } from 'express'
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase'

export class DeleteCategoryController {
  constructor (
    private deleteCategoryUseCase: DeleteCategoryUseCase
  ) {}

  async handle (request: Request, response: Response) {
    const { id } = request.params

    try {
      await this.deleteCategoryUseCase.execute({ id })
      return response.send()
    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
  }
}
