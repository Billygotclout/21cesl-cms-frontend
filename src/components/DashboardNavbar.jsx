import { ChevronDown, LogOut, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardNavbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);
  return (
    <div className=" flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200  px-6 flex items-center py-6 justify-end">
        <div className="relative" ref={profileMenuRef}>
          <button
            className="flex items-center gap-2"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium">Admin</span>
              <span className="text-xs text-gray-500">
                admin@21stcentury.com
              </span>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
              <User className="w-4 h-4" />
            </div>
            <ChevronDown className="w-4 h-4 cursor-pointer text-gray-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-[180px] bg-white border border-gray-200 rounded-md shadow-md z-10">
              <div className="py-1">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center cursor-pointer gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <User className="w-4  h-4" />
                  <span>Your profile</span>
                </button>
                <button className="flex items-center cursor-pointer gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                  <LogOut className="w-4  h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default DashboardNavbar;
