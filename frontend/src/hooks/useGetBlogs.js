import { useState } from "react"
import { toast } from 'react-hot-toast'
import { useAuthContext } from "../context/AuthContext";
import useBlogs from "../zustand/useBlogs.js";


const useGetBlogs = () => {
    const { authUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const { blogs, setBlogs } = useBlogs();

    const getBlogs = async () => {
        try {
            const res = await fetch("/")
            if (!res) return;
            const data = res.json();
            if (data.error) {
                throw new Error(data.error)
            }
            console.log(data);
            setBlogs(data);
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }

    }

    return {getBlogs, loading};
}

export default useGetBlogs;