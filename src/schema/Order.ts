import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    timestamp: Number,
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    status: Number
});

export default mongoose.model('orders', OrderSchema);