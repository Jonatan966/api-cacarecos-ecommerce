import { Request, Response } from 'express'
import { ShowCategoryUseCase } from './ShowCategoryUseCase'

export class ShowCategoryController {
  constructor (
    private showCategoryUseCase: ShowCategoryUseCase
  ) {}

  async handle (request: Request, response: Response) {
    const { id } = request.params

    try {
      const category = await this.showCategoryUseCase.execute({
        id: String(id)
      })

      if (!category) {
        throw new Error('Category not found')
      }
      return response.json(category)
    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
  }
}
