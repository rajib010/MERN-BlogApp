
const googleSignIn = async (req, res) => {
    console.log('login success route hit');
    if (req.isAuthenticated()) {
        console.log("user data", req.user);
        return res.status(200).json({
            error: false,
            message: "logged in successfully via google",
            user: req.user
        });
    } else {
        return res.status(403).json({
            error: true,
            message: "Not authorized"
        })
    }
}

const signinFailed = (req, res) => {
    return res.status(401).json({ error: true, message: "Not authorized" })
}




export { googleSignIn, signinFailed }