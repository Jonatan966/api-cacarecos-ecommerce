import {Request, Response} from 'express';
import connectToDatabase from "../connectors/DatabaseConnector";

export default function DbMiddleware(func: (req: Request, res: Response) => any) {
    return async (req: Request, res: Response) => {
        await connectToDatabase();
        
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        return func(req, res);
    }
}