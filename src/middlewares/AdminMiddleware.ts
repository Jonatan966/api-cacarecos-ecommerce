import { NowResponse } from "@vercel/node";
import { INewRequest } from "../utils/interfaces";
import authMiddleware from "./AuthMiddleware";

export default async function adminMiddleware(mainReq: INewRequest, mainRes: NowResponse, func: (req: INewRequest, res: NowResponse) => any) {
    return await authMiddleware(mainReq, mainRes, (subReq, subRes) => {
        if (subReq.user.admin) {
            return func(subReq, subRes);
        }
    
        return subRes.status(401).json(null);    
    });
}