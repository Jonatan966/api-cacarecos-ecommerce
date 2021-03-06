import {Response, Request, Router} from 'express';
import slugCreator from '../../src/utils/slugCreator';

import authMiddleware from "../../src/middlewares/AuthMiddleware";
import Product from "../../src/schema/Product";
import errorList from "../../src/utils/errorList";
import { INewRequest } from "../../src/utils/interfaces";
import { parsePaginator, parseQueryParams, parseRoute } from "../../src/utils/parsers";
import ProductImageUploader from "../../src/utils/productImageUploader";
import connectToFirestore from '../../src/connectors/FirestoreConnector';
import uploader from '../../src/utils/uploader';


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

  if (productID) {
    const product = await Product.findOneAndDelete({slug: productID});

    if (product) {
      const firestoreProvider = new ProductImageUploader(product._id, await connectToFirestore());
      const deleteErrors = await firestoreProvider.removeAllImages();

      return res.status(200).json({undeletedImages: deleteErrors});
    }
  }

  return res.status(400).json(errorList.ID_INVALIDO);
}

async function editProduct(req: INewRequest, res: Response) {
  const productID = req.params.productID;

  if (productID) {
    const entries = Object.keys(req.body);
    const updates = {} as any;

    for (let i = 0; i < entries.length; i++) {
      if (entries[i] === 'slug') {
        updates['slug'] = slugCreator(`${Object.values(req.body)[i]}`);
        continue;
      }
      updates[entries[i]] = Object.values(req.body)[i];
    }

    const result = await Product.findOneAndUpdate({slug: productID}, {$set: updates});
    
    if (result) {
      const firestoreProvider = new ProductImageUploader(result._id, await connectToFirestore());
      console.log(req.files);
      const deleteErrors = await firestoreProvider.removeImages(req.body.deletedImages ?? []);
      const uploadErrors = await firestoreProvider.uploadImages(req.files as any[] ?? []);

      return res.status(200).json({undeletedImages: deleteErrors, uploadErrors});
    }

    return res.status(500).json(errorList.OPERACAO_NAO_EXECUTADA);
  }

  return res.status(400).json(errorList.ID_INVALIDO);
}

const routes = Router();

routes.route(parseRoute(__filename))
.get(showProduct)
.put(authMiddleware(true), uploader.array('images[]', 4), editProduct)
.delete(authMiddleware(true), deleteProduct);

export default routes;
