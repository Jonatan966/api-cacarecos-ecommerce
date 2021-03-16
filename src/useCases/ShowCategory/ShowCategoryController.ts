import { Request, Response } from 'express'
import { AppError, errorList } from 'src/utils/errorHandler'
import { ShowCategoryUseCase } from './ShowCategoryUseCase'

export class ShowCategoryController {
  constructor (
    private showCategoryUseCase: ShowCategoryUseCase
  ) {}

  async handle (request: Request, response: Response) {
    const { id } = request.params

    const category = await this.showCategoryUseCase.execute({
      id: String(id)
    })

    if (!category) {
      throw new AppError(errorList.ITEM_NAO_ENCONTRADO)
    }
    return response.json(category)
  }
}
