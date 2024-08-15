import { createContext, useState, useContext, useEffect } from "react";


export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {

    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
        const loggedUser = localStorage.getItem("blog-user")
        if (loggedUser) {
            setAuthUser(JSON.parse(loggedUser))
        }
    }, [])

    const logout = () => {
        setAuthUser(null);
        localStorage.removeItem('blog-user')
    }

    return <AuthContext.Provider value={{ authUser, setAuthUser, logout }}>
        {children}
    </AuthContext.Provider>
}