import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sideber from "../Component/Sideber";
import Navber from "../Component/Navber";

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed left-0 top-0 z-40 h-screen transform transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        } lg:translate-x-0`}>
          <Sideber 
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={setSidebarCollapsed}
          />
        </aside>

        {/* Main Content Area */}
        <main className={`flex-1 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          {/* Header */}
          <header className="sticky top-0 z-30">
            <Navber />
          </header>

          {/* Content Container */}
          <div className="p-6">
            <div className="mx-auto max-w-7xl">
              <div className="animate-fade-in">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
