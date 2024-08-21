import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 4,
        max: 15
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    lastloginDate: {
        type: Date,
        default: Date.now()
    },
    confirmEmailCode: String,
    confirmEmailCodeDateEnd: Date,
    resetToken: String,
    resetTokenExpire: Date,
    activation: {
        type: Boolean,
        default: false
    }
},{timestamps: true})


export const User = mongoose.model('User',userSchema)