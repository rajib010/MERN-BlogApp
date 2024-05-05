import { useState } from "react";
import { toast } from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext";

export const useCreateBlogs = () => {

    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext()
    const createBlogs = async ({ heading, description, image }) => {
        const success = handleInputErrors(heading, description, image);
        if (!success) return;
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("heading", heading);
            formData.append("description", description);
            formData.append("image", image);

            const res = await fetch("/api/blog/create-blog", {
                method: "POST",
                body: formData,
            })

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }
            console.log(data);
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    };

    return { loading, createBlogs };
}

const handleInputErrors = (heading, description, image) => {
    if (!heading || !description || !image) {
        return false;
    }
    return true;
}