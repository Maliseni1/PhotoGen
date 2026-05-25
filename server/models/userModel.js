import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },         // optional for Google
    googleId: { type: String, default: null },           
    creditBalance: { type: Number, default: 5 },
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema)
export default userModel;