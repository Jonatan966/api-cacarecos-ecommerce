import { NowResponse } from "@vercel/node";
import { INewRequest, IUserProps } from "../utils/interfaces";
import jwt from 'jsonwebtoken';

import User from "../schema/User";

function checkToken(token: string) {
    try {
        const result = jwt.verify(token, process.env.JWT_SECRET) as any;
        return result;
    }
    catch {
        return false;
    }
}

export default async function authMiddleware(req: INewRequest, res: NowResponse, func: (req: INewRequest, res: NowResponse) => any) {
    let token = req.headers.authorization;
    if (token && token.includes('Bearer ')) {
        token = token.split(' ')[1];
        const tokenResult = checkToken(token);

        if (tokenResult) {
            const user = await User.findOne({_id: tokenResult._id}, {email: 0, name: 0, password: 0, created_at: 0});
            if (user) {
                req.user = user as IUserProps;
                return func(req, res);
            }
        }
    }

    return res.status(401).json({error: 'TOKEN INVÁLIDO'});
}