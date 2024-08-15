import passport from "../middlewares/passport.js"
import { Router } from "express";
import { googleSignIn, signinFailed } from "../controllers/GoogleSign.js";


const router = Router();
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/login/success", googleSignIn )
router.get("/login/failed", signinFailed)

router.get("/auth/google/callback",
    passport.authenticate("google",{
        successRedirect: process.env.SUCCESS_URL,
        failureRedirect:"/api/auth/login/failed"
    })
)


export default router