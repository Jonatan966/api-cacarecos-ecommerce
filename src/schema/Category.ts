import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: String,
    color: Array
});

export default mongoose.model('categories', CategorySchema);