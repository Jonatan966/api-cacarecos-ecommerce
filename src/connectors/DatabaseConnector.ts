import mongoose from 'mongoose';
import {Category, Order, Product, User} from '../schema';

mongoose.Promise = global.Promise;
let isConnected;

function loadSchemas() {
    User;
    Category;
    Product;
    Order;
}

export default async function connectToDatabase() {
    if (isConnected) {
        return Promise.resolve();
    }

    loadSchemas();

    return mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(db => isConnected = db.connections[0].readyState);
}