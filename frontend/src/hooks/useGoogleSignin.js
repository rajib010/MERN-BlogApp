import axios from 'axios';
import { useAuthContext } from "../context/AuthContext";


const useGoogleSiginHook = function () {
    const { authUser, setAuthUser } = useAuthContext();

    const getGoogleUser = async function () {
        const loggedUser = localStorage.getItem('blog-user')
        if (loggedUser) {
            setAuthUser(loggedUser)
        } else {
            try {
                const url = `http://localhost:8080/api/auth/login/success`;
                const data = await axios.get(url, { withCredentials: true });
                localStorage.setItem('blog-user', JSON.stringify(data.user))
                setAuthUser(data.user)
            } catch (error) {
                console.log('Error fetching google user data', error);

            }
        }
    }

    return { authUser, getGoogleUser }
}


export default useGoogleSiginHook