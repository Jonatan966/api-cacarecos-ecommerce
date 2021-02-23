import { NowRequest, NowResponse } from "@vercel/node";
import { isValidObjectId } from "mongoose";

import adminMiddleware from "../../src/middlewares/AdminMiddleware";
import DbMiddleware from "../../src/middlewares/DbMiddleware";
import Product from "../../src/schema/Product";
import errorList from "../../src/utils/errorList";
import { INewRequest } from "../../src/utils/interfaces";
import { parsePaginator, parseQueryParams } from "../../src/utils/parsers";

async function showProduct(req: NowRequest, res: NowResponse) {
  const productID = req.query.productID;
  const fieldDelimiter = parseQueryParams(req.query, Object.keys(Product.schema.paths));

  if (isValidObjectId(productID)) {
    const product = await Product.findOne({_id: productID}, fieldDelimiter, 
      parsePaginator(req.query.page, req.query.max_results)
    ).populate('category');
    
    return res.status(200).json(product);
  }

  return res.status(400).json(errorList.ID_INVALIDO);
}

async function deleteProduct(req: INewRequest, res: NowResponse) {
  const productID = req.query.productID;

  if (isValidObjectId(productID)) {
    const product = await Product.findByIdAndRemove(productID);

    if (product) {
      return res.status(200).json(null);
    }
  }

  return res.status(400).json(errorList.ID_INVALIDO);
}

async function editProduct(req: INewRequest, res: NowResponse) {
  const productID = req.query.productID;

  if (isValidObjectId(productID)) {
    const entries = Object.keys(req.body);
    const updates = {};

    for (let i = 0; i < entries.length; i++) {
      updates[entries[i]] = Object.values(req.body)[i];
    }

    const result = await Product.updateOne({_id: productID}, {$set: updates});

    if (result.ok) {
      return res.status(200).json(null);
    }

    return res.status(500).json(errorList.OPERACAO_NAO_EXECUTADA);
  }

  return res.status(400).json(errorList.ID_INVALIDO);
}

export default DbMiddleware(async (req, res) => {
  switch(req.method) {
    case 'GET':
      return await showProduct(req, res);
    case 'PUT':
      return await adminMiddleware(req, res, editProduct);
    case 'DELETE':
      return await adminMiddleware(req, res, deleteProduct);     
    default:
      return res.status(401).json(errorList.PERMISSAO_NEGADA);
  }
});