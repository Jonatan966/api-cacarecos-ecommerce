import { isValidObjectId } from "mongoose";
import {Response, Request, Router} from 'express';

import Category from "../../src/schema/Category";
import errorList from "../../src/utils/errorList";
import { INewRequest } from "../../src/utils/interfaces";
import { parsePaginator, parseQueryParams, parseRoute } from "../../src/utils/parsers";
import authMiddleware from "../../src/middlewares/AuthMiddleware";


async function showCategory(req: Request, res: Response) {
  const fieldDelimiter = parseQueryParams(req.query, Object.keys(Category.schema.paths));
  const categoryId = req.params.categoryId;

  if (isValidObjectId(categoryId)) {
    const result = await Category.findOne({_id: categoryId}, fieldDelimiter, 
      parsePaginator(req.query.page, req.query.max_results)
    );
    return res.status(200).json(result);
  }

  return res.status(400).json(errorList.ID_INVALIDO);
}

async function editCategory(req: INewRequest, res: Response) {
  const [{name}, categoryId] = [req.body, req.query.categoryId];

  if (name) {
    const result = await Category.updateOne({_id: categoryId}, {$set: {name}});
    return res.status(200).json(result);
  }

  return res.status(400).json(errorList.CAMPOS_FALTANDO);
}

const routes = Router();

routes.route(parseRoute(__filename))
.get(showCategory)
.post(authMiddleware(true), editCategory);

export default routes;
