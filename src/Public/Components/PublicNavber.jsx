import React, { useState } from 'react';
import img from "../../assets/manager.png";
import { Link, NavLink } from 'react-router-dom';
import { TbNews } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Import icons for open and close
import { TfiGallery } from "react-icons/tfi";
const PublicNavber = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

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
                            <TbNews className="text-lg"/>
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
                    <Link to="/logout">
                        <button className="rounded-lg bg-sky-600 px-6 py-2 text-white transition-all duration-300 hover:scale-90">
                            Log Out
                        </button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMobileMenu} className="text-2xl focus:outline-none">
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
                            <TbNews className="text-lg"/>
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
                    <Link to="/logout" onClick={toggleMobileMenu}>
                        <button className="w-full rounded-lg bg-sky-600 px-6 py-2 text-white transition-all duration-300 hover:scale-90">
                            Log Out
                        </button>
                    </Link>
                </div>
            )}
        </>
    );
};

export default PublicNavber;
