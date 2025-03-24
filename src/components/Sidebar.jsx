import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Grid,
  Zap,
  Video,
  Users,
  Mail,
  Briefcase,
  FileText,
  LogOut,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
} from "lucide-react";
import logo from "/assets/logo.svg";

const iconMap = {
  grid: LayoutDashboard,
  zap: Zap,
  video: Video,
  users: Users,
  mail: Mail,
  briefcase: Briefcase,
  "file-text": FileText,
};

const Sidebar = () => {
  const location = useLocation(); // Get current route
  const [openDropdown, setOpenDropdown] = useState(null); // Track open dropdown

  const sidebarItems = [
    { name: "Dashboard", icon: "grid", path: "/" },
    {
      name: "Services",
      icon: "zap",
      path: "/services",
      hasDropdown: true,
      subItems: [
        { name: "All Services", path: "/services/all" },
        { name: "Add New Service", path: "/services/add" },
      ],
    },
    {
      name: "Webinars",
      icon: "video",
      path: "/webinars",
      hasDropdown: true,
      subItems: [
        { name: "All Webinars", path: "/webinars/all" },
        { name: "Add New Webinar", path: "/webinars/add" },
      ],
    },
    {
      name: "Users",
      icon: "users",
      path: "/users",
      hasDropdown: true,
      subItems: [
        { name: "All Users", path: "/users/all" },
        { name: "Add New User", path: "/users/add" },
      ],
    },
    {
      name: "Contacts",
      icon: "mail",
      path: "/contacts",
      hasDropdown: true,
      subItems: [
        { name: "All Contacts", path: "/contacts/all" },
        { name: "Add New Contact", path: "/contacts/add" },
      ],
    },
    {
      name: "Projects",
      icon: "briefcase",
      path: "/projects",
      hasDropdown: true,
      subItems: [
        { name: "All Projects", path: "/projects/all" },
        { name: "Add New Project", path: "/projects/add" },
      ],
    },
    {
      name: "Content",
      icon: "file-text",
      path: "/content",
      hasDropdown: true,
      subItems: [
        { name: "Press Highlights", path: "/content/press-highlights" },
        { name: "From the Desk Diaries", path: "/content/desk-diaries" },
        { name: "Awards", path: "/content/awards" },
        { name: "Partners", path: "/content/partners" },
        { name: "Testimonials", path: "/content/testimonials" },
        { name: "Job Opportunities", path: "/content/job-opportunities" },
      ],
    },
  ];

  const handleDropdownClick = (name) => {
    setOpenDropdown(openDropdown === name ? null : name); // Toggle dropdown
  };

  return (
    <div className="w-[259px] bg-white border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="p-5 border-b pb-8 border-gray-200">
        <div className="h-8">
          <img src={logo} alt="logo" className="mb-3" />
        </div>
      </div>

      {/* Sidebar Items */}
      <div className="flex-1 py-4">
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const IconComponent = iconMap[item.icon];
            const isActive = location.pathname.startsWith(item.path);
            const isDropdownOpen = openDropdown === item.name;

            return (
              <div key={item.name}>
                {/* Main Item */}
                <Link
                  to={item.hasDropdown ? "#" : item.path} // Prevent navigation for dropdowns
                  onClick={() =>
                    item.hasDropdown && handleDropdownClick(item.name)
                  }
                  className={`flex items-center justify-between w-full p-3 r  ${
                    isActive
                      ? "bg-[#F6FCFB] text-[#1BB8AB] font-medium"
                      : "text-[#36394A]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {IconComponent && <IconComponent className="w-5 h-5" />}
                    <span className="text-sm">{item.name}</span>
                  </div>
                  {item.hasDropdown &&
                    (isDropdownOpen ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    ))}
                </Link>

                {item.hasDropdown && isDropdownOpen && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className={`flex items-center w-full p-2 text-sm rounded-md hover:bg-gray-100 ${
                          location.pathname === subItem.path
                            ? "text-[#1BB8AB] font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <Link
          to="/logout"
          className="flex items-center gap-3 text-gray-700 hover:text-gray-900"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
