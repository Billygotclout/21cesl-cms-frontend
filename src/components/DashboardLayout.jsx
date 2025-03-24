import Sidebar from "./Sidebar";
import React from "react";
import DashboardNavbar from "./DashboardNavbar";

const DashBoardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <DashboardNavbar />

        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
