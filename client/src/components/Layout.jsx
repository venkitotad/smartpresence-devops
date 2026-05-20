import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full min-h-screen bg-gray-50">
        {/* Top bar */}
        <div className="w-full flex justify-end items-center p-4 border-b bg-white">
          <UserButton afterSignOutUrl="/" />
        </div>

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
