import {Response, Request} from 'express';
import { isValidObjectId } from "mongoose";

import adminMiddleware from "../../src/middlewares/AdminMiddleware";
import DbMiddleware from "../../src/middlewares/DbMiddleware";
import Product from "../../src/schema/Product";
import { INewRequest } from "../../src/utils/interfaces";
import { parsePaginator, parseQueryParams } from "../../src/utils/parsers";
import ProductImageUploader from "../../src/utils/productImageUploader";

async function showProduct(req: Request, res: Response) {
  const productID = req.params.productID;
  const fieldDelimiter = parseQueryParams(req.query, Object.keys(Product.schema.paths));

  if (isValidObjectId(productID)) {
    let product = await Product.findOne({_id: productID}, fieldDelimiter, 
      parsePaginator(req.query.page, req.query.max_results)
    ).populate('category');

    if (product._id) {
      product = (await ProductImageUploader.addImagesToProductsQuery([product]))[0];
    }
    
    return res.status(200).json(product);
  }

  return res.status(400).json({error: 'ITEM NÃO ENCONTRADO'});
}

async function deleteProduct(req: INewRequest, res: Response) {
  const productID = req.query.productID;

  if (isValidObjectId(productID)) {
    const product = await Product.findByIdAndRemove(productID);

    if (product) {
      return res.status(200).json(null);
    }
  }

  return res.status(400).json({error: 'ITEM NÃO ENCONTRADO'});
}

async function editProduct(req: INewRequest, res: Response) {
  const productID = req.query.productID;

  if (isValidObjectId(productID)) {
    const entries = Object.keys(req.body);
    const updates = {} as any;

    for (let i = 0; i < entries.length; i++) {
      updates[entries[i]] = Object.values(req.body)[i];
    }

    const result = await Product.updateOne({_id: productID}, {$set: updates});

    if (result.ok) {
      return res.status(200).json(null);
    }

    return res.status(500).json({error: 'OCORREU UM ERRO AO TENTAR EXECUTAR ESSA OPERAÇÃO'});
  }

  return res.status(400).json({error: 'ID INVÁLIDO'});
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
      return res.status(401).json(null);
  }
});