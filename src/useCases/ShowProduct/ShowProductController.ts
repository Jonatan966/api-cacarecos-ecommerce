import { Request, Response } from 'express'
import { AppError, errorList } from 'src/utils/errorHandler'
import { ShowProductUseCase } from './ShowProductUseCase'

export class ShowProductController {
  constructor (
    private showProductUseCase: ShowProductUseCase
  ) {}

  async handle (request: Request, response: Response) {
    const { id } = request.params

    const product = await this.showProductUseCase.execute({
      id: String(id)
    })

    if (!product) {
      throw new AppError(errorList.ITEM_NAO_ENCONTRADO)
    }
    return response.json(product)
  }
}
