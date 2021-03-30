import { Request, Response } from 'express'
import { DeleteProductUseCase } from './DeleteProductUseCase'

export class DeleteProductController {
  constructor (
    private deleteProductUseCase: DeleteProductUseCase
  ) {}

  async handle (request: Request, response: Response) {
    const { id } = request.params

    await this.deleteProductUseCase.execute({ id })
    return response.send()
  }
}
