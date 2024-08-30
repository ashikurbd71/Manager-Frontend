import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeTokenFromLocalStorage } from '../Auth/token';
import useAuth from '../Provider/UseAuth/useAuth';

const Navber = () => {
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false);
    const handleLogout = () => {
    
        removeTokenFromLocalStorage();
        navigate("/login");
        setUser(null)
      };

      const { user ,setUser} = useAuth();

      console.log(user)

      const image =  `${import.meta.env.VITE_API_URL}${"/"}${user?.manager?.profile}`;
    return (
        <div>
            
<nav className="flex border-l-2 f items-center justify-between bg-[#CCD3CA] px-4 py-3 w-full text-white">
    <div className="scale-100 cursor-pointer rounded-2xl px-3 py-2 text-xl font-semibold text-white transition-all duration-200 hover:scale-110">
    <div className="relative w-max rounded-lg">
        <input className="peer rounded-lg border  border-[#1B8EF8]  lg:w-[800px] bg-transparent px-4 py-2 text-[#1B8EF8] focus:outline-none" type="text" placeholder="" id="navigate_ui_input_33" />
        <label className="absolute -top-2 left-[10px] rounded-md px-2 text-xs text-white duration-300 peer-placeholder-shown:left-[14px] peer-placeholder-shown:top-3  peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:left-[10px] peer-focus:bg-sky-300 peer-focus:text-xs peer-focus:text-sky-800 dark:peer-focus:text-sky-400 dark:peer-focus:bg-[#0F172A]" htmlFor="navigate_ui_input_33">
          Search
        </label>
      </div>
    </div>
    <div className="flex items-center justify-between gap-5">
{
    user?.email ?   <h1 className='text-md font-bold text-[#0284C7] border-r-2  border-gray-500 px-4'>{user?.role}</h1>: <Link to={'/login'}>
    <button className="rounded-lg bg-sky-600 px-6 py-2 text-white transition-all duration-300 hover:scale-90">Log In</button>
    </Link>
}
<div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 focus:outline-none"
        >
         
          <img
            src={image}// Replace with the actual path to your image
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <svg
            className="w-6 h-6 text-[#0284C7] "
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06-.02L10 10.64l3.7-3.45a.75.75 0 111.04 1.08l-4.25 3.97a.75.75 0 01-1.04 0l-4.25-3.97a.75.75 0 01-.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
          <div className="py-1">
          
          <Link to={"/dashboard/change-pass"}>
                  <div className="" role="none">
                    <a
                      className="block px-4 py-2 text-sm font-semibold text-gray-600 hover:text-[#0284C7] hover:bg-secondary"
                      role="menuitem"
                    >
                      Change Password
                    </a>
                  </div>
                </Link>

                <div onClick={handleLogout} className=" cursor-pointer" role="none">
                  <a
                    className="block px-4 py-2  text-sm font-semibold text-gray-600 hover:text-[#0284C7] hover:bg-secondary"
                    role="menuitem"
                  >
                    Log Out
                  </a>
                </div>
          </div>
        </div>
      )}
    </div>
    </div>
</nav>
   
        </div>
    );
};

export default Navber;