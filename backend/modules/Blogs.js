import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        default: " "
    }

},
    {
        timeStamps: true
    }

)


export const Blog = mongoose.model("Blog", blogSchema)