import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEyeSlash, FaEye } from "react-icons/fa";
import useLogin from "../../hooks/useLogin.js"


function Login() {

  const [showPassword, setShowPassword] = useState(false); //state to control password visibility
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userName, password);
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className=' w-[70vw] mx-auto p-8 border rounded-3xl flex flex-col gap-5 shadow-2xl bg-base-200'>
        <h1 className='text-2xl md:text-4xl font-bold text-white text-center mb-1'>Log In </h1>

        {/* inputs for username and passwords */}

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className="text-base label-text">User Name: </span>
            </label>
            <input type="text" placeholder='John Doe' className='w-full input input-bordered h-10'
              value={userName} onChange={(e) => setUserName(e.target.value)} autoComplete='username'/>
          </div>

          <div>
            <label className='label p-2'>
              <span className="text-base label-text">Password: </span>
            </label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder='*******' className='w-full input input-bordered h-10' autoComplete='new-password'
                value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type='button' className='absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash className='h-6 w-6 text-gray-300' /> : <FaEye className='h-6 w-6 text-gray-300' />}
              </button>
            </div>
          </div>

          <Link to="/signup" className='text-sm hover:underline hover:text-blue-600 mt-2 '>Don't have an account?</Link>
          <div>
            <button className='btn mt-2 w-full hover:bg-green-800 text-white text-xl font-thin bg-blue-800 ' disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login








