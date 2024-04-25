import React from 'react'
import { Link } from "react-router-dom"
import { image } from '../../constants'
import useLogout from "../../hooks/useLogout.js"


function Header() {

    const { loading, logout } = useLogout();

    const handleLogOut = (e)=>{
        e.preventDefault();
        logout();
    }

    return (
        <div className="navbar bg-base-200 ">

            {/* logo */}
            <div className="flex-1">
                <Link to="/">
                    <img src={image.myLogo} className='w-[6vw] h-auto p-1   ' alt=" his img" />
                </Link>
            </div>

            {/* nav links */}


            <ul className="menu menu-horizontal px-1 text-xl">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/projects">Projects</Link></li>
            </ul>


            <div className="flex-none gap-2">
                {/* search bar */}
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto text-xl" />
                </div>

                {/* profile img */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>

                    {/* dropdown */}
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li>
                                <button onClick={handleLogOut}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header