import {Response, Router} from 'express';
import { parseRoute } from '../../../src/utils/parsers';
import authMiddleware from "../../../src/middlewares/AuthMiddleware";
import { Order, OrderProducts } from "../../../src/schema";
import { INewRequest } from "../../../src/utils/interfaces";


async function showPurchase(req: INewRequest, res: Response) {
    let order = await Order.findOne({_id: req.query.purchaseID, user_id: req.user._id}, {user_id: 0});
    let order_products = await OrderProducts.find({order_id: order._id}, {order_id: 0});
    
    order = {...order.toJSON(), products: order_products} as any;
  
    return res.status(200).json(order);
}

async function cancelOrder(req: INewRequest, res: Response) {
    const order = await Order.findOne({_id: req.query.purchaseID, status: {$eq: [0,1]}});
    
    if(order) {
        const result = await order.updateOne({status: 3});
        
        return res.status(200).json(result);
    }

    return res.status(400).json({error: 'PEDIDO NÃO ENCONTRADO'});
}

async function finishOrder(req: INewRequest, res: Response) {
    const order = await Order.findOne({_id: req.query.purchaseID, status: {$eq: [0,1]}});
    
    if(order) {
        const result = await order.updateOne({status: 2});
        
        return res.status(200).json(result);
    }

    return res.status(400).json({error: 'PEDIDO NÃO ENCONTRADO'});
}

const routes = Router();

routes.route(parseRoute(__filename))
.get(authMiddleware(), showPurchase)
.put(authMiddleware(), cancelOrder)
.post(authMiddleware(), finishOrder);

export default routes;