import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useSignUp from '../../hooks/useSignup.js'
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Signup = () => {

  const initialInputs = {
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null
  }
  const [inputs, setInputs] = useState(initialInputs);
  const [showPassword, setShowPassword] = useState(false) //state to control password visibility
  const { loading, signup } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
    setInputs(initialInputs); //reset the form after successful registeration
    alert("Users registered successfully");
  }

  //separate function to handle the file upload
  const handleFileChange = async (e) => {
    setInputs({ ...inputs, avatar: e.target.files[0] });
  }

  return (
    <div className='flex justify-center items-center w-[50vw] h-[100vh] mx-auto'>
      <div className=' w-[70vw] mx-auto py-2 px-10 border rounded-3xl flex flex-col gap-5 shadow-2xl bg-base-200'>
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          SignUp <span className='text-blue-500'>Blog App</span>
        </h1>

        <form onSubmit={handleSubmit}>

          <div>
            <label className='label p-2'>
              <span className="text-base label-text">Full Name: </span>
            </label>
            <input type="text" placeholder='John Doe' className='w-full input input-bordered h-10' value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} />
          </div>

          <div>
            <label className='label p-2'>
              <span className="text-base label-text">Username: </span>
            </label>
            <input type="text" placeholder='john@123' className='w-full input input-bordered h-10' value={inputs.userName}
              onChange={(e) => setInputs({ ...inputs, userName: e.target.value })} />
          </div>

          <div>
            <label className='label p-2'>
              <span className="text-base label-text">Email: </span>
            </label>
            <input type="email" placeholder='john@gmail.com' className='w-full input input-bordered h-10' value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
          </div>

          <div>
            <label className='label p-2'>
              <span className="text-base label-text">Password: </span>
            </label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder='*******' className='w-full input input-bordered h-10' value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} autoComplete='new-password' />
              <button type="button" className='absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash className='h-6 w-6 text-gray-300' /> : <FaEye className='h-6 w-6 text-gray-300' />}
              </button>
            </div>
          </div>

          <div>
            <label className='label p-2'>
              <span className="text-base label-text">Confirm Password: </span>
            </label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder='*******' className='w-full input input-bordered h-10' value={inputs.confirmPassword} onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} autoComplete='new-password' />
              <button type="button" className='absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash className='h-6 w-6 text-gray-300' /> : <FaEye className='h-6 w-6 text-gray-300' />}
              </button>
            </div>
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'> Select avatar image: </span>
            </label>
            <input type="file" onChange={handleFileChange} className="file-input file-input-bordered w-full max-w-xs" />
          </div>

          <Link to="/login" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>Already have an account?</Link>

          <div>
            <button className="btn mt-2 w-full hover:bg-green-800 text-white text-xl font-thin bg-blue-800 " disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
