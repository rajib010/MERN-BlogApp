import React from 'react';
import { images } from "../constants";


const navItemsInfo = [
  { name: "Home", type: "link" },
  { name: "Articles", type: "link" },
  { name: "Pages", type: "dropdown", items: ["About Us", "Contact Us"] },
  { name: "Pricing", type: "link" },
  { name: "Faq", type: "link" }
]

const NavItem = ({ item }) => {
  return (
    <li>
      {item.type === "link" ? (<a>{item.name}</a>) :
        (<>
          <li>
            <a>{item.name}</a>
            <ul className="p-2">
              {item.items.map((pages) => (
                <li key={pages}>
                  <a>{pages}</a>
                </li>
              ))}
            </ul>
          </li>
        </>)}
    </li>
  )
}

const Header = () => {
  return (
    <div className="container mx-auto navbar bg-slate-700 rounded-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ">
            {navItemsInfo.map((item) =>
            (
              <NavItem key={item.name} item={item} />
            )
            )}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <img src={images.Logo} alt="" />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-2xl text-slate-300 ">
          {navItemsInfo.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}

        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn text-2xl">Sign Out</a>
      </div>
    </div>
  )
}

export default Header