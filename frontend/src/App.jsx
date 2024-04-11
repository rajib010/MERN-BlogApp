import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {Home, Signup, Login, About, Contact, Projects} from "./pages/index.pages.js"


const App = () => {
  return (
    <div className='container mx-auto'>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/projects' element={<Projects />}></Route>
      </Routes>
    </div>
  )
}

export default App