import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {Home, Signup, Login} from "./pages/index.pages.js"


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </div>
  )
}

export default App