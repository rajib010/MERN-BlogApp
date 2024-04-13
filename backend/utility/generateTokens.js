import jwt from "jsonwebtoken"
import { asyncHandler, ApiResponse, ApiError } from "./index.js"

const generateTokensAndSetCookie = asyncHandler(async (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d'
    })

    await res.cookie("jwtToken", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true, //prevent Xss attack
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
})

export default generateTokensAndSetCookie;