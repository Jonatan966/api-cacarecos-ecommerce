import { Request } from 'express'
import { User } from '../entities/User'

export interface IUserProps {
    _id: any;
    admin?: boolean;
    password?: string;
}

export interface INewRequest extends Request {
    user?: User;
}
