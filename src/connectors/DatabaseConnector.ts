import mongoose from 'mongoose';
import {Category, Order, Product, User} from '../schema';

mongoose.Promise = global.Promise;
let isConnected: number;

function loadSchemas() {
    User;
    Category;
    Product;
    Order;
}

export default async function connectToDatabase() {
    if (isConnected) {
        return 1;
    }

    loadSchemas();

    return mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(db => isConnected = db.connections[0].readyState)
      .catch(error => console.log('Algo deu errado ao tentar se conectar ao banco.\nMotivo:', error));
}