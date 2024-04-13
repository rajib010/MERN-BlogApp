import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    avatar: {
        type: String,
        default: ""
    }
})

//hash the passwords
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

//check if the password is correct

userSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password)
}



export const User = mongoose.model("User", userSchema)