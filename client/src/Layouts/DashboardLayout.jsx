import React from "react";
import { Outlet } from "react-router-dom";
import { FiSettings } from "react-icons/fi";

import Sidebar from "../components/Sidebar";
// import ThemeSettings from "../components/ThemeSettings";
import { useStateContext } from "../context/ContextProvider";

function DashboardLayout() {
  const {
    currentMode,
    activeMenu,
    themeSettings,
    currentColor,
    setThemeSettings,
  } = useStateContext();

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">

        {/*  SETTINGS BUTTON */}
        {/* <button
          type="button"
          title="Settings"
          onClick={() => setThemeSettings(true)}
          style={{ background: currentColor }}
          className="fixed right-4 bottom-4 text-3xl text-white p-3 rounded-full hover:drop-shadow-xl hover:bg-light-gray z-[1000]"
        >
          <FiSettings />
        </button> */}

        {/* SIDEBAR */}
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}

        {/* MAIN CONTENT */}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full"
              : "bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2"
          }
        >
   
          <Outlet />

          {/* {themeSettings && <ThemeSettings />} */}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
