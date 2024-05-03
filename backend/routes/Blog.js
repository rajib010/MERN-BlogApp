import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { createBlog } from "../controllers/Blogs.js"


const blogRouter = Router();

blogRouter.route("/create").post(
    upload.fields([{
        name: "image",
        maxCount: 1
    }]),
    createBlog
)



export default blogRouter;