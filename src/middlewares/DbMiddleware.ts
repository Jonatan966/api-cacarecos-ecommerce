import { NowRequest, NowResponse } from "@vercel/node";
import connectToDatabase from "../connectors/DatabaseConnector";

export default function DbMiddleware(func: (req: NowRequest, res: NowResponse) => any) {
    return async (req: NowRequest, res: NowResponse) => {
        await connectToDatabase();
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        return func(req, res);
    }
}