import { NowRequest } from "@vercel/node";
import { ObjectId } from "mongoose";

export interface IUserProps {
    _id: ObjectId;
    admin?: boolean;
    password?: string;
}

export interface INewRequest extends NowRequest {
    user?: IUserProps;
}