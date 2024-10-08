import cloudinary from "cloudinary";
import fs from "fs";
import ApiError from "./apiError.js"; 

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new ApiError(400, "Avatar file is missing");
        }
        const response = await cloudinary.v2.uploader.upload(localFilePath, {
            resource_type: 'auto'
        });
        console.log("File uploaded to cloudinary", response.url);


        //delete the file after successfull upload
        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath);
            console.log("local file deleted successfully");
        }
        return response;
    } catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath); // Remove temporary file on upload failure
        }
        throw error; // Re-throw the error for proper handling
    }
};

const deleteOnCloudinary = async (publicId) => {
    try {
        if (!publicId) return;
        const response = await cloudinary.v2.uploader.destroy(publicId);
        console.log("Image deleted successfully", response);
    } catch (error) {
        console.log("Error deleting image", error);
    }
};

export { uploadOnCloudinary, deleteOnCloudinary };
