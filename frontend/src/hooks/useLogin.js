import { useState } from "react";
import toast from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext.js";


const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthContext } = useAuthContext();

    const login = async (userName, password) => {
        const success = handleInputErrors(userName, password);
        if(!success) return;
        setLoading(true);
        try {
            const res = await fetch("api/")
        } catch (error) {
            
        }
    }
}


export default useLogin

const handleInputErrors = (userName, password) => {
    if (!userName || !password) {
        toast.error("Please fill in all the fields");
        return false;
    }
    return true;
}