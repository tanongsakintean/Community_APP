import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="bg-[#EEF1FF] h-[100vh] scrollbar-hide  overflow-y-scroll">
      <Navbar />
      <div className="flex justify-between ">
        {/* <Sidebar /> */}
        <div className=" w-full   flex justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
