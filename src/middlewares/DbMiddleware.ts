import { NowRequest, NowResponse } from "@vercel/node";
import connectToDatabase from "../connectors/DatabaseConnector";

export default function DbMiddleware(func: (req: NowRequest, res: NowResponse) => any) {
    return async (req: NowRequest, res: NowResponse) => {
        await connectToDatabase();
        
        return func(req, res);
    }
}