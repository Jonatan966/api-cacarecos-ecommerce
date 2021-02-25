import {Response, Request} from 'express';

import authMiddleware from "../../src/middlewares/AuthMiddleware";
import DbMiddleware from "../../src/middlewares/DbMiddleware";
import { INewRequest } from "../../src/utils/interfaces";
import Category from '../../src/schema/Category';
import { parsePaginator, parseQueryParams, parseSearchFilter } from "../../src/utils/parsers";

async function showAllCategories(req: Request, res: Response) {
  const fieldDelimiter = parseQueryParams(req.query, Object.keys(Category.schema.paths));
  let newFilter = parseSearchFilter(req.query, ['name']);

  const result = await Category.find(newFilter, fieldDelimiter, 
    parsePaginator(req.query.page, req.query.max_results)
  );

  return res.status(200).json(result);
}

async function addCategory(req: INewRequest, res: Response) {
  const {name} = req.body;

  if (req.user.admin) {
    const item = await Category.create({
      name, 
      color: [Math.ceil(Math.random() * 360), 100, 86]
    });
  
    return res.status(201).json(item);  
  }

  return res.status(401).json(null);
}

export default DbMiddleware(async (req, res) => {
  switch(req.method) {
    case 'GET':
      return await showAllCategories(req, res);
    case 'POST':
      return await authMiddleware(req, res, addCategory);
    default:
      return res.status(401).json(null);
  }
});