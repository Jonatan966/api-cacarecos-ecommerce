import { NowRequest, NowResponse } from "@vercel/node";
import { isValidObjectId } from "mongoose";

import adminMiddleware from "../../src/middlewares/AdminMiddleware";
import DbMiddleware from "../../src/middlewares/DbMiddleware";
import Product from "../../src/schema/Product";
import errorList from "../../src/utils/errorList";
import { INewRequest } from "../../src/utils/interfaces";
import { parsePaginator, parseQueryParams, parseSearchFilter } from "../../src/utils/parsers";


async function getAllProducts(req: NowRequest, res: NowResponse) {
  try {
    let newQuery = parseQueryParams(req.query, Object.keys(Product.schema.paths));
    let newFilter = parseSearchFilter(req.query, ['name', 'description', 'category'], ['category']);
  
    const products = await Product.find(newFilter, newQuery, 
      parsePaginator(req.query.page, req.query.max_results)
    ).populate('category');
  
    return res.status(200).json(products);  
  }
  catch {
    return res.status(200).json([]);
  }
}

async function addProduct(req: INewRequest, res: NowResponse) {
  const {name, description, category, price, units} = req.body;
  
  if (name && description && isValidObjectId(category) && price && units) {
    const result = await Product.create({
      name, 
      description, 
      category, 
      price, 
      units, 
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    if (result) return res.status(200).json(result);
  }

  return res.status(400).json(errorList.CAMPOS_FALTANDO);  
}

export default DbMiddleware(async (req, res) => {
  switch(req.method) {
    case 'GET':
      return await getAllProducts(req, res);

    case 'POST':
      return await adminMiddleware(req, res, addProduct);

    default:
      return res.status(401).json(errorList.PERMISSAO_NEGADA);
  }
});