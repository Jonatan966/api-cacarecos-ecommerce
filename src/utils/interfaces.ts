import { ObjectId } from "mongoose";
import { Request } from 'express';

export interface IUserProps {
    _id: ObjectId;
    admin?: boolean;
    password?: string;
}

export interface INewRequest extends Request {
    user?: IUserProps;
}