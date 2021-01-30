import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    created_at: Number,
    admin: Boolean
});

export default mongoose.model('users', UserSchema);