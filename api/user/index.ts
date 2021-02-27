import {Response, Router} from 'express';
import bcrypt from 'bcrypt';

import authMiddleware from "../../src/middlewares/AuthMiddleware";
import User from "../../src/schema/User";
import { INewRequest } from "../../src/utils/interfaces";
import { parseQueryParams, parseRoute } from "../../src/utils/parsers";


async function showUser(req: INewRequest, res: Response) {
  const fieldDelimiter = parseQueryParams(req.query, Object.keys(User.schema.paths));
  const user = await User.findOne(req.user._id, {...fieldDelimiter, password: 0});
  
  return res.status(200).json(user);
}

async function createUser(req: INewRequest, res: Response) {
  let {name, email, password} = req.body;

  if (name && email && password) {
    if (!Object.keys({...await User.findOne({email})}).length) {
      password = await bcrypt.hash(password, 7);

      const result = await User.create({name, email, password, created_at: Date.now()}) as any;

      return res.status(201).json({_id: result._id, created_at: result.created_at});
    }
    return res.status(400).json({error: 'EMAIL JÁ CADASTRADO'});
  }
  return res.status(400).json({error: 'HÁ CAMPOS FALTANDO'});
}

const routes = Router()

routes.route(parseRoute(__dirname))
.get(authMiddleware(), showUser)
.post(createUser);

export default routes;