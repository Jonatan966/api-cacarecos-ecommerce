import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: String,
    slug: String,
    description: String,
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'categories'
    },
    price: Number,
    units: Number,
    created_at: Number,
    updated_at: Number
});

export default mongoose.model('products', ProductSchema);