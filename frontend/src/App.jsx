import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Home, Signup, Login, About, Contact, Projects } from "./pages/index.pages.js"
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext.jsx'


const App = () => {

  const { authUser } = useAuthContext()

  return (
    <div className='container mx-auto my-2 bg-white'>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={'/login'} />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={authUser ? <Navigate to={"/"} /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to={"/"} /> : <Signup />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
    </div>
  )
}

export default App