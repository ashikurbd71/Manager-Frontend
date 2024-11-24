// src/Sidebar.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaMagnet, FaMoneyBillTransfer, FaUserPlus, FaUsers } from "react-icons/fa6";
import { MdArrowDropDown, MdArrowRight, MdFoodBank, MdOutlineDashboard, MdOutlineHomeWork, MdOutlineSettings } from "react-icons/md";
import img from "../assets/manager.png";
import { LuCircleDot } from "react-icons/lu";
import { FaUserGear } from "react-icons/fa6";
import { TbFileReport, TbNews } from "react-icons/tb";
import { FaAward } from "react-icons/fa";
import { GoReport } from "react-icons/go";
import { LuServer } from "react-icons/lu";
import { FaListCheck } from "react-icons/fa6";
import { BiPhotoAlbum } from "react-icons/bi";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import useAuth from "../Provider/UseAuth/useAuth";
import { GiMoneyStack } from "react-icons/gi";
const Sideber = () => {

    const {user} = useAuth()

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <>
      {" "}
      <div className="flex flex-col gap-3 overflow-y-auto py-4 h-full bg-[#CCD3CA] items-center">
        <div className="flex justify-items-center mb-3 items-center">
          
          <h1 className="text-3xl font-bold text-black ">
            {" "}
            MENA<span className="text-[#0284C7]">GER</span>
          </h1>
        </div>

        <NavLink
          to="/dashboard/hostelreport"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? " bg-[#0284C7] px-9 pt-1 rounded-md text-white " : ""
          }
        >
          <div className="flex ml-2 justify-center pb-2 hover:text-gray-600 items-center gap-1">
            <MdOutlineDashboard className="text-lg" />
            <h1 className="text-lg font-medium">Hostel Report</h1>
          </div>
        </NavLink>


        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? " bg-[#0284C7] px-10 pt-1 rounded-md text-white " : ""
          }
        >
          <div className="flex -ml-2 justify-center pb-2 hover:text-gray-600 items-center gap-1">
            <MdOutlineDashboard className="text-lg" />
            <h1 className="text-lg font-medium">Meal Report</h1>
          </div>
        </NavLink>

        <NavLink
to="/dashboard/reports"
className={({ isActive, isPending }) =>
  isPending ? "pending" : isActive ? "bg-[#0284C7] px-6 pt-2 rounded-md text-white " : ""
}
>
<div className="flex justify-center pb-2 ml-4 hover:text-gray-600 items-center gap-1">
<MdOutlineDashboard className="text-lg" />
  <h1 className="text-lg font-medium">Monthly Report</h1>
</div>
</NavLink>


{["Super Admin", "Manager"].some(role => user?.role?.includes(role)) && (
  <NavLink
    to="/dashboard/roomlist"
    className={({ isActive, isPending }) =>
      isPending
        ? "pending"
        : isActive
        ? "bg-[#0284C7] px-[85px] pt-1 rounded-md text-white"
        : ""
    }
  >
    <div className="flex justify-center pb-2 -ml-[73px] hover:text-gray-600 items-center gap-1">
      <MdOutlineHomeWork  className="text-lg" />
      <h1 className="text-lg font-medium">Room</h1>
    </div>
  </NavLink>
)}


{["Super Admin","Manager"].some(role => user?.role?.includes(role)) && (

<NavLink
to="/dashboard/cashinlist"
className={({ isActive, isPending }) =>
  isPending ? "pending" : isActive ? "bg-[#0284C7] px-[75px] pt-1 rounded-md text-white " : ""
}
>
<div className="flex justify-center -ml-14 pb-2 hover:text-gray-600 items-center gap-1">
  <GiMoneyStack className="text-lg" />
  <h1 className="text-lg font-medium">Cash In</h1>
</div>
</NavLink>
       )}

