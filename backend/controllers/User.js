import { User } from "../modules/User.js"
import { ApiError, ApiResponse, asyncHandler, generateTokensAndSetCookie } from "../utility/index.js"
import { uploadOnCloudinary } from "../utility/cloudinary.js"


const signup = asyncHandler(async (req, res) => {
    const { fullName, email, userName, password } = req.body;
    if ([fullName, email, userName, password].some((field) =>
        field?.trim() === "")) {
        throw new ApiError(400, "All the fields must be filled")
    }

    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User or email already exists")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path; 
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
        throw new ApiError(400, "Avatar file is missing");
    }
    const newUser = await User.create({
        fullName,
        avatar: avatar.url,
        email,
        userName,
        password
    })

    if (newUser) {
        generateTokensAndSetCookie(newUser?._id, res);
        return res.status(201).json(new ApiResponse(201, {
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            userName: newUser.userName,
            avatar: newUser.avatar
        },
            "user created successfully"
        ))
    }
})


export { signup }