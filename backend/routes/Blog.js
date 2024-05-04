import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { createBlog } from "../controllers/Blogs.js"
import verifyJWT from "../middlewares/authentication.js"

const blogRouter = Router();

blogRouter.route("/create-blog").post(
    upload.fields([{
        name: "image",
        maxCount: 1
    }]),
    verifyJWT,
    createBlog
)



export default blogRouter;