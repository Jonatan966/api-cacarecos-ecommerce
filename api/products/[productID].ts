import {Response, Request, Router} from 'express';
import { isValidObjectId } from "mongoose";
import slugCreator from '../../src/utils/slugCreator';

import authMiddleware from "../../src/middlewares/AuthMiddleware";
import Product from "../../src/schema/Product";
import errorList from "../../src/utils/errorList";
import { INewRequest } from "../../src/utils/interfaces";
import { parsePaginator, parseQueryParams, parseRoute } from "../../src/utils/parsers";
import ProductImageUploader from "../../src/utils/productImageUploader";


async function showProduct(req: Request, res: Response) {
  const productID = req.params.productID;
  const fieldDelimiter = parseQueryParams(req.query, Object.keys(Product.schema.paths));

  if (productID) {
    let product = await Product.findOne({slug: productID}, fieldDelimiter, 
      parsePaginator(req.query.page, req.query.max_results)
    ).populate('category') as any;

    if (product && product.slug) {
      product = (await ProductImageUploader.addImagesToProductsQuery([product]))[0];
    }
    
    return res.status(200).json(product);
  }

  return res.status(400).json(errorList.ID_INVALIDO);
}

async function deleteProduct(req: INewRequest, res: Response) {
  const productID = req.params.productID;

  if (isValidObjectId(productID)) {
    const product = await Product.findByIdAndRemove(productID);

    if (product) {
      return res.status(200).json(null);
    }
  }

  return res.status(400).json(errorList.ID_INVALIDO);
}

async function editProduct(req: INewRequest, res: Response) {
  const productID = req.params.productID;

  if (isValidObjectId(productID)) {
    const entries = Object.keys(req.body);
    const updates = {} as any;

    for (let i = 0; i < entries.length; i++) {
      if (entries[i] === 'slug') {
        updates['slug'] = slugCreator(`${Object.values(req.body)[i]}`);
        continue;
      }
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

const routes = Router();

routes.route(parseRoute(__filename))
.get(showProduct)
.put(authMiddleware(true), editProduct)
.delete(authMiddleware(true), deleteProduct);

export default routes;
