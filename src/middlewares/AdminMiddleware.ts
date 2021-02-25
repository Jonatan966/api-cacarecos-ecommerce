import {Response} from 'express';
import { INewRequest } from "../utils/interfaces";
import authMiddleware from "./AuthMiddleware";

export default async function adminMiddleware(mainReq: INewRequest, mainRes: Response, func: (req: INewRequest, res: Response) => any) {
    return await authMiddleware(mainReq, mainRes, (subReq, subRes) => {
        if (subReq.user.admin) {
            return func(subReq, subRes);
        }
    
        return subRes.status(401).json(null);    
    });
}