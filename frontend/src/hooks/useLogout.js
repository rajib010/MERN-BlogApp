import { useState } from "react"
import { toast } from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"


const useLogout = (req, res) => {
    const [loading, setLoading] = useState(false);

    //from context
    const { setAuthUser } = useAuthContext();
    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch("api/user/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            localStorage.removeItem("blog-user");
            setAuthUser(null);
        } catch (error) {
            toast.error(error)
        } finally {
            setLoading(false)
        }
    }

    return { loading, logout }
}


export default useLogout