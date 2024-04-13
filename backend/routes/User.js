import { Router } from "express"
import { signup } from "../controllers/User.js"

const userRouter = Router();

userRouter.post("/signup", signup)



export default userRouter

