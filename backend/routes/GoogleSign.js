import { Router } from "express";
import passport from "passport";


const router = Router()

router.get("/login/success", (req, res) => {
    console.log("Login success route hit");
    console.log("req.user:", req.user);

    if (req.user) {
        console.log("User data:", req.user);
        res.status(200).json({
            error: false,
            message: "Logged in successfully",
            user: req.user,
        });
    } else {
        res.status(403).json({
            error: true,
            message: "Not Authorized",
        });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Login failure",
    });
});

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: process.env.SUCCESS_URL,
        failureRedirect: "/login/failed",
    })
);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req, res) => {
    console.log('Logging out.....');

    req.logout((err) => {
        if (err) {
            return next(err);

        }
        res.redirect(process.env.CLIENT_URL);
    });
});

export default router