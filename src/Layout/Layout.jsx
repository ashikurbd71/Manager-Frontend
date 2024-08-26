import React from "react";
import { Outlet } from "react-router-dom";
import Sideber from "../Component/Sideber";
import Navber from "../Component/Navber";

const Layout = () => {
  return (
    <div className="grid grid-cols-12">
      <aside className="col-span-2 fixed h-full lg:w-[250px] 2xl:w-[315px]">
        <Sideber />
      </aside>
      <main className="col-span-10 lg:ml-[225px] lg:pl-6 2xl:pl-0 2xl:ml-[315px] w-full min-h-screen">
        <Navber />
        <div className="overflow-y-auto w-full pb-10 ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
