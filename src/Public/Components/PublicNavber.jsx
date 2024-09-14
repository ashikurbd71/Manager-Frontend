import React, { useState } from 'react';
import img from "../../assets/manager.png";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { TbNews } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Import icons for open and close
import { TfiGallery } from "react-icons/tfi";
import Marquee from 'react-fast-marquee';
import { MdFoodBank } from 'react-icons/md';
import { GoReport } from 'react-icons/go';
import useAuth from '../../Provider/UseAuth/useAuth';
import { removeTokenFromLocalStorage } from '../../Auth/token';
const PublicNavber = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate()
    const { user ,setUser} = useAuth();
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const [isOpen, setIsOpen] = useState(false);
    const handleLogout = () => {
    
        removeTokenFromLocalStorage();
        navigate("/login");
        setUser(null)
      };

     

      console.log(user)

      const image =  `${import.meta.env.VITE_API_URL}${"/"}${user?.userName?.profile}`;

    return (
        <>
            <div className='max-w-full  px-5 lg:px-10 flex h-16 py-4 shadow-lg bg-[#c0e1f1] justify-between items-center'>
                {/* logo */}
                <Link to={'/public'}>
                    <div className="flex cursor-pointer items-center">
                        <img src={img} alt="Manager Logo" className="w-8 h-8"/>
                        <h1 className="text-2xl font-bold text-black ml-2"><span className="text-[#0284C7]">Man</span>ager</h1>
                    </div>
                </Link>

                {/* nav */}
                <div className="hidden md:flex items-center gap-10">

                <NavLink
                        to="/public/gallery"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? " text-[#0284C7]" : ""
                        }
                    >
                        <div className="flex justify-center items-center gap-1 hover:text-gray-600">
                            <TfiGallery className="text-lg"/>
                            <h1 className="text-lg font-medium">Gallery</h1>
                        </div>
                    </NavLink>
                    <NavLink
                        to="/public/notice"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? " text-[#0284C7]" : ""
                        }
                    >
                        <div className="flex justify-center items-center gap-1 hover:text-gray-600">
                            <TbNews className="text-lg"/>
                            <h1 className="text-lg font-medium">Notice</h1>
                        </div>
                    </NavLink>
                    <NavLink
                        to="/public/myreport"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? " text-[#0284C7]" : ""
                        }
                    >
                        <div className="flex justify-center items-center gap-1 hover:text-gray-600">
                            <GoReport className="text-lg"/>
                            <h1 className="text-lg font-medium">My Report</h1>
                        </div>
                    </NavLink>
                    <NavLink
                        to="/public/profilecard"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? " text-[#0284C7]" : ""
                        }
                    >
                        <div className="flex justify-center items-center gap-1 hover:text-gray-600">
                            <CgProfile className="text-lg"/>
                            <h1 className="text-lg font-medium">Profile</h1>
                        </div>
                    </NavLink>
                </div>

                {/* logout */}
                <div className="hidden md:flex">
                {
    user?.email ?   <h1 className='text-md font-bold text-gray-600 pt-2 border-r-2  border-gray-500 px-4'>{user?.userName?.name}</h1>: <Link to={'/login'}>
    <button className="rounded-lg bg-sky-600 px-6 py-2 text-white transition-all duration-300 hover:scale-90">Log In</button>
    </Link>
}
                <div className="relative inline-block pl-2 text-left">
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
          
          <Link to={"/public/publichnagepass"}>
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

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                {
    user?.email ?   <h1 className='text-md font-bold text-gray-600 pt-1 border-r-2  border-gray-500 px-4'>{user?.userName?.name}</h1>: <Link to={'/login'}>
    <button className="rounded-lg bg-sky-600 px-6 py-2 text-white transition-all duration-300 hover:scale-90">Log In</button>
    </Link>
}
                <div className="relative inline-block pl-2 text-left">
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
          
          <Link to={"/public/publichnagepass"}>
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
           
                    <button onClick={toggleMobileMenu} className=" pl-3 text-2xl focus:outline-none">
                        {isMobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />} {/* Toggle icon */}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#c0e1f1] px-5 py-4 shadow-lg">
                    

<NavLink
                        to="/public/gallery"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? " text-[#0284C7]" : ""
                        }
                        onClick={toggleMobileMenu}
                    >
                        <div className="flex justify-center items-center gap-1 mb-4 hover:text-gray-600">
                            <TfiGallery className="text-lg"/>
                            <h1 className="text-lg font-medium">Gallery</h1>
                        </div>
                    </NavLink>
                    <NavLink
                        to="/public/notice"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? " text-[#0284C7]" : ""
                        }
                        onClick={toggleMobileMenu} // Close menu on navigation
                    >
                        <div className="flex justify-center items-center gap-1 hover:text-gray-600 mb-4">
                            <TbNews className="text-lg"/>
                            <h1 className="text-lg font-medium">Notice</h1>
                        </div>
                    </NavLink>
                    <NavLink
                        to="/public/myreport"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? " text-[#0284C7]" : ""
                        }
                    >
                        <div className="flex justify-center items-center gap-1 hover:text-gray-600">
                            <GoReport className="text-lg"/>
                            <h1 className="text-lg font-medium">My Report</h1>
                        </div>
                    </NavLink>
                    <NavLink
                        to="/public/profilecard"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? " text-[#0284C7]" : ""
                        }
                        onClick={toggleMobileMenu} // Close menu on navigation
                    >
                        <div className="flex justify-center items-center gap-1 mt-4 hover:text-gray-600 mb-4">
                            <CgProfile className="text-lg"/>
                            <h1 className="text-lg font-medium">Profile</h1>
                        </div>
                    </NavLink>
              
                      
               
                </div>
            )}

   
        </>
    );
};

export default PublicNavber;
