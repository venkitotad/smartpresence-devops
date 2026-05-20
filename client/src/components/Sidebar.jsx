import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiBook, FiBarChart2, FiMenu } from "react-icons/fi";
import { useStateContext } from "../context/ContextProvider";

const links = [
  {
    title: "Dashboard",
    items: [{ name: "Home", route: "/staff/dashboard", icon: <FiHome /> }],
  },
  {
    title: "Management",
    items: [
      { name: "Students", route: "/staff/students", icon: <FiUsers /> },
      { name: "Classes", route: "/staff/classes", icon: <FiBook /> },
      { name: "Monthly Reports", route: "/staff/month/report", icon: <FiBarChart2 /> },
    ],
  },
];

export default function Sidebar() {
  const {
    activeMenu, setActiveMenu,
    isSidebarCollapsed, setIsSidebarCollapsed,
    screenSize
  } = useStateContext();

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const isMobile = screenSize <= 900;

  return (
    <div
      className={`h-screen bg-white shadow-sm border-r transition-all 
      duration-300 flex flex-col 
      ${isSidebarCollapsed ? "w-20" : "w-64"}
      ${!activeMenu && !isMobile ? "hidden md:block" : ""}`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-4">
        {!isSidebarCollapsed && (
          <h1 className="text-xl font-bold whitespace-nowrap">Dashboard</h1>
        )}

        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <FiMenu size={20} />
        </button>
      </div>

      {/* LINKS */}
      <nav className="mt-4 flex-1">
        {links.map((sec) => (
          <div key={sec.title} className="mb-6">
            {!isSidebarCollapsed && (
              <p className="text-gray-400 text-xs font-semibold px-4">
                {sec.title}
              </p>
            )}

            <div className="mt-2 flex flex-col gap-1">
              {sec.items.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.route}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-md transition 
                    ${
                      isActive
                        ? "text-indigo-800   shadow-sm"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <span>{link.icon}</span>

                  {!isSidebarCollapsed && (
                    <span className="capitalize">{link.name}</span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
