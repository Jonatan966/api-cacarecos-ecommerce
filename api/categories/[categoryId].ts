import { isValidObjectId } from "mongoose";
import {Response, Request} from 'express';

import adminMiddleware from "../../src/middlewares/AdminMiddleware";
import DbMiddleware from "../../src/middlewares/DbMiddleware";
import Category from "../../src/schema/Category";
import { INewRequest } from "../../src/utils/interfaces";
import { parsePaginator, parseQueryParams } from "../../src/utils/parsers";

async function showCategory(req: Request, res: Response) {
  const fieldDelimiter = parseQueryParams(req.query, Object.keys(Category.schema.paths));
  const categoryId = req.params.categoryId;

  if (isValidObjectId(categoryId)) {
    const result = await Category.findOne({_id: categoryId}, fieldDelimiter, 
      parsePaginator(req.query.page, req.query.max_results)
    );
    return res.status(200).json(result);
  }

  return res.status(400).json(null);
}

async function editCategory(req: INewRequest, res: Response) {
  const [{name}, categoryId] = [req.body, req.query.categoryId];

  if (name) {
    const result = await Category.updateOne({_id: categoryId}, {$set: {name}});
    return res.status(200).json(result);
  }

  return res.status(400).json(null);
}

export default DbMiddleware(async (req, res) => {
  switch(req.method) {
    case 'GET':
      return await showCategory(req, res);
    case 'POST':
      return await adminMiddleware(req, res, editCategory);
    default:
      return res.status(401).json(null);
  }
});