{["Super Admin","Manager"].some(role => user?.role?.includes(role)) && (

<NavLink
to="/dashboard/cashoutlist"
className={({ isActive, isPending }) =>
  isPending ? "pending" : isActive ? "bg-[#0284C7] px-[60px] pt-1 rounded-md text-white " : ""
}
>
<div className="flex justify-center -ml-10 pb-2 hover:text-gray-600 items-center gap-1">
  <FaMoneyBillTransfer className="text-lg" />
  <h1 className="text-lg font-medium">Cash Out</h1>
</div>
</NavLink>
       )}
        
        {["Super Admin", "Manager"].some(role => user?.role?.includes(role)) && (
  <NavLink
    to="/dashboard/memberlist"
    className={({ isActive, isPending }) =>
      isPending
        ? "pending"
        : isActive
        ? "bg-[#0284C7] px-16 pt-1 rounded-md text-white"
        : ""
    }
  >
    <div className="flex justify-center pb-2 -ml-12 hover:text-gray-600 items-center gap-1">
      <FaUsers  className="text-lg" />
      <h1 className="text-lg font-medium"> Member</h1>
    </div>
  </NavLink>
)}



     

        {/* manager */}
        {/* {["Super Admin"].some(role => user?.role?.includes(role)) && (

<NavLink
to="/dashboard/managerlist"
className={({ isActive, isPending }) =>
  isPending ? "pending" : isActive ? "bg-[#0284C7] px-16 pt-1 rounded-md text-white " : ""
}
>
<div className="flex justify-center pb-2 -ml-12 hover:text-gray-600 items-center gap-1">
  <FaUserGear className="text-lg" />
  <h1 className="text-lg font-medium"> Manager</h1>
</div>
</NavLink>
        )} */}




       
       
       {["Super Admin","Manager"].some(role => user?.role?.includes(role)) && (

<NavLink
to="/dashboard/noticelist"
className={({ isActive, isPending }) =>
  isPending ? "pending" : isActive ? "bg-[#0284C7] px-12 pt-1 rounded-md text-white " : ""
}
>
<div className="flex justify-center -ml-6 pb-2 hover:text-gray-600 items-center gap-1">
  <TbNews className="text-lg" />
  <h1 className="text-lg font-medium"> Add Notice</h1>
</div>
</NavLink>
       )}



       {["Super Admin","Manager"].some(role => user?.role?.includes(role)) && (
  <NavLink
  to="/dashboard/mealmanagelist"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "bg-[#0284C7] px-6 pt-2 rounded-md text-white " : ""
  }
>
  <div className="flex justify-center  pb-2 hover:text-gray-600 items-center gap-1">
    <MdFoodBank className="text-lg" />
    <h1 className="text-lg font-medium">Meal Manage</h1>
  </div>
</NavLink>

       )}
      
      {["Super Admin","Manager"].some(role => user?.role?.includes(role)) && (
        <NavLink
          to="/dashboard/monthlyreport"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-[#0284C7] px-6 pt-2 rounded-md text-white " : ""
          }
        >
          <div className="flex justify-center pb-2 ml-4 hover:text-gray-600 items-center gap-1">
            <VscGitPullRequestGoToChanges  className="text-lg" />
            <h1 className="text-lg font-medium">Report Request</h1>
          </div>
        </NavLink>

      )}



      
{["Super Admin","Manager"].some(role => user?.role?.includes(role)) && (
  <NavLink
  to="/dashboard/bazalist"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "bg-[#0284C7] px-14 pt-2 rounded-md text-white " : ""
  }
>
  <div className="flex justify-center pb-2 -ml-8 hover:text-gray-600 items-center gap-1">
    <FaListCheck className="text-lg" />
    <h1 className="text-lg font-medium">Bazar List</h1>
  </div>
</NavLink>
)}
        
      
        {/* {["Super Admin","Manager"].some(role => user?.role?.includes(role)) && (

<NavLink
to="/dashboard/albumlist"
className={({ isActive, isPending }) =>
  isPending ? "pending" : isActive ? "bg-[#0284C7] px-20 pt-2 rounded-md text-white " : ""
}
>
<div className="flex justify-center pb-2 -ml-14 hover:text-gray-600 items-center gap-1">
  <BiPhotoAlbum className="text-lg" />
  <h1 className="text-lg font-medium">Albums</h1>
</div>
</NavLink>

        )}
           */}
      

          {["Super Admin","Manager"].some(role => user?.role?.includes(role)) && (

  
<NavLink
to="/dashboard/userlist"
className={({ isActive, isPending }) =>
  isPending ? "pending" : isActive ? "bg-[#0284C7]   pt-2 rounded-md text-white " : ""
}
>
<div className="flex justify-center -ml-8  px-14  pb-2 hover:text-gray-600 items-center gap-1">
  <LuServer className="text-lg" />
  <h1 className="text-lg font-medium">Users Role</h1>
</div>
</NavLink>

          )}

{/* {["Super Admin"].some(role => user?.role?.includes(role)) && (

<NavLink
to="/dashboard/managerrole"
className={({ isActive, isPending }) =>
  isPending ? "pending" : isActive ? "bg-[#0284C7]   pt-2 rounded-md text-white " : ""
}
>
<div className="flex justify-center   px-5  pb-2 hover:text-gray-600 items-center gap-1">
  <LuServer className="text-lg" />
  <h1 className="text-lg font-medium">Manager Role</h1>
</div>
</NavLink>

)}
       */}
       
        {/* setting */}

        {["Super Admin"].some(role => user?.role?.includes(role)) && (

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
      <div className="flex items-center  hover:text-gray-600 pb-2 gap-1 ">
        <LuCircleDot className="text-lg" />
        <h2 className="text-md font-medium">Blood Group</h2>
      </div>
    </NavLink>

    <NavLink
      to="/dashboard/setting/information"
      className={({ isActive }) => (isActive ? "text-[#0284C7]  " : "")}
    >
      <div className="flex items-center  hover:text-gray-600 gap-1 ">
        <LuCircleDot className="text-lg" />
        <h2 className="text-md font-medium">Information</h2>
      </div>
    </NavLink>

    
  </div>
)}
</div>
        )}

     
      </div>
    </>
  );
};

export default Sideber;
