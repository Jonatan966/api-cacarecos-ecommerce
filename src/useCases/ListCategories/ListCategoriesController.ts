import { Request, Response } from 'express'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'

export class ListCategoriesController {
  constructor (
    private listCategoriesUseCase: ListCategoriesUseCase
  ) {}

  async handle (_request: Request, response: Response) {
    const categories = await this.listCategoriesUseCase.execute()

    return response.json(categories)
  }
}