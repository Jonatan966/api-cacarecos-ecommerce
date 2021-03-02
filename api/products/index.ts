import {Response, Request, Router} from 'express';
import { isValidObjectId } from "mongoose";
import uploader from '../../src/utils/uploader';
import connectToFirestore from "../../src/connectors/FirestoreConnector";

import authMiddleware from "../../src/middlewares/AuthMiddleware";
import Product from "../../src/schema/Product";
import errorList from "../../src/utils/errorList";
import { INewRequest } from "../../src/utils/interfaces";
import { parsePaginator, parseQueryParams, parseRoute, parseSearchFilter } from "../../src/utils/parsers";
import ProductImageUploader from "../../src/utils/productImageUploader";
import slugCreator from '../../src/utils/slugCreator';


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
  const {name, description, category, price, units, slug} = req.body;

  if (name && description && isValidObjectId(category) && price && units && slug && req.files.length) {
    const result = await Product.create({
      name, 
      slug: slugCreator(slug),
      description, 
      category, 
      price, 
      units, 
      created_at: Date.now(),
      updated_at: Date.now(),
    });  

    if (result._id) {
      const prd = new ProductImageUploader(String(result._id), await connectToFirestore());
      const imageUploadErrors = await prd.uploadImages(req.files as any[]);

      if (!imageUploadErrors.length) {
        return res.status(201).end();
      }
      return res.status(400).json({upload_errors: imageUploadErrors});
    }

    return res.status(500).json({error: 'NÃO FOI POSSÍVEL CONCLUIR O CADASTRO'});
  }

  return res.status(400).json(errorList.CAMPOS_FALTANDO);  
}

const routes = Router();

routes.route(parseRoute(__dirname))
.get(getAllProducts)
.post(authMiddleware(true), uploader.array('images[]', 4), addProduct);

export default routes;
