import {NextFunction, Request, Response} from 'express';
import connectToDatabase from "../connectors/DatabaseConnector";

export default async function DbMiddleware(_req: Request, res: Response, next: NextFunction) {
    if (await connectToDatabase()) {
        return next();
    }

    return res.status(500).json({
        error: 'NÃO FOI POSSÍVEL SE CONECTAR A BASE DE DADOS'
    });
}