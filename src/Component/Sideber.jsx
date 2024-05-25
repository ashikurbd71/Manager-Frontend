// src/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
import img from "../assets/manager.png"
const Sideber = () => {
  return (
    <>
      {" "}
      <div className="flex flex-col gap-3 pt-4 h-full bg-[#CCD3CA] items-center">
      <div className="flex justify-items-center mb-5 items-center">
        <img src={img} alt="" className="w-8 h-8"/>
        <h1 className="text-2xl font-bold text-black "> <span className="text-[#0284C7]">Man</span>ager</h1>
       </div>
       
       <NavLink
          to="/dashboard"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
            <div className="flex -ml-3 justify-center pb-2 hover:text-gray-600 items-center gap-1">
            <MdOutlineDashboard className="text-lg"/>
             <h1 className="text-lg font-medium">Dashboard</h1>
            </div>
        
        </NavLink>



        <NavLink
          to="/dashboard/memberlist"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
            <div className="flex justify-center pb-2 hover:text-gray-600 items-center gap-1">
            <FaUserPlus className="text-lg"/>
             <h1 className="text-lg font-medium"> Add Member</h1>
            </div>
        
        </NavLink>
      </div>
    </>
  );
};

export default Sideber;
