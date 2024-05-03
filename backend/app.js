import cors from "cors"
import express from "express"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))


app.use(express.json());

app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))


app.use(express.static("public"))

app.use(cookieParser())

//import the routers
import userRouter from "./routes/User.js";
import blogRouter from "./routes/Blog.js";

app.use("/api/user",userRouter)
app.use("/api/blog", blogRouter)


export default app;