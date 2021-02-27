import {Response, Request, Router} from 'express';

import authMiddleware from "../../src/middlewares/AuthMiddleware";
import { INewRequest } from "../../src/utils/interfaces";
import Category from '../../src/schema/Category';
import { parsePaginator, parseQueryParams, parseRoute, parseSearchFilter } from "../../src/utils/parsers";


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

  const item = await Category.create({
    name, 
    color: [Math.ceil(Math.random() * 360), 100, 86]
  });

  return res.status(201).json(item);  
}

const routes = Router();

routes.route(parseRoute(__dirname))
.get(showAllCategories)
.post(authMiddleware, addCategory);

export default routes;
