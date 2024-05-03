import mongoose, { isValidObjectId } from "mongoose";
import { Blog } from "../modules/Blogs.js"
import { asyncHandler, ApiError, ApiResponse, uploadOnCloudinary } from "../utility/index.js"

const createBlog = asyncHandler(async (req, res) => {
    const { heading, description } = req.body;
    if(!req.user || !isValidObjectId(req.user?._id)) throw new ApiError(404,"Invalid request");
    if (!(heading && description)) {
        throw new ApiError(404, "Fields cannot be empty")
    }
    const imageLocalPath = req.files?.image[0].path;
    if (!imageLocalPath) {
        throw new ApiError(404, "Image file is required field")
    }
    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image) {
        throw new ApiError(404, "image file is missing")
    }
    const newBlog = await Blog.create({
        author: req.user?._id,
        heading,
        description,
        image: image.url
    })
    if (!newBlog) {
        throw new ApiError(500, "Cannot post newBlog. Try again later.")
    }
    return res.status(200).json(new ApiResponse(200, { newBlog }))

})

export { createBlog }