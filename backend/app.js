import cors from "cors"
import express from "express"
import cookieParser from "cookie-parser"
import passport from "./middlewares/passport.js";
import session from 'express-session';


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: "GET, PUT, POST, DELETE",
    credentials: true
}))

app.use(session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))


app.use(express.static("public"))

app.use(cookieParser())

//import the routers
import userRouter from "./routes/User.js";
import blogRouter from "./routes/Blog.js";
import googleSignInRouter from "./routes/GoogleSign.js"
import { getBlogs } from "./controllers/Blogs.js";

app.use("/api/user", userRouter)
app.use("/api/blog", blogRouter)
app.use("/api/auth", googleSignInRouter)
app.route("/").get(getBlogs)



export default app;