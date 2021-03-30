import { Request, Response } from 'express'
import { UpdateProductUseCase } from './UpdateProductUseCase'

export class UpdateProductController {
  constructor (
    private updateProductUseCase: UpdateProductUseCase
  ) {}

  async handle (request: Request, response: Response) {
    const { id } = request.params

    const newProduct = await this.updateProductUseCase.execute({
      ...request.body,
      id
    })

    return response.json(newProduct)
  }
}
