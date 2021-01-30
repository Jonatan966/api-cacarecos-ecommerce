import mongoose from 'mongoose';

const OrderProductsSchema = new mongoose.Schema({
    timestamp: Number,
    product_id: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    units: Number, 
    order_id: {
        type: mongoose.Types.ObjectId,
        ref: 'orders'
    }
});

export default mongoose.model('order_products', OrderProductsSchema);