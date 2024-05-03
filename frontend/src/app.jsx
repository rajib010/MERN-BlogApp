import { Home, Signup, Login, Insert, Contact, About } from "./pages/index.pages.js";
import { useAuthContext } from './context/AuthContext.jsx';
import Footer from './components/footer/footer.jsx'
import Header from './components/header/Header.jsx'
import { Routes, Route, Navigate } from "react-router-dom";


const app = () => {
    const { authUser } = useAuthContext();

    return (
        <div className='container mx-auto mt-2'>
            {authUser && <Header />}
            <Routes>
                <Route
                    path="/"
                    element={
                        authUser ? <Home /> : <Navigate to="/login" />
                    }
                />
                <Route path="add-blogs" element={authUser ? <Insert /> : <Navigate to="/login" />} />
                <Route path="contact" element={authUser ? <Contact /> : <Navigate to="/login" />} />
                <Route path="about" element={authUser ? <About /> : <Navigate to="/login" />} />
                <Route path="login" element={authUser ? <Navigate to="/" /> : <Login />} />
                <Route path="signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
            </Routes>
            {authUser && <Footer />}
        </div>
    )
}

export default app