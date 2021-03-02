import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { parseRoute } from '../../src/utils/parsers';

import User from "../../src/schema/User";
import errorList from '../../src/utils/errorList';
import { IUserProps } from '../../src/utils/interfaces';


async function authUser(req: Request, res: Response) {
    let {email, password} = req.body;
    const user = await User.findOne({email}) as IUserProps;

    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({_id: user._id, admin: !!user.admin}, process.env.JWT_SECRET, {expiresIn: '3d'});

            return res.status(200).json({token});
        }    
    }
    return res.status(400).json(errorList.LOGIN_INCORRETO);
}

const routes = Router();

routes.route(parseRoute(__filename))
.post(authUser);

export default routes;
