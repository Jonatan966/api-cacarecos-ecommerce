import { Request, Response } from 'express'
import { ListProductsUseCase } from './ListProductsUseCase'

export class ListProductsController {
  constructor (
    private listProductsUseCase: ListProductsUseCase
  ) {}

  async handle (request: Request, response: Response) {
    return response.json(await this.listProductsUseCase.execute())
  }
}
