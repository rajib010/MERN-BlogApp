import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home, Signup, Login, About, Contact, Projects } from "./pages/index.pages.js";
import { AuthContextProvider, useAuthContext } from './context/AuthContext.jsx';
import Footer from './components/footer/footer.jsx'
import Header from './components/header/Header.jsx'

import './index.css';

function Layout({ children }) {
  return (
    <div className='container mx-auto mt-2'>
      <Header/>
      {children}
      <Footer />
    </div>
  );
}

function AppRoutes() {
  const { authUser } = useAuthContext();

  return (
    <Routes>
      <Route
        path="/"
        element={
          authUser ? <Home /> : <Navigate to="/login" />
        }
      />
      <Route path="about" element={authUser ? <About /> : <Navigate to="/login" />} />
      <Route path="contact" element={authUser ? <Contact /> : <Navigate to="/login" />} />
      <Route path="login" element={authUser ? <Navigate to="/" /> : <Login />} />
      <Route path="signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
