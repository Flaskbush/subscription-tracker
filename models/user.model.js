import mongoose from "mongoose";

const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true, 'User Name is required'],
        trim: true,
        minLength: 3,
        maxLength: 25,
    },
    email: {
        type: String,
        required: [true, 'User Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 5,
        maxLength: 100,
        match: [emailValidation, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'User Password is required'],
        minLength: 6,
        maxLength: 70
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;


