import { NowRequest, NowResponse } from "@vercel/node";

import authMiddleware from "../../src/middlewares/AuthMiddleware";
import DbMiddleware from "../../src/middlewares/DbMiddleware";
import { INewRequest } from "../../src/utils/interfaces";
import Category from '../../src/schema/Category';

async function showAllCategories(req: NowRequest, res: NowResponse) {
  const result = await Category.find().exec();

  return res.status(200).json(result);
}

async function addCategory(req: INewRequest, res: NowResponse) {
  const {name} = req.body;

  if (req.user.admin) {
    const item = await Category.create({
      name, 
      color: [Math.ceil(Math.random() * 360), 100, 86]
    });
  
    return res.status(201).json(item);  
  }

  return res.status(401).json(null);
}

export default DbMiddleware(async (req, res) => {
  switch(req.method) {
    case 'GET':
      return await showAllCategories(req, res);
    case 'POST':
      return await authMiddleware(req, res, addCategory);
    default:
      return res.status(401).json(null);
  }
});