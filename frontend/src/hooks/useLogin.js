import { useState } from "react";
import toast from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext.jsx";


const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (userName, password) => {
        const success = handleInputErrors(userName, password);
        if (!success) return;
        setLoading(true);
        try {
            const res = await fetch("api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userName, password })
            })

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            };
            localStorage.setItem("blog-user", JSON.stringify(data));
            setAuthUser(data)   
        } catch (error) {
            toast.error("Invalid credentials")
        } finally {
            setLoading(false)
        }
    }
    return { loading, login }
}


export default useLogin

const handleInputErrors = (userName, password) => {
    if (!userName || !password) {
        toast.error("Please fill in all the fields");
        return false;
    }
    return true;
}