import { NowRequest, NowResponse } from "@vercel/node";
import { isValidObjectId } from "mongoose";
import connectToFirestore from "../../src/connectors/FirestoreConnector";

import adminMiddleware from "../../src/middlewares/AdminMiddleware";
import DbMiddleware from "../../src/middlewares/DbMiddleware";
import Product from "../../src/schema/Product";
import { INewRequest } from "../../src/utils/interfaces";
import { parseMultipartForm, parsePaginator, parseQueryParams, parseSearchFilter } from "../../src/utils/parsers";
import ProductImageUploader from "../../src/utils/productImageUploader";


async function getAllProducts(req: NowRequest, res: NowResponse) {
  let newQuery = parseQueryParams(req.query, Object.keys(Product.schema.paths));
  let newFilter = parseSearchFilter(req.query, ['name', 'description', 'category'], ['category']);

  let products = await Product.find(newFilter, newQuery, 
    parsePaginator(req.query.page, req.query.max_results)
  ).populate('category');

  products = await ProductImageUploader.addImagesToProductsQuery(products);

  return res.status(200).json(products);
}

async function addProduct(req: INewRequest, res: NowResponse) {
  const {body, files, error} = await parseMultipartForm(req, 'images') as {body: any, files: File[], error?: Error};

  if (!error && body && files) {
    const {name, description, category, price, units} = body;

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
        const prd = new ProductImageUploader(String(result._id), await connectToFirestore());
        const imageUploadErrors = await prd.uploadImages(files);

        if (!imageUploadErrors.length) {
          return res.status(201).end();
        }
        return res.status(400).json({upload_errors: imageUploadErrors});
      }

      return res.status(500).json({error: 'NÃO FOI POSSÍVEL CONCLUIR O CADASTRO'});
    }
  }

  return res.status(400).json({error: 'HÁ CAMPOS FALTANDO'});
}

export default DbMiddleware(async (req, res) => {
  switch(req.method) {
    case 'GET':
      return await getAllProducts(req, res);

    case 'POST':
      return await adminMiddleware(req, res, addProduct);

    default:
      return res.status(401).json(null);
  }
});