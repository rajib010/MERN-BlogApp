import { ApiError, asyncHandler } from "../utility/index.js"
import jwt from "jsonwebtoken"
import { User } from "../modules/User.js"

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.token
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decodedToken?._id).select("-password")
        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
        req.user = user
        next();
    } catch (error) {
        console.log("JWT verification error", error);
        throw error;
    }
})

export default verifyJWT;
