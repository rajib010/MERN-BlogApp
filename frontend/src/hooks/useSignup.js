import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.js";

const useSignUp = () => {
    const [loading, setLoading] = useState(false);

    //from context
    const { setAuthUser } = useAuthContext();
    const signup = async ({ fullName, userName, email, password, confirmPassword, avatar }) => {
        const success = handleInputErrors({ fullName, userName, email, password, confirmPassword, avatar });
        if (!success) return;
        setLoading(true);
        try {
            const res = await fetch("/api/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, userName, email, password, confirmPassword, avatar })
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }
            localStorage.setItem("blog-user", JSON.stringify(data));

            //context
            setAuthUser(data);
            console.log(data);
        } catch (e) {
            toast.error(e.message)
        }finally{
            setLoading(false)
        }
    };

    return {loading, signup}
}


export default useSignUp

function handleInputErrors({ fullName, userName, email, password, confirmPassword, avatar }) {
    if (!fullName || !userName || !email || !password || !confirmPassword || !avatar) {
        toast.error("Please fill in all the feilds");
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("Passwords donot match");
        return false;
    }
    if (password.length < 5) {
        toast.error("Password length should not be less than 5 characters");
        return false;
    }

    return true;
}