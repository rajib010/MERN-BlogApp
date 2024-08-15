import { Router } from "express"
import { signup, login, logout } from "../controllers/User.js"
import { upload } from "../middlewares/multer.js";


const userRouter = Router();

userRouter.route("/signup").post(
    upload.fields([{
        name: "avatar",
        maxCount: 1
    }]),
    signup
)

userRouter.route("/login").post(login);
userRouter.route("/logout").post(logout);


export default userRouter

