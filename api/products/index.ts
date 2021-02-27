import {Response, Request, Router} from 'express';
import { isValidObjectId } from "mongoose";
import connectToFirestore from "../../src/connectors/FirestoreConnector";

import authMiddleware from "../../src/middlewares/AuthMiddleware";
import Product from "../../src/schema/Product";
import { INewRequest } from "../../src/utils/interfaces";
import { parseMultipartForm, parsePaginator, parseQueryParams, parseRoute, parseSearchFilter } from "../../src/utils/parsers";
import ProductImageUploader from "../../src/utils/productImageUploader";


async function getAllProducts(req: Request, res: Response) {
  let newQuery = parseQueryParams(req.query, Object.keys(Product.schema.paths));
  let newFilter = parseSearchFilter(req.query, ['name', 'description', 'category'], ['category']);

  let products = await Product.find(newFilter, newQuery, 
    parsePaginator(req.query.page, req.query.max_results)
  ).populate('category');

  products = await ProductImageUploader.addImagesToProductsQuery(products);

  return res.status(200).json(products);
}

async function addProduct(req: INewRequest, res: Response) {
  //const {body, files, error} = await parseMultipartForm(req, 'images') as {body: any, files: File[], error?: Error};
  //if (!error && body && files) {
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

      if (result._id) {
        // const prd = new ProductImageUploader(String(result._id), await connectToFirestore());
        // const imageUploadErrors = await prd.uploadImages(files);

        // if (!imageUploadErrors.length) {
          return res.status(201).end();
        // }
        // return res.status(400).json({upload_errors: imageUploadErrors});
      }

      return res.status(500).json({error: 'NÃO FOI POSSÍVEL CONCLUIR O CADASTRO'});
    }
  //}

  return res.status(400).json({error: 'HÁ CAMPOS FALTANDO'});
}

const routes = Router();

routes.route(parseRoute(__dirname))
.get(getAllProducts)
.post(authMiddleware(true), addProduct);

export default routes;