import jwt from "jsonwebtoken";
import { asyncHandler, ApiResponse, ApiError } from "./index.js";

const generateTokensAndSetCookie = asyncHandler(async (userId, res) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
            expiresIn: '15d'
        })
        await res.cookie("token", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000, //MS
            httpOnly: true, //prevent Xss attack
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development"
        })
        return new ApiResponse(200, "Token generated and set as cookie successfully");
    } catch (error) {
        throw new ApiError(500, "Token generation and setting cookie failed");
    }
})

export default generateTokensAndSetCookie;
