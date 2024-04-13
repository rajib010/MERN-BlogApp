import { Router } from "express"
import { signup } from "../controllers/User.js"
import { upload } from "../middlewares/multer.js";

const userRouter = Router();

userRouter.route("/signup").post(
    upload.fields([{
        name:"avatar",
        maxCount:1
    }]),
    signup
)

export default userRouter

