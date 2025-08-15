// src/Sidebar.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaMagnet, FaMoneyBillTransfer, FaUserPlus, FaUsers, FaBars, FaUser } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
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
import { IoFastFoodOutline } from "react-icons/io5";

const Sideber = ({ isCollapsed = false, onToggleCollapse }) => {
  const { user } = useAuth();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  // Navigation configuration with correct routes
  const navigationConfig = [
    {
      title: "Dashboard",
      items: [
        {
          to: "/",
          icon: MdOutlineDashboard,
          label: "Dashboard",
          roles: ["Super Admin", "Manager"]
        },
        {
          to: "/dashboard/hostelreport",
          icon: GoReport,
          label: "Hostel Report",
          roles: ["Super Admin", "Manager"]
        },
        {
          to: "/dashboard/reports",
          icon: TbFileReport,
          label: "Monthly Report",
          roles: ["Super Admin", "Manager"]
        }
      ]
    },
    {
      title: "Management",
      items: [
        {
          to: "/dashboard/memberlist",
          icon: FaUsers,
          label: "Member List",
          roles: ["Super Admin", "Manager"]
        },
        {
          to: "/dashboard/addmember",
          icon: FaUserPlus,
          label: "Add Member",
          roles: ["Super Admin", "Manager"]
        },
        {
          to: "/dashboard/roomlist",
          icon: MdOutlineHomeWork,
          label: "Room Management",
          roles: ["Super Admin", "Manager"]
        },
        {
          to: "/dashboard/cashinlist",
          icon: GiMoneyStack,
          label: "Cash In",
          roles: ["Super Admin", "Manager"]
        },
        {
          to: "/dashboard/cashoutlist",
          icon: FaMoneyBillTransfer,
          label: "Cash Out",
          roles: ["Super Admin", "Manager"]
        },
        {
          to: "/dashboard/bazalist",
          icon: FaListCheck,
          label: "Bazar List",
          roles: ["Super Admin", "Manager"]
        }
      ]
    },
    {
      title: "Meal System",
      items: [
        {
          to: "/dashboard/mealmanagelist",
          icon: MdFoodBank,
          label: "Meal Management",
          roles: ["Super Admin", "Manager"]
        },
        {
          to: "/dashboard/addmeal",
          icon: IoFastFoodOutline,
          label: "Add Meal",
          roles: ["Super Admin", "Manager"]
        },
        {
          to: "/dashboard/extralist",
          icon: IoFastFoodOutline,
          label: "Extra Meal",
          roles: ["Super Admin", "Manager"]
        },
        {
          to: "/dashboard/addextra",
          icon: IoFastFoodOutline,
          label: "Add Extra",
          roles: ["Super Admin", "Manager"]
        },
        {
          to: "/dashboard/monthlyreport",
          icon: TbFileReport,
          label: "Monthly Report",
          roles: ["Super Admin", "Manager"]
        }
      ]
    },
    {
      title: "Content",
      items: [
        {
          to: "/dashboard/noticelist",
          icon: TbNews,
          label: "Notice",
          roles: ["Super Admin", "Manager"]
        },
        {
          to: "/dashboard/addnotice",
          icon: TbNews,
          label: "Add Notice",
          roles: ["Super Admin", "Manager"]
        },
        {
          to: "/dashboard/albumlist",
          icon: BiPhotoAlbum,
          label: "Album",
          roles: ["Super Admin", "Manager"]
        }
      ]
    },
    {
      title: "Administration",
      items: [
        {
          to: "/dashboard/userlist",
          icon: FaUsers,
          label: "User Management",
          roles: ["Manager"]
        },
        {
          to: "/dashboard/adduser",
          icon: FaUserPlus,
          label: "Add User",
          roles: ["Manager"]
        },
        {
          to: "/dashboard/managerlist",
          icon: FaUserGear,
          label: "Manager Management",
          roles: ["Super Admin"]
        },
        {
          to: "/dashboard/addmanager",
          icon: FaUserPlus,
          label: "Add Manager",
          roles: ["Super Admin"]
        },
        {
          to: "/dashboard/managerrole",
          icon: FaAward,
          label: "Manager Role",
          roles: ["Super Admin"]
        },
        {
          to: "/dashboard/addmanagerrole",
          icon: FaAward,
          label: "Add Manager Role",
          roles: ["Super Admin"]
        }
      ]
    },
    {
      title: "Settings",
      items: [
        {
          to: "/dashboard/setting/departmentlist",
          icon: LuServer,
          label: "Department",
          roles: ["Super Admin", "Manager"]
        },
        {
          to: "/dashboard/setting/institutelist",
          icon: LuServer,
          label: "Institute",
          roles: ["Super Admin", "Manager"]
        },
        {
          to: "/dashboard/setting/semisterlist",
          icon: LuServer,
          label: "Semester",
          roles: ["Super Admin", "Manager"]
        },
        {
          to: "/dashboard/setting/bloodgrouplist",
          icon: LuServer,
          label: "Blood Group",
          roles: ["Super Admin", "Manager"]
        },
        {
          to: "/dashboard/setting/information",
          icon: MdOutlineSettings,
          label: "Information",
          roles: ["Super Admin", "Manager"]
        }
      ]
    },
    {
      title: "Account",
      items: [
        {
          to: "/dashboard/profile",
          icon: FaUser,
          label: "Profile",
          roles: ["Super Admin", "Manager"]
        }
      ]
    }
  ];

  // Filter navigation based on user role
  const userRole = user?.role || "Member";
  const filteredNavigation = navigationConfig.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.roles && Array.isArray(item.roles) && item.roles.includes(userRole)
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className={`sidebar h-full w-full flex flex-col ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Logo Section - Fixed */}
      <div className="flex items-center justify-between p-4 border-b border-secondary-100 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          {!isCollapsed && (
            <h1 className="text-2xl font-bold text-gradient">
              MANAGER
            </h1>
          )}
        </div>
        {!isCollapsed && (
          <button
            onClick={onToggleCollapse}
            className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-all duration-200"
          >
            <FaBars className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Menu - Scrollable */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary-200 scrollbar-track-transparent">
        <div className="p-4 space-y-6">
          {filteredNavigation && filteredNavigation.length > 0 ? filteredNavigation.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-2">
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-secondary-500 uppercase tracking-wider px-3 py-2">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1 ">
                {section.items.map((item, itemIndex) => {
                  const IconComponent = item.icon;
                  return (
                    <NavLink
                      key={itemIndex}
                      to={item.to}
                      className={({ isActive }) =>
                        isActive ? "text-[#3089e2] flex gap-1  items-center" : "nav-link"
                      }
                      title={isCollapsed ? item.label : ""}
                    >
                      <IconComponent className="text-xl flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="font-medium truncate">{item.label}</span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          )) : (
            <div className="text-center text-secondary-500 py-8">
              <p>No navigation items available</p>
            </div>
          )}
        </div>
      </nav>

      {/* User Profile Section - Fixed */}
      <div className="p-4 border-t border-secondary-100 flex-shrink-0">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-secondary-50">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-secondary-900 truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-secondary-500 truncate">
                {user?.role || 'Role'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sideber;
