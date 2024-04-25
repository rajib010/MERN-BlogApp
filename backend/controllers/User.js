import { User } from "../modules/User.js"
import { ApiError, ApiResponse, asyncHandler, generateTokensAndSetCookie } from "../utility/index.js"
import { uploadOnCloudinary } from "../utility/cloudinary.js"
import bcrypt from "bcryptjs"


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

const login = asyncHandler(async (req, res) => {
    const { userName, password } = req.body;
    console.log(req.body); //showing undefined 
    // username cannot be fetched from req.body
    const user = await User.findOne({ userName });
    if (!user) {
        throw new ApiError(404, "User does not exist")
    }
    const isValidPassword = await bcrypt.compare(password, user.password || "");
    if (!isValidPassword) {
        throw new ApiError(401, "Invalid password")
    }
    await generateTokensAndSetCookie(user._id, res);

    return res.status(200).json(new ApiResponse(200, {
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        avatar: user.avatar
    },
        "User login successful"))
})

export { signup, login }