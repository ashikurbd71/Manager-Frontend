import React from "react";

import { Outlet } from "react-router-dom";
import Sideber from "../Component/Sideber";
import Navber from "../Component/Navber";

const Layout = () => {
  return (
    <div className="grid grid-cols-12 ">
      <aside className="col-span-2">
        <Sideber/>
      </aside>
      <main className="col-span-10 min-h-screen">
        <Navber/>
        <Outlet  className="overflow-y-auto pb-10 px-10"/>
      </main>
    </div>
  );
};

export default Layout;
