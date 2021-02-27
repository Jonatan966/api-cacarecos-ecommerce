import { Response, Router } from 'express';
import { parseRoute } from '../../../src/utils/parsers';
import authMiddleware from "../../../src/middlewares/AuthMiddleware";
import { Order, OrderProducts, Product } from "../../../src/schema";
import { INewRequest } from "../../../src/utils/interfaces";


async function showAllPurchases(req: INewRequest, res: Response) {
  let orders = await Order.find({user_id: req.user._id}, {user_id: 0});
  let order_products = await OrderProducts.find({order_id: {$in: orders.map(item => item._id)}});

  const final = orders.map(item => {
    const result = order_products.filter((pItem: any) => {
      return String(pItem.order_id) === String(item._id)
    });
    return {...item.toJSON(), products: result};
  });

  return res.status(200).json(final);
}

async function checkProductUnits(localList: any[], dbList: any[]) {
  const validator = dbList.map((item, x) => localList[x].units <= item.units);
  return validator.every(item => item);
}

async function checkout(req: INewRequest, res: Response) {
  const {reqProducts} = req.body;

  if (reqProducts.length) {
    const products = await Product.find({_id: {$in: reqProducts.map((item: any) => item.product_id)}});

    if (reqProducts.length === products.length) {
      if (await checkProductUnits(reqProducts, products)) {
        const order = await Order.create({user_id: req.user._id, timestamp: Date.now(), status: 0});
        if (order) {
          const order_products = await OrderProducts.insertMany(products.map((item, x) => {
            return {
              product_id: item._id, 
              units: reqProducts[x].units, 
              order_id: order._id
            } as any;
          }));
          console.log(order_products);
          return res.status(201).json({order_id: order._id});
        }
      }

      return res.status(400).json({error: 'UNIDADES INSUFICIENTES'});
    }

    return res.status(400).json({error: 'UM OU MAIS PRODUTOS INEXISTENTES'});
  }

  return res.status(400).json({error: 'HÁ PRODUTOS FALTANDO'});
}

const routes = Router();

routes.route(parseRoute(__filename))
.get(authMiddleware(), showAllPurchases)
.post(authMiddleware(), checkout);

export default routes;