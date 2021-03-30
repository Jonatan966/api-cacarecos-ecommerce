import { Request, Response } from 'express'
import { AppError, errorList } from 'src/utils/errorHandler'
import { CreateProductUseCase } from './CreateProductUseCase'

export class CreateProductController {
  constructor (
    private createProductUseCase: CreateProductUseCase
  ) {}

  async handle (request: Request, response: Response) {
    const { name, slug, description, category, price, units } = request.body

    if (name && slug && description && category && price && units) {
      const product = await this.createProductUseCase.execute({
        name,
        slug,
        description,
        category,
        price,
        units
      })

      return response.status(201).json(product)
    }

    throw new AppError(errorList.CAMPOS_FALTANDO)
  }
}
