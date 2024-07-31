// src/Sidebar.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaMagnet, FaMoneyBillTransfer, FaUserPlus } from "react-icons/fa6";
import { MdArrowDropDown, MdArrowRight, MdOutlineDashboard, MdOutlineSettings } from "react-icons/md";
import img from "../assets/manager.png";
import { LuCircleDot } from "react-icons/lu";
import { FaUserGear } from "react-icons/fa6";
import { TbNews } from "react-icons/tb";
import { FaAward } from "react-icons/fa";
const Sideber = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <>
      {" "}
      <div className="flex flex-col gap-3 pt-4 h-full bg-[#CCD3CA] items-center">
        <div className="flex justify-items-center mb-5 items-center">
          <img src={img} alt="" className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-black ">
            {" "}
            <span className="text-[#0284C7]">Man</span>ager
          </h1>
        </div>

        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? " bg-[#0284C7] px-10 pt-1 rounded-md text-white " : ""
          }
        >
          <div className="flex -ml-3 justify-center pb-2 hover:text-gray-600 items-center gap-1">
            <MdOutlineDashboard className="text-lg" />
            <h1 className="text-lg font-medium">Dashboard</h1>
          </div>
        </NavLink>

        <NavLink
          to="/dashboard/memberlist"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-[#0284C7] px-6 pt-1 rounded-md text-white " : ""
          }
        >
          <div className="flex justify-center pb-2 hover:text-gray-600 items-center gap-1">
            <FaUserPlus className="text-lg" />
            <h1 className="text-lg font-medium"> Add Member</h1>
          </div>
        </NavLink>

        {/* manager */}

        <NavLink
          to="/dashboard/managerlist"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-[#0284C7] px-6 pt-1 rounded-md text-white " : ""
          }
        >
          <div className="flex justify-center pb-2 hover:text-gray-600 items-center gap-1">
            <FaUserGear className="text-lg" />
            <h1 className="text-lg font-medium"> Add Manager</h1>
          </div>
        </NavLink>

        <NavLink
          to="/dashboard/noticelist"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-[#0284C7] px-10 pt-1 rounded-md text-white " : ""
          }
        >
          <div className="flex justify-center -ml-6 pb-2 hover:text-gray-600 items-center gap-1">
            <TbNews className="text-lg" />
            <h1 className="text-lg font-medium"> Add Notice</h1>
          </div>
        </NavLink>

        <NavLink
          to="/dashboard/mealmanagelist"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-[#0284C7] px-6 pt-2 rounded-md text-white " : ""
          }
        >
          <div className="flex justify-center  pb-2 hover:text-gray-600 items-center gap-1">
            <FaAward className="text-lg" />
            <h1 className="text-lg font-medium">Meal Manage</h1>
          </div>
        </NavLink>

        <NavLink
          to="/dashboard/monthlyreport"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-[#0284C7] px-6 pt-2 rounded-md text-white " : ""
          }
        >
          <div className="flex justify-center pb-2 ml-4 hover:text-gray-600 items-center gap-1">
            <FaMoneyBillTransfer className="text-lg" />
            <h1 className="text-lg font-medium">Monthly Report</h1>
          </div>
        </NavLink>

        {/* setting */}

        <div>
          <button>
            <div
              className="flex justify-items-center pb-2 -ml-10 hover:text-gray-600 items-center gap-1"
              onClick={toggleSubMenu}
            >
              <MdOutlineSettings className="text-lg" />
              <h1 className="text-lg font-medium">Setting</h1>
              {isSubMenuOpen ? <MdArrowDropDown className="text-lg" /> : <MdArrowRight className="text-lg" />}
            </div>
          </button>
          {isSubMenuOpen && (
            <div className="pt-2">
              <NavLink
                to="/dashboard/setting/institutelist"
                className={({ isActive }) => (isActive ? "text-[#0284C7] " : "")}
              >
                <div className="flex items-center  hover:text-gray-600 gap-1 ">
                  <LuCircleDot className="text-lg" />
                  <h2 className="text-md font-medium">Institute</h2>
                </div>
              </NavLink>

              <NavLink
                to="/dashboard/setting/departmentlist"
                className={({ isActive }) => (isActive ? "text-[#0284C7] " : "")}
              >
                <div className="flex items-center  hover:text-gray-600 gap-1 py-2 ">
                  <LuCircleDot className="text-lg" />
                  <h2 className="text-md font-medium">Departmnet</h2>
                </div>
              </NavLink>

              <NavLink
                to="/dashboard/setting/semisterlist"
                className={({ isActive }) => (isActive ? "text-[#0284C7] " : "")}
              >
                <div className="flex items-center  hover:text-gray-600 gap-1 pb-2 ">
                  <LuCircleDot className="text-lg" />
                  <h2 className="text-md font-medium">Semister</h2>
                </div>
              </NavLink>

              <NavLink
                to="/dashboard/setting/bloodgrouplist"
                className={({ isActive }) => (isActive ? "text-[#0284C7] " : "")}
              >
                <div className="flex items-center  hover:text-gray-600 gap-1 ">
                  <LuCircleDot className="text-lg" />
                  <h2 className="text-md font-medium">Blood Group</h2>
                </div>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sideber;
