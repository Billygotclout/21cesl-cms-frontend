import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import React from "react";
import DashboardNavbar from "../components/DashboardNavbar";

const Webinar = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <DashboardNavbar />

        <main className="p-4">
           <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Webinar;