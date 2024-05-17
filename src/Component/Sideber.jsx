// src/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";

const Sideber = () => {
  return (
    <>
      {" "}
      <div className="flex flex-col gap-3 pt-4 h-full bg-[#acadaf] items-center">
        <h1 className="text-2xl font-bold text-white pb-2">Amer Dokan</h1>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
            <div className="flex justify-center items-center gap-1">
            <MdAddShoppingCart className="text-lg"/>
             <h1 className="text-lg font-medium"> AddProuct</h1>
            </div>
        
        </NavLink>
      </div>
    </>
  );
};

export default Sideber;